#!/usr/bin/env bash
set -Eeuo pipefail

umask 027

readonly LOG_DIR="/var/log/resume_songseungju"
readonly LOG_FILE="$LOG_DIR/deploy.log"
readonly DEPLOY_DIR="/home/ec2-user/resume_songseungju"
readonly DEPLOY_USER="ec2-user"
readonly APP_NAME="resume_songseungju"
readonly BIND_HOST="127.0.0.1"
readonly APP_PORT="3000"
readonly ENV_FILE="/home/ec2-user/.config/resume_songseungju/env"
readonly PM2_HOME_DIR="/home/ec2-user/.pm2"
readonly -a REQUIRED_ENV_VARS=(
  GOOGLE_GENERATIVE_AI_API_KEY
  RATE_LIMIT_HASH_KEY
  SUPABASE_URL
  SUPABASE_SERVICE_ROLE_KEY
  INQUIRY_REVIEW_SECRET
  NEXT_PUBLIC_SITE_URL
  SMTP_USER
  SMTP_PASS
)

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

  if [[ ! -r "$ENV_FILE" ]]; then
    echo "운영 환경 파일을 읽을 수 없습니다." >&2
    return 1
  fi
}

validate_required_env() {
  local env_name
  local missing=()

  for env_name in "${REQUIRED_ENV_VARS[@]}"; do
    if [[ -z "${!env_name:-}" ]]; then
      missing+=("$env_name")
    fi
  done

  if (( ${#missing[@]} > 0 )); then
    echo "필수 운영 환경 변수가 비어 있습니다: ${missing[*]}" >&2
    return 1
  fi

  local secret_pattern="^[-A-Za-z0-9_./+=]{32,}$"
  if [[ ! "$RATE_LIMIT_HASH_KEY" =~ $secret_pattern \
    || ! "$INQUIRY_REVIEW_SECRET" =~ $secret_pattern ]]; then
    echo "보안 서명 키는 공백 없는 ASCII 32바이트 이상이어야 합니다." >&2
    return 1
  fi
  if [[ "$RATE_LIMIT_HASH_KEY" == "$INQUIRY_REVIEW_SECRET" \
    || "$RATE_LIMIT_HASH_KEY" == "$SUPABASE_SERVICE_ROLE_KEY" \
    || "$RATE_LIMIT_HASH_KEY" == "$SMTP_PASS" \
    || "$INQUIRY_REVIEW_SECRET" == "$SUPABASE_SERVICE_ROLE_KEY" \
    || "$INQUIRY_REVIEW_SECRET" == "$SMTP_PASS" ]]; then
    echo "보안 키와 외부 서비스 자격증명은 서로 재사용할 수 없습니다." >&2
    return 1
  fi
  if [[ ! "$NEXT_PUBLIC_SITE_URL" =~ ^https://[A-Za-z0-9.-]+(:[0-9]{1,5})?/?$ \
    || ! "$SUPABASE_URL" =~ ^https://[A-Za-z0-9.-]+(:[0-9]{1,5})?/?$ ]]; then
    echo "사이트와 Supabase URL은 자격증명·경로 없는 HTTPS URL이어야 합니다." >&2
    return 1
  fi
}

validate_env_values() (
  set -Eeuo pipefail
  set -a
  # shellcheck disable=SC1090 -- EC2에서 프로비저닝되는 고정 경로
  source "$ENV_FILE"
  set +a
  validate_required_env
)

read_public_site_url() (
  set -Eeuo pipefail
  # 전체 환경은 이 subshell 밖으로 내보내지 않는다.
  # shellcheck disable=SC1090 -- EC2에서 프로비저닝되는 고정 경로
  source "$ENV_FILE"
  printf "%s" "$NEXT_PUBLIC_SITE_URL"
)

reject_in_tree_env_files() {
  local env_path
  local -a env_paths=()

  shopt -s nullglob
  env_paths=("$DEPLOY_DIR"/.env "$DEPLOY_DIR"/.env.*)
  shopt -u nullglob

  for env_path in "${env_paths[@]}"; do
    if [[ "$(basename -- "$env_path")" == ".env.example" ]]; then
      continue
    fi
    echo "배포 폴더 안의 환경 파일은 허용하지 않습니다: $env_path" >&2
    return 1
  done
}

validate_toolchain() {
  local node_major
  local node_version
  local npm_major
  local npm_version

  if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    echo "Node.js와 npm이 설치되어 있어야 합니다." >&2
    return 1
  fi

  node_version="$(node --version)"
  npm_version="$(npm --version)"
  node_major="${node_version#v}"
  node_major="${node_major%%.*}"
  npm_major="${npm_version%%.*}"

  if [[ ! "$node_major" =~ ^[0-9]+$ || ! "$npm_major" =~ ^[0-9]+$ ]]; then
    echo "Node.js 또는 npm 버전을 해석할 수 없습니다." >&2
    return 1
  fi

  if (( node_major < 22 || npm_major < 10 )); then
    echo "Node.js 22 이상과 npm 10 이상이 필요합니다." >&2
    return 1
  fi

  echo "> 도구 버전 확인 완료 (Node.js $node_version, npm $npm_version)" \
    | tee -a "$LOG_FILE"
}

if [[ "$(id -un)" != "$DEPLOY_USER" ]]; then
  echo "AfterInstall은 $DEPLOY_USER 계정으로 실행되어야 합니다." >&2
  exit 1
fi

if [[ -L "$LOG_DIR" || ! -d "$LOG_DIR" || -L "$LOG_FILE" || ! -f "$LOG_FILE" ]]; then
  echo "root가 보호하는 배포 로그 경로가 준비되지 않았습니다." >&2
  exit 1
fi

echo "> [AfterInstall] 시작" | tee -a "$LOG_FILE"

if [[ ! -d "$DEPLOY_DIR" ]]; then
  echo "🚨 배포 폴더가 존재하지 않습니다: $DEPLOY_DIR" | tee -a "$LOG_FILE"
  exit 1
fi

validate_env_file
echo "> 외부 운영 환경 파일 권한 확인 완료" | tee -a "$LOG_FILE"
validate_env_values
echo "> 필수 운영 환경 변수 확인 완료" | tee -a "$LOG_FILE"
validate_toolchain

cd "$DEPLOY_DIR"
reject_in_tree_env_files
echo "> 배포 폴더 내 환경 파일 부재 확인 완료" | tee -a "$LOG_FILE"

echo "> npm ci 실행" | tee -a "$LOG_FILE"
npm ci
echo "> npm ci 완료" | tee -a "$LOG_FILE"

echo "> npm run build 실행" | tee -a "$LOG_FILE"
# 빌드에는 공개 canonical URL만 전달한다. service role·SMTP·서명 키는
# 빌드 도구 및 build-only 의존성의 환경에 노출하지 않는다.
BUILD_SITE_URL="$(read_public_site_url)"
env -i \
  HOME="/home/ec2-user" \
  PATH="$PATH" \
  USER="$DEPLOY_USER" \
  LOGNAME="$DEPLOY_USER" \
  LANG="${LANG:-C.UTF-8}" \
  NODE_ENV=production \
  NEXT_PUBLIC_SITE_URL="$BUILD_SITE_URL" \
  npm run build
unset BUILD_SITE_URL
echo "> npm run build 완료" | tee -a "$LOG_FILE"

echo "> 개발 전용 의존성 제거" | tee -a "$LOG_FILE"
npm prune --omit=dev --ignore-scripts
echo "> 운영 의존성 정리 완료" | tee -a "$LOG_FILE"

# 런타임 프로세스를 시작하기 직전에만 비밀정보를 export한다.
set -a
# shellcheck disable=SC1090 -- EC2에서 프로비저닝되는 고정 경로
source "$ENV_FILE"
set +a
validate_required_env
export NODE_ENV=production

if [[ ! -x "$DEPLOY_DIR/node_modules/.bin/pm2" ]]; then
  echo "🚨 로컬 PM2 실행 파일이 없습니다. package-lock.json을 확인하세요." | tee -a "$LOG_FILE"
  exit 1
fi

echo "> 로컬 PM2로 애플리케이션 시작 ($BIND_HOST:$APP_PORT)" | tee -a "$LOG_FILE"
install -d -m 700 "$PM2_HOME_DIR"
PM2_HOME="$PM2_HOME_DIR" npx --no-install pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
PM2_HOME="$PM2_HOME_DIR" npx --no-install pm2 start npm \
  --name "$APP_NAME" \
  --cwd "$DEPLOY_DIR" \
  --time \
  -- start -- --hostname "$BIND_HOST" --port "$APP_PORT"

HEALTHY=0
for _attempt in {1..15}; do
  if node -e '
    fetch("http://127.0.0.1:3000/health", {
      signal: AbortSignal.timeout(2000),
    })
      .then((response) => process.exit(response.ok ? 0 : 1))
      .catch(() => process.exit(1))
  ' >/dev/null 2>&1; then
    HEALTHY=1
    break
  fi
  sleep 1
done

if (( HEALTHY == 0 )); then
  echo "🚨 애플리케이션 health check가 실패했습니다." | tee -a "$LOG_FILE"
  PM2_HOME="$PM2_HOME_DIR" npx --no-install pm2 delete "$APP_NAME" \
    >/dev/null 2>&1 || true
  PM2_HOME="$PM2_HOME_DIR" npx --no-install pm2 save --force >/dev/null
  exit 1
fi
echo "> 애플리케이션 health check 통과" | tee -a "$LOG_FILE"

PM2_HOME="$PM2_HOME_DIR" npx --no-install pm2 save --force
chmod 700 "$PM2_HOME_DIR"
if [[ -f "$PM2_HOME_DIR/dump.pm2" ]]; then
  chmod 600 "$PM2_HOME_DIR/dump.pm2"
fi
echo "> PM2 프로세스 리스트 저장 완료" | tee -a "$LOG_FILE"

if ! systemctl is-enabled --quiet "pm2-$DEPLOY_USER.service"; then
  echo "> 경고: PM2 재부팅 복원용 systemd 서비스가 활성화되지 않았습니다." \
    | tee -a "$LOG_FILE"
fi

echo "> [AfterInstall] 완료" | tee -a "$LOG_FILE"
