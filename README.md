# Portfolio Website

개인 포트폴리오 웹사이트 프로젝트입니다.  
이 프로젝트는 **Next.js (16.x)**, **React**, **TypeScript**, **Tailwind CSS**를 사용하여 제작되었습니다.

## 주요 기능

- **반응형 디자인**: 다양한 디바이스에 맞게 반응형으로 구현되었습니다.
- **다이나믹 헤더**: 스크롤 및 마우스 호버에 따라 헤더의 스타일(불투명도, 블러, 배경 색 등)이 변화합니다.
- **클라이언트 컴포넌트**: Next.js의 클라이언트 컴포넌트와 최신 React Hooks를 활용하여 동적인 UI를 구현했습니다.
- **커스텀 컴포넌트**: Header, HeroSection 등 사용자 정의 컴포넌트를 사용하여 구성했습니다.

## 기술 스택

- [Next.js](https://nextjs.org/) (버전 16.x)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## 설치 및 실행

### 전제 조건

- Node.js 22 이상
- npm 10 이상

### 설치 방법

1. **저장소 클론**

   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

2. **의존성 설치 및 개발 서버 실행**

   ```bash
   npm ci
   npm run dev
   ```

## 환경변수와 데이터베이스

`.env.example`을 복사해 `.env.local`을 만들고 실제 값을 설정합니다.

```bash
cp .env.example .env.local
chmod 600 .env.local
```

다음 값은 모두 배포 환경에도 별도로 등록해야 합니다.

- `GOOGLE_GENERATIVE_AI_API_KEY`: Gemini API 키
- `RATE_LIMIT_HASH_KEY`: API 호출 식별자를 HMAC 처리할 32바이트 이상의 독립 키
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: 서버 전용 Supabase 연결 정보
- `INQUIRY_REVIEW_SECRET`: 문의 검토 토큰 서명용 32바이트 이상의 독립 키
- `NEXT_PUBLIC_SITE_URL`: 배포 사이트의 canonical origin
- `SMTP_USER`, `SMTP_PASS`: Gmail 계정과 앱 비밀번호

`RATE_LIMIT_HASH_KEY`, `INQUIRY_REVIEW_SECRET`, service role key 및 SMTP
비밀번호는 서로 재사용하지 않습니다. Supabase service role key를 포함한 비밀값에는
`NEXT_PUBLIC_` 접두사를 붙이지 않습니다.

API를 배포하기 전에 `supabase/migrations`의 SQL을 파일명 순서대로 적용합니다.
Supabase CLI를 사용하는 환경에서는 연결한 프로젝트를 확인한 뒤 다음을 실행할 수
있습니다.

```bash
supabase db push
```

새 보안 환경변수 등록 → 데이터베이스 migration 적용 → 애플리케이션 배포 순서를
지켜야 합니다. 운영 환경은 영속 rate-limit 저장소가 준비되지 않으면 API 요청을
허용하지 않도록 구성되어 있습니다.

## 에이전트 문의 메일 설정

채팅 패널의 `문의 남기기`는 사용자의 요청을 구조화하고, 사용자가 최종
내용과 개인정보 전송에 동의한 뒤에만 메일을 보냅니다. 실제 수신자는 서버
코드에서 `totaro@totaro.co.kr`로 고정되어 있습니다.

`SMTP_PASS`에는 Gmail 일반 비밀번호가 아니라 앱 비밀번호를 사용합니다.
`totaro_web`과 같은 계정을 사용하더라도 두 프로젝트의 환경변수는 자동으로
공유되지 않습니다.

## 빌드 및 배포

```bash
npm run lint
npm run security:check
npm run build
npm start
```

EC2/CodeDeploy 배포는 `appspec.yml`의 hook을 통해 애플리케이션을 `ec2-user`
권한으로 실행하고, 저장소에 고정된 PM2 버전을 사용합니다. Next.js 서버는
loopback에만 바인딩되며 외부 요청은 nginx를 통과합니다.

### EC2 최초 준비

CodeDeploy 전 EC2에 Node.js 22 이상과 npm 10 이상을 설치합니다. 운영
환경변수는 배포 때 삭제되는 애플리케이션 폴더 안이 아니라 아래 고정 파일에
쉘 `KEY=value` 형식으로 둡니다. 다음 명령은 `ec2-user`로 실행합니다.

```bash
install -d -m 700 /home/ec2-user/.config/resume_songseungju
install -m 600 /dev/null /home/ec2-user/.config/resume_songseungju/env
```

`/home/ec2-user/.config/resume_songseungju/env`의 소유자는 `ec2-user`, 권한은
`400` 또는 `600`이어야 합니다. hook은 파일 권한과 필수 변수 8개를 값 노출
없이 검사하고, 조건이 맞지 않으면 기존 프로세스를 중단하기 전에 실패합니다.
애플리케이션 배포 폴더 안의 `.env*` 파일(`.env.example` 제외)은 허용하지 않으며,
빌드에는 공개 `NEXT_PUBLIC_SITE_URL`만 전달합니다. service role·SMTP·서명 키는
빌드가 끝나고 개발 의존성을 제거한 뒤 런타임 프로세스에만 주입됩니다.

첫 성공 배포 후에는 저장소의 로컬 PM2가 출력하는 systemd 등록 명령을 한 번
실행하고 서비스를 활성화합니다.

```bash
cd /home/ec2-user/resume_songseungju
PM2_HOME=/home/ec2-user/.pm2 npx --no-install pm2 startup systemd \
  -u ec2-user --hp /home/ec2-user
# 위 명령이 출력한 root 명령을 확인한 뒤 실행
PM2_HOME=/home/ec2-user/.pm2 npx --no-install pm2 save --force
sudo systemctl enable pm2-ec2-user
systemctl is-enabled pm2-ec2-user
```

root로 실행되는 `BeforeInstall` hook만 nginx 설정을 설치·검증·reload하며,
애플리케이션 계정에는 nginx 제어용 sudo 권한을 주지 않습니다. 제공 설정은
HTTP 80만 수신하므로 EC2를 인터넷에 직접 노출하지 않습니다. 운영에서는
유효한 인증서를 둔 ALB 등에서 TLS를 종료하고, 보안 그룹으로 80번 포트의
접근 주체를 그 프록시로 제한해야 합니다. ALB 뒤에서 실제 사용자 IP와
`X-Forwarded-Proto`를 사용할 때는 임의의 전체 대역이 아니라 정확한 VPC/ALB
서브넷만 nginx의 신뢰 프록시로 등록한 뒤 적용합니다.
