#!/usr/bin/env bash
set -Eeuo pipefail

umask 027

readonly LOG_DIR="/var/log/resume_songseungju"
readonly LOG_FILE="$LOG_DIR/deploy.log"
readonly DEPLOY_DIR="/home/ec2-user/resume_songseungju"
readonly DEPLOY_USER="ec2-user"
readonly APP_NAME="resume_songseungju"
readonly ENV_FILE="/home/ec2-user/.config/resume_songseungju/env"
readonly USER_PM2_HOME="/home/ec2-user/.pm2"
readonly NGINX_CONFIG_TARGET="/etc/nginx/conf.d/resume.conf"
readonly NGINX_CONFIG_BACKUP="/etc/nginx/conf.d/.resume.conf.backup"

validate_env_file() {
  local actual_uid
  local expected_uid
  local file_mode

  if [[ ! -f "$ENV_FILE" || -L "$ENV_FILE" ]]; then
    echo "운영 환경 파일이 없거나 일반 파일이 아닙니다: $ENV_FILE" >&2
    return 1
  fi

  expected_uid="$(id -u "$DEPLOY_USER")"
  actual_uid="$(stat -c "%u" -- "$ENV_FILE")"
  file_mode="$(stat -c "%a" -- "$ENV_FILE")"

  if [[ "$actual_uid" != "$expected_uid" ]]; then
    echo "운영 환경 파일 소유자는 $DEPLOY_USER 여야 합니다." >&2
    return 1
  fi

  if [[ "$file_mode" != "400" && "$file_mode" != "600" ]]; then
    echo "운영 환경 파일 권한은 400 또는 600이어야 합니다." >&2
    return 1
  fi

  if ! sudo -u "$DEPLOY_USER" -H test -r "$ENV_FILE"; then
    echo "운영 환경 파일을 $DEPLOY_USER 계정으로 읽을 수 없습니다." >&2
    return 1
  fi
}

