# Portfolio Website

개인 포트폴리오 웹사이트 프로젝트입니다.  
이 프로젝트는 **Next.js (16.x)**, **React**, **TypeScript**, **Tailwind CSS**를 사용하여 제작되었습니다.

### 빌드 및 배포

```bash
npm run build
npm start

# 또는 yarn 사용 시:

yarn build
yarn start
```

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

- Node.js 20.9 이상
- npm 또는 yarn

### 설치 방법

1. **저장소 클론**

   ```bash
   git clone https://github.com/yourusername/your-portfolio.git
   cd your-portfolio
   ```

## 에이전트 문의 메일 설정

채팅 패널의 `문의 남기기`는 사용자의 요청을 구조화하고, 사용자가 최종
내용과 개인정보 전송에 동의한 뒤에만 메일을 보냅니다. 실제 수신자는 서버
코드에서 `totaro@totaro.co.kr`로 고정되어 있습니다.

로컬에서는 `.env.example`을 참고해 이 프로젝트의 `.env.local`에 아래 서버
전용 변수를 설정합니다. `totaro_web`에서 쓰는 값과 변수 이름을 그대로
재사용할 수 있지만, 두 프로젝트의 환경변수는 자동 공유되지 않으므로 이
프로젝트의 실행·배포 환경에도 별도로 등록해야 합니다.

```dotenv
GOOGLE_GENERATIVE_AI_API_KEY=...
SMTP_USER=...
SMTP_PASS=...
```

`SMTP_PASS`에는 Gmail 일반 비밀번호가 아니라 앱 비밀번호를 사용합니다.
세 변수 모두 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.
