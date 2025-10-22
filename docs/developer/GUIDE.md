# SSF Shop - 개발자 가이드

> **Version:** 1.0.0
> **Last Updated:** 2025-10-22
> **Target Audience:** 신규 개발자, 기여자, DevOps 엔지니어

---

## 목차

1. [시작하기](#1-시작하기)
2. [개발 환경 설정](#2-개발-환경-설정)
3. [프로젝트 실행](#3-프로젝트-실행)
4. [개발 워크플로우](#4-개발-워크플로우)
5. [코딩 컨벤션](#5-코딩-컨벤션)
6. [Git 브랜치 전략](#6-git-브랜치-전략)
7. [테스트 가이드](#7-테스트-가이드)
8. [디버깅 가이드](#8-디버깅-가이드)
9. [배포 가이드](#9-배포-가이드)
10. [트러블슈팅](#10-트러블슈팅)

---

## 1. 시작하기

### 1.1 필수 요구사항

시작하기 전에 다음 소프트웨어가 설치되어 있어야 합니다:

| 소프트웨어 | 권장 버전 | 설치 확인 명령어 |
|-----------|----------|------------------|
| Node.js | 16.x 이상 | `node --version` |
| npm | 8.x 이상 | `npm --version` |
| Git | 2.x 이상 | `git --version` |
| VS Code | 최신 버전 | - |

### 1.2 권장 VS Code 확장 프로그램

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",           // ESLint
    "esbenp.prettier-vscode",           // Prettier
    "dsznajder.es7-react-js-snippets",  // React Snippets
    "bradlc.vscode-tailwindcss",        // Tailwind CSS IntelliSense
    "christian-kohler.path-intellisense",// Path Autocomplete
    "formulahendry.auto-rename-tag",    // Auto Rename Tag
    "wix.vscode-import-cost"            // Import Cost
  ]
}
```

### 1.3 빠른 시작

```bash
# 1. 저장소 클론
git clone https://github.com/your-team/ssf-shop.git
cd ssf-shop

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp .env.example .env

# 4. 개발 서버 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

---

## 2. 개발 환경 설정

### 2.1 저장소 클론

```bash
# HTTPS를 사용한 클론
git clone https://github.com/your-team/ssf-shop.git

# SSH를 사용한 클론 (권장)
git clone git@github.com:your-team/ssf-shop.git

# 특정 브랜치 클론
git clone -b develop https://github.com/your-team/ssf-shop.git
```

### 2.2 의존성 설치

```bash
# npm 사용
npm install

# 또는 yarn 사용
yarn install

# 의존성 캐시 정리 후 설치
npm cache clean --force
npm install
```

### 2.3 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```bash
# .env 파일 예시

# API 설정
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_API_TIMEOUT=30000

# OAuth2 설정
REACT_APP_KAKAO_CLIENT_ID=your_kakao_client_id
REACT_APP_KAKAO_REDIRECT_URI=http://localhost:3000/auth/kakao/callback

REACT_APP_NAVER_CLIENT_ID=your_naver_client_id
REACT_APP_NAVER_REDIRECT_URI=http://localhost:3000/auth/naver/callback

# 기타 설정
REACT_APP_ENV=development
REACT_APP_VERSION=1.0.0
```

**중요:** `.env` 파일은 절대 Git에 커밋하지 마세요!

### 2.4 VS Code 설정

프로젝트 루트에 `.vscode/settings.json` 파일을 생성하세요:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "javascript.preferences.importModuleSpecifier": "relative",
  "files.eol": "\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true
}
```

### 2.5 Prettier 설정

`.prettierrc` 파일:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

### 2.6 ESLint 설정

`.eslintrc.json` 파일:

```json
{
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "prefer-const": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

---

## 3. 프로젝트 실행

### 3.1 개발 서버 실행

```bash
# 기본 실행 (포트 3000)
npm start

# 특정 포트로 실행
PORT=3001 npm start

# HTTPS로 실행
HTTPS=true npm start
```

### 3.2 프로덕션 빌드

```bash
# 빌드 생성
npm run build

# 빌드 결과물 확인
ls -la build/

# 빌드 크기 분석
npx source-map-explorer 'build/static/js/*.js'
```

### 3.3 테스트 실행

```bash
# 전체 테스트 실행
npm test

# 특정 테스트 파일 실행
npm test -- Header.test.js

# 커버리지 확인
npm test -- --coverage

# Watch 모드 (파일 변경 감지)
npm test -- --watch
```

### 3.4 린트 검사

```bash
# ESLint 실행
npm run lint

# ESLint 자동 수정
npm run lint -- --fix

# Prettier 실행
npx prettier --write "src/**/*.{js,jsx,json,css}"
```

---

## 4. 개발 워크플로우

### 4.1 새로운 기능 개발

```bash
# 1. 최신 develop 브랜치로 이동
git checkout develop
git pull origin develop

# 2. 새로운 feature 브랜치 생성
git checkout -b feature/user-profile

# 3. 코드 작성 및 테스트

# 4. 변경사항 커밋
git add .
git commit -m "feat: add user profile page"

# 5. 원격 저장소에 푸시
git push origin feature/user-profile

# 6. GitHub에서 Pull Request 생성
```

### 4.2 컴포넌트 개발 단계

```
1. 컴포넌트 설계
   ├── Props 정의
   ├── 상태 관리 계획
   └── 이벤트 핸들러 정의

2. 컴포넌트 구현
   ├── JSX 구조 작성
   ├── 스타일링 (CSS)
   └── 로직 구현

3. 테스트 작성
   ├── 렌더링 테스트
   ├── 이벤트 핸들러 테스트
   └── 스냅샷 테스트

4. 리팩토링
   ├── 코드 최적화
   ├── 성능 개선
   └── 주석 추가

5. 코드 리뷰
   └── Pull Request 생성
```

### 4.3 컴포넌트 생성 템플릿

```javascript
// src/components/Example/Example.jsx

import React from 'react';
import './Example.css';

/**
 * Example 컴포넌트
 * @param {Object} props
 * @param {string} props.title - 제목
 * @param {function} props.onClick - 클릭 이벤트 핸들러
 */
const Example = ({ title, onClick }) => {
  return (
    <div className="example">
      <h2>{title}</h2>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export default Example;
```

### 4.4 페이지 컴포넌트 템플릿

```javascript
// src/pages/example/ExamplePage.jsx

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './ExamplePage.css';

const ExamplePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 데이터 로드
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // API 호출
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className="example-page">
        <h1>Example Page</h1>
        {/* 페이지 콘텐츠 */}
      </main>
      <Footer />
    </>
  );
};

export default ExamplePage;
```

---

## 5. 코딩 컨벤션

### 5.1 JavaScript/React 스타일 가이드

#### 변수명
```javascript
// ✅ Good
const userName = 'John';
const isLoggedIn = true;
const MAX_ITEMS = 100;

// ❌ Bad
const user_name = 'John';
const loggedin = true;
const maxitems = 100;
```

#### 함수명
```javascript
// ✅ Good - 동사로 시작
const getUserData = () => {};
const handleClick = () => {};
const validateEmail = (email) => {};

// ❌ Bad
const userData = () => {};
const click = () => {};
const email = (email) => {};
```

#### 컴포넌트명
```javascript
// ✅ Good - PascalCase
const UserProfile = () => {};
const ProductCard = () => {};
const NavBar = () => {};

// ❌ Bad
const userProfile = () => {};
const product_card = () => {};
const navbar = () => {};
```

### 5.2 파일 구조 컨벤션

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx        # 컴포넌트
│   │   ├── Header.css        # 스타일
│   │   ├── Header.test.js    # 테스트
│   │   └── index.js          # Export
│   └── Footer/
│       ├── Footer.jsx
│       ├── Footer.css
│       └── index.js
```

### 5.3 Import 순서

```javascript
// 1. React 관련
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// 2. 외부 라이브러리
import axios from 'axios';
import PropTypes from 'prop-types';

// 3. 내부 컴포넌트
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// 4. 유틸리티/헬퍼
import { formatDate } from '../../utils/dateUtils';
import { API_BASE_URL } from '../../config';

// 5. 스타일
import './MyComponent.css';
```

### 5.4 주석 작성 규칙

```javascript
/**
 * 사용자 정보를 조회하는 함수
 * @param {number} userId - 사용자 ID
 * @returns {Promise<Object>} 사용자 정보 객체
 * @throws {Error} 사용자를 찾을 수 없는 경우
 */
const getUserById = async (userId) => {
  // API 호출
  const response = await fetch(`/api/users/${userId}`);

  // 에러 처리
  if (!response.ok) {
    throw new Error('User not found');
  }

  return response.json();
};
```

### 5.5 CSS 네이밍 (BEM)

```css
/* Block */
.product-card { }

/* Element */
.product-card__image { }
.product-card__title { }
.product-card__price { }

/* Modifier */
.product-card--featured { }
.product-card__price--discount { }
```

```html
<div class="product-card product-card--featured">
  <img class="product-card__image" src="..." alt="...">
  <h3 class="product-card__title">Product Name</h3>
  <p class="product-card__price product-card__price--discount">$99</p>
</div>
```

---

## 6. Git 브랜치 전략

### 6.1 브랜치 종류

```
main
 ├─ develop
 │   ├─ feature/user-auth
 │   ├─ feature/product-list
 │   └─ feature/cart
 ├─ hotfix/critical-bug
 └─ release/v1.0.0
```

### 6.2 브랜치 네이밍 규칙

| 브랜치 타입 | 네이밍 패턴 | 예시 |
|------------|-------------|------|
| Feature | `feature/기능명` | `feature/user-profile` |
| Bugfix | `bugfix/버그명` | `bugfix/login-error` |
| Hotfix | `hotfix/긴급수정` | `hotfix/payment-crash` |
| Release | `release/버전` | `release/v1.0.0` |

### 6.3 커밋 메시지 컨벤션 (Conventional Commits)

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type 종류

| Type | 설명 | 예시 |
|------|------|------|
| feat | 새로운 기능 추가 | `feat: add user login page` |
| fix | 버그 수정 | `fix: resolve cart calculation error` |
| docs | 문서 수정 | `docs: update API documentation` |
| style | 코드 포맷팅 | `style: format code with prettier` |
| refactor | 코드 리팩토링 | `refactor: improve product filter logic` |
| test | 테스트 추가/수정 | `test: add unit tests for auth` |
| chore | 빌드/설정 변경 | `chore: update dependencies` |

#### 예시

```bash
# 기능 추가
git commit -m "feat: add product search functionality"

# 버그 수정
git commit -m "fix: resolve image loading issue in cart"

# 문서 업데이트
git commit -m "docs: add installation guide to README"

# 상세 커밋 메시지
git commit -m "feat(auth): implement OAuth2 social login

- Add Kakao login integration
- Add Naver login integration
- Update AuthContext to handle social login

Closes #123"
```

### 6.4 Pull Request 가이드

#### PR 템플릿

```markdown
## 변경 사항
- 추가/수정/삭제한 기능 설명

## 변경 이유
- 왜 이 변경이 필요한지 설명

## 테스트 방법
1. 단계별 테스트 방법
2. 예상 결과

## 스크린샷 (선택)
![스크린샷](url)

## 체크리스트
- [ ] 테스트 완료
- [ ] 문서 업데이트
- [ ] 코드 리뷰 요청
- [ ] Breaking Change 없음
```

#### PR 생성 프로세스

```bash
# 1. 최신 develop 동기화
git checkout develop
git pull origin develop

# 2. feature 브랜치에서 rebase
git checkout feature/my-feature
git rebase develop

# 3. 충돌 해결 (있는 경우)
git add .
git rebase --continue

# 4. 원격 저장소에 푸시
git push origin feature/my-feature

# 5. GitHub에서 PR 생성
```

---

## 7. 테스트 가이드

### 7.1 테스트 구조

```
src/
├── components/
│   └── Header/
│       ├── Header.jsx
│       └── Header.test.js
└── pages/
    └── home/
        ├── Home.jsx
        └── Home.test.js
```

### 7.2 컴포넌트 테스트 예시

```javascript
// src/components/Header/Header.test.js

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  test('renders header with logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('navigates to home when logo is clicked', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const logo = screen.getByAltText(/logo/i);
    fireEvent.click(logo);

    expect(window.location.pathname).toBe('/');
  });

  test('displays user menu when logged in', () => {
    const user = { name: 'John Doe', email: 'john@example.com' };

    render(
      <BrowserRouter>
        <Header user={user} />
      </BrowserRouter>
    );

    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
});
```

### 7.3 API 호출 테스트

```javascript
// src/api/auth.test.js

import { login, signup } from './auth';
import axios from 'axios';

jest.mock('axios');

describe('Auth API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login success', async () => {
    const mockResponse = {
      data: {
        user: { id: 1, email: 'test@example.com' },
        token: 'mock-token'
      }
    };

    axios.post.mockResolvedValue(mockResponse);

    const result = await login('test@example.com', 'password');

    expect(axios.post).toHaveBeenCalledWith(
      '/api/auth/login',
      { email: 'test@example.com', password: 'password' }
    );
    expect(result).toEqual(mockResponse.data);
  });

  test('login failure', async () => {
    axios.post.mockRejectedValue(new Error('Invalid credentials'));

    await expect(
      login('test@example.com', 'wrong-password')
    ).rejects.toThrow('Invalid credentials');
  });
});
```

### 7.4 테스트 커버리지 목표

| 항목 | 목표 커버리지 |
|------|---------------|
| Statements | 80% 이상 |
| Branches | 75% 이상 |
| Functions | 80% 이상 |
| Lines | 80% 이상 |

---

## 8. 디버깅 가이드

### 8.1 React DevTools 사용

```bash
# Chrome 확장 프로그램 설치
# https://chrome.google.com/webstore/detail/react-developer-tools/...

# 사용 방법
1. F12로 개발자 도구 열기
2. "Components" 탭 선택
3. 컴포넌트 트리 확인
4. Props, State, Hooks 검사
```

### 8.2 브라우저 디버깅

```javascript
// 1. console.log 사용
console.log('User data:', user);
console.table(products);
console.error('Error:', error);

// 2. debugger 사용
const handleClick = () => {
  debugger; // 이 줄에서 실행 중단
  console.log('Button clicked');
};

// 3. 조건부 디버깅
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}
```

### 8.3 VS Code 디버깅 설정

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### 8.4 네트워크 디버깅

```javascript
// Axios Interceptor로 요청/응답 로깅
import axios from 'axios';

// 요청 인터셉터
axios.interceptors.request.use(
  config => {
    console.log('Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axios.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('Response Error:', error.response);
    return Promise.reject(error);
  }
);
```

---

## 9. 배포 가이드

### 9.1 프로덕션 빌드

```bash
# 1. 환경 변수 확인
cat .env.production

# 2. 빌드 실행
npm run build

# 3. 빌드 결과물 확인
ls -la build/

# 4. 빌드 크기 확인
du -sh build/
```

### 9.2 정적 파일 서버 테스트

```bash
# serve 패키지 설치
npm install -g serve

# 빌드 파일 서빙
serve -s build -p 5000

# 브라우저에서 http://localhost:5000 접속
```

### 9.3 환경별 설정

#### Development
```bash
# .env.development
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_ENV=development
```

#### Staging
```bash
# .env.staging
REACT_APP_API_BASE_URL=https://staging-api.ssfshop.com/api
REACT_APP_ENV=staging
```

#### Production
```bash
# .env.production
REACT_APP_API_BASE_URL=https://api.ssfshop.com/api
REACT_APP_ENV=production
```

### 9.4 Docker 배포 (선택사항)

```dockerfile
# Dockerfile
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# 빌드 및 실행
docker build -t ssf-shop:latest .
docker run -p 80:80 ssf-shop:latest
```

---

## 10. 트러블슈팅

### 10.1 일반적인 문제

#### npm install 실패

```bash
# 해결 방법 1: 캐시 정리
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 해결 방법 2: 권한 문제
sudo npm install

# 해결 방법 3: Node 버전 확인
node --version
nvm use 16
```

#### 포트 이미 사용 중

```bash
# 포트 3000을 사용하는 프로세스 찾기 (Linux/Mac)
lsof -i :3000

# 프로세스 종료
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# 다른 포트로 실행
PORT=3001 npm start
```

#### CORS 에러

```javascript
// 개발 환경에서 프록시 설정 (package.json)
{
  "proxy": "http://localhost:8080"
}

// 또는 src/setupProxy.js 생성
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
```

#### 빌드 메모리 부족

```bash
# Node 메모리 증가
NODE_OPTIONS=--max_old_space_size=4096 npm run build

# package.json에 추가
{
  "scripts": {
    "build": "NODE_OPTIONS=--max_old_space_size=4096 react-scripts build"
  }
}
```

### 10.2 React 관련 문제

#### Hook 관련 에러

```javascript
// ❌ Bad - 조건부 Hook 사용
if (condition) {
  useEffect(() => {}, []);
}

// ✅ Good
useEffect(() => {
  if (condition) {
    // 로직
  }
}, [condition]);
```

#### 무한 렌더링

```javascript
// ❌ Bad - 의존성 배열 누락
useEffect(() => {
  setData(someData);
});

// ✅ Good
useEffect(() => {
  setData(someData);
}, []); // 빈 배열: 마운트 시 한 번만 실행
```

### 10.3 성능 문제

#### 불필요한 리렌더링

```javascript
// ❌ Bad
const MyComponent = ({ data }) => {
  const processedData = data.map(item => /* ... */);
  return <div>{processedData}</div>;
};

// ✅ Good - useMemo 사용
const MyComponent = ({ data }) => {
  const processedData = useMemo(
    () => data.map(item => /* ... */),
    [data]
  );
  return <div>{processedData}</div>;
};
```

#### 큰 목록 렌더링

```javascript
// react-window 사용
import { FixedSizeList } from 'react-window';

const MyList = ({ items }) => (
  <FixedSizeList
    height={600}
    itemCount={items.length}
    itemSize={50}
    width="100%"
  >
    {({ index, style }) => (
      <div style={style}>{items[index]}</div>
    )}
  </FixedSizeList>
);
```

### 10.4 도움 받기

문제가 해결되지 않으면:

1. **GitHub Issues**: 프로젝트 이슈 페이지에서 검색
2. **팀 Slack**: #dev-help 채널에 질문
3. **Stack Overflow**: React 관련 질문
4. **공식 문서**: React, React Router 문서 참고

---

## 부록

### A. 유용한 npm 스크립트

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,json,css}\"",
    "analyze": "source-map-explorer 'build/static/js/*.js'",
    "clean": "rm -rf build node_modules",
    "reinstall": "npm run clean && npm install"
  }
}
```

### B. 유용한 VS Code 단축키

| 기능 | Windows/Linux | Mac |
|------|--------------|-----|
| 파일 검색 | Ctrl + P | Cmd + P |
| 전체 검색 | Ctrl + Shift + F | Cmd + Shift + F |
| 명령 팔레트 | Ctrl + Shift + P | Cmd + Shift + P |
| 터미널 열기 | Ctrl + ` | Cmd + ` |
| 사이드바 토글 | Ctrl + B | Cmd + B |
| 줄 복사 | Shift + Alt + ↓ | Shift + Opt + ↓ |
| 줄 이동 | Alt + ↑/↓ | Opt + ↑/↓ |
| 다중 커서 | Alt + Click | Opt + Click |

### C. 참고 자료

- [React 공식 문서](https://react.dev/)
- [React Router 문서](https://reactrouter.com/)
- [Create React App 문서](https://create-react-app.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Info](https://javascript.info/)

---

**문서 관리자:** 개발팀
**최종 수정일:** 2025-10-22
**문의:** dev-team@ssfshop.com