validate_env_values_as_user() {
  sudo -u "$DEPLOY_USER" -H env \
    RESUME_ENV_FILE="$ENV_FILE" \
    bash -c '
      set -Eeuo pipefail
      readonly -a required=(
        GOOGLE_GENERATIVE_AI_API_KEY
        RATE_LIMIT_HASH_KEY
        SUPABASE_URL
        SUPABASE_SERVICE_ROLE_KEY
        INQUIRY_REVIEW_SECRET
        NEXT_PUBLIC_SITE_URL
        SMTP_USER
        SMTP_PASS
      )

      set -a
      # shellcheck disable=SC1090 -- root가 권한을 검증한 고정 경로
      source "$RESUME_ENV_FILE"
      set +a

      missing=()
      for env_name in "${required[@]}"; do
        if [[ -z "${!env_name:-}" ]]; then missing+=("$env_name"); fi
      done
      if (( ${#missing[@]} > 0 )); then
        echo "필수 운영 환경 변수가 비어 있습니다: ${missing[*]}" >&2
        exit 1
      fi

      secret_pattern="^[-A-Za-z0-9_./+=]{32,}$"
      if [[ ! "$RATE_LIMIT_HASH_KEY" =~ $secret_pattern \
        || ! "$INQUIRY_REVIEW_SECRET" =~ $secret_pattern ]]; then
        echo "보안 서명 키는 공백 없는 ASCII 32바이트 이상이어야 합니다." >&2
        exit 1
      fi
      if [[ "$RATE_LIMIT_HASH_KEY" == "$INQUIRY_REVIEW_SECRET" \
        || "$RATE_LIMIT_HASH_KEY" == "$SUPABASE_SERVICE_ROLE_KEY" \
        || "$RATE_LIMIT_HASH_KEY" == "$SMTP_PASS" \
        || "$INQUIRY_REVIEW_SECRET" == "$SUPABASE_SERVICE_ROLE_KEY" \
        || "$INQUIRY_REVIEW_SECRET" == "$SMTP_PASS" ]]; then
        echo "보안 키와 외부 서비스 자격증명은 서로 재사용할 수 없습니다." >&2
        exit 1
      fi
      if [[ ! "$NEXT_PUBLIC_SITE_URL" =~ ^https://[A-Za-z0-9.-]+(:[0-9]{1,5})?/?$ \
        || ! "$SUPABASE_URL" =~ ^https://[A-Za-z0-9.-]+(:[0-9]{1,5})?/?$ ]]; then
        echo "사이트와 Supabase URL은 자격증명·경로 없는 HTTPS URL이어야 합니다." >&2
        exit 1
      fi
    '
}

validate_root_bundle_path() {
  local path="$1"
  local actual_uid
  local file_mode

  actual_uid="$(stat -c "%u" -- "$path")"
  file_mode="$(stat -c "%a" -- "$path")"

  if [[ "$actual_uid" != "0" ]]; then
    echo "CodeDeploy 번들 경로는 root 소유여야 합니다: $path" >&2
    return 1
  fi

  if (( (8#$file_mode & 8#22) != 0 )); then
    echo "CodeDeploy 번들 경로는 group/world 쓰기가 금지되어야 합니다: $path" >&2
    return 1
  fi
}

reject_env_files_in_directory() {
  local directory="$1"
  local env_path
  local -a env_paths=()

  [[ -d "$directory" ]] || return 0
  shopt -s nullglob
  env_paths=("$directory"/.env "$directory"/.env.*)
  shopt -u nullglob

  for env_path in "${env_paths[@]}"; do
    if [[ "$(basename -- "$env_path")" == ".env.example" ]]; then
      continue
    fi
    echo "배포 경로 안의 환경 파일은 허용하지 않습니다: $env_path" >&2
    return 1
  done
}

restore_nginx_config() {
  if (( HAD_NGINX_CONFIG == 1 )); then
    install -o root -g root -m 640 \
      "$NGINX_CONFIG_BACKUP" "$NGINX_CONFIG_TARGET"
  else
    rm -f -- "$NGINX_CONFIG_TARGET"
  fi
}

install_nginx_config() {
  local had_target=0

  if [[ -L "$NGINX_CONFIG_TARGET" ]]; then
    echo "nginx 설정 대상은 심볼릭 링크일 수 없습니다." >&2
    return 1
  elif [[ -f "$NGINX_CONFIG_TARGET" ]]; then
    had_target=1
    if [[ "$(stat -c "%u" -- "$NGINX_CONFIG_TARGET")" != "0" ]]; then
      echo "기존 nginx 설정은 root 소유여야 합니다." >&2
      return 1
    fi
  elif [[ -e "$NGINX_CONFIG_TARGET" ]]; then
    echo "nginx 설정 대상이 일반 파일이 아닙니다." >&2
    return 1
  fi

  if [[ -L "$NGINX_CONFIG_BACKUP" \
    || ( -e "$NGINX_CONFIG_BACKUP" && ! -f "$NGINX_CONFIG_BACKUP" ) ]]; then
    echo "nginx 백업 대상이 안전한 일반 파일이 아닙니다." >&2
    return 1
  fi

  HAD_NGINX_CONFIG="$had_target"
  rm -f -- "$NGINX_CONFIG_BACKUP"

  if (( HAD_NGINX_CONFIG == 1 )); then
    install -o root -g root -m 600 \
      "$NGINX_CONFIG_TARGET" "$NGINX_CONFIG_BACKUP"
  fi

  install -o root -g root -m 640 \
    "$NGINX_CONFIG_SOURCE" "$NGINX_CONFIG_TARGET"

  if ! nginx -t; then
    echo "nginx 설정 검증 실패, 기존 설정 복원" >&2
    restore_nginx_config
    nginx -t || true
    return 1
  fi

  if ! systemctl reload nginx; then
    echo "nginx reload 실패, 기존 설정 복원" >&2
    restore_nginx_config
    if nginx -t; then
      systemctl reload nginx || true
    fi
    return 1
  fi

  rm -f -- "$NGINX_CONFIG_BACKUP"
}

# BeforeInstall is the only root hook. It handles root-owned paths and nginx;
# npm install/build and the application process run as ec2-user in AfterInstall.
if [[ "$(id -u)" -ne 0 ]]; then
  echo "BeforeInstall은 root 권한으로 실행되어야 합니다." >&2
  exit 1
fi

if [[ -L "${BASH_SOURCE[0]}" ]]; then
  echo "BeforeInstall 스크립트는 심볼릭 링크일 수 없습니다." >&2
  exit 1
fi

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
BUNDLE_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd -P)"
readonly SCRIPT_DIR
readonly BUNDLE_ROOT
readonly SCRIPT_PATH="$SCRIPT_DIR/$(basename -- "${BASH_SOURCE[0]}")"
readonly APPSPEC_PATH="$BUNDLE_ROOT/appspec.yml"
readonly NGINX_CONFIG_SOURCE="$BUNDLE_ROOT/nginx-resume.conf"

if [[ ! -f "$SCRIPT_PATH" || -L "$SCRIPT_PATH" \
  || ! -f "$APPSPEC_PATH" || -L "$APPSPEC_PATH" \
  || ! -f "$NGINX_CONFIG_SOURCE" || -L "$NGINX_CONFIG_SOURCE" ]]; then
  echo "CodeDeploy 번들에 필요한 일반 파일이 없습니다." >&2
  exit 1
fi

validate_root_bundle_path "$BUNDLE_ROOT"
validate_root_bundle_path "$SCRIPT_PATH"
validate_root_bundle_path "$APPSPEC_PATH"
validate_root_bundle_path "$NGINX_CONFIG_SOURCE"
reject_env_files_in_directory "$BUNDLE_ROOT"
reject_env_files_in_directory "$DEPLOY_DIR"

if [[ -L "$LOG_DIR" ]]; then
  echo "배포 로그 디렉터리는 심볼릭 링크일 수 없습니다." >&2
  exit 1
fi

install -d -o root -g "$DEPLOY_USER" -m 750 "$LOG_DIR"

if [[ -L "$LOG_FILE" || ( -e "$LOG_FILE" && ! -f "$LOG_FILE" ) ]]; then
  echo "배포 로그는 심볼릭 링크가 아닌 일반 파일이어야 합니다." >&2
  exit 1
fi

if [[ ! -e "$LOG_FILE" ]]; then
  install -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 640 /dev/null "$LOG_FILE"
else
  chown "$DEPLOY_USER:$DEPLOY_USER" "$LOG_FILE"
  chmod 640 "$LOG_FILE"
fi

echo "> [BeforeInstall] 시작" | tee -a "$LOG_FILE"

# 먼저 검사해 잘못된 배포가 기존 프로세스를 중단하지 않게 한다.
validate_env_file
echo "> 외부 운영 환경 파일 권한 확인 완료" | tee -a "$LOG_FILE"
validate_env_values_as_user
echo "> 필수 운영 환경 변수 사전 확인 완료" | tee -a "$LOG_FILE"

command -v nginx >/dev/null 2>&1
command -v systemctl >/dev/null 2>&1
echo "> nginx 설정 설치 및 검증" | tee -a "$LOG_FILE"
install_nginx_config
echo "> nginx 설정 reload 완료" | tee -a "$LOG_FILE"

# 새 배포부터는 ec2-user의 로컬 고정 PM2만 사용한다. 삭제 직후 dump도
# 저장해 배포 도중 재부팅되더라도 이전 애플리케이션이 부활하지 않게 한다.
if [[ -x "$DEPLOY_DIR/node_modules/.bin/pm2" ]]; then
  echo "> ec2-user PM2 프로세스 정리" | tee -a "$LOG_FILE"
  sudo -u "$DEPLOY_USER" -H bash -c \
    'set -e
     cd "$1"
     PM2_HOME="$3" npx --no-install pm2 delete "$2" >/dev/null 2>&1 || true
     PM2_HOME="$3" npx --no-install pm2 save --force >/dev/null
     chmod 700 "$3"
     if [[ -f "$3/dump.pm2" ]]; then chmod 600 "$3/dump.pm2"; fi' \
    bash "$DEPLOY_DIR" "$APP_NAME" "$USER_PM2_HOME"
fi

# 과거 AfterInstall이 만든 root PM2 프로세스를 최초 전환 배포에서 제거한다.
# socket이 있는데 정확한 조회/삭제를 수행할 수 없으면 포트 충돌을 피하기
# 위해 fail-closed한다.
if [[ -S /root/.pm2/rpc.sock ]]; then
  if ! command -v pm2 >/dev/null 2>&1; then
    echo "레거시 root PM2 socket은 있지만 PM2 실행 파일이 없습니다." >&2
    exit 1
  fi
  if ! PM2_HOME=/root/.pm2 pm2 describe "$APP_NAME" >/dev/null 2>&1; then
    echo "레거시 root PM2 애플리케이션을 조회할 수 없습니다." >&2
    exit 1
  fi

  echo "> 레거시 root PM2 프로세스 제거" | tee -a "$LOG_FILE"
  PM2_HOME=/root/.pm2 pm2 delete "$APP_NAME"
  PM2_HOME=/root/.pm2 pm2 save --force
  PM2_HOME=/root/.pm2 pm2 kill

  if [[ -S /root/.pm2/rpc.sock ]]; then
    echo "레거시 root PM2 socket 제거에 실패했습니다." >&2
    exit 1
  fi
fi

if [[ -d "$DEPLOY_DIR" ]]; then
  echo "> 기존 배포 폴더 삭제 진행" | tee -a "$LOG_FILE"
  rm -rf -- "$DEPLOY_DIR"
fi

echo "> 배포 폴더 생성" | tee -a "$LOG_FILE"
install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m 750 "$DEPLOY_DIR"

echo "> [BeforeInstall] 완료" | tee -a "$LOG_FILE"
