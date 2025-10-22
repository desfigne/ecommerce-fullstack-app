# SSF Shop - 개발자 매뉴얼

> **Version:** 1.0.0
> **Last Updated:** 2025-10-22
> **Target Audience:** 개발자, 기술 아키텍트, DevOps 엔지니어

---

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [시스템 아키텍처](#2-시스템-아키텍처)
3. [기술 스택](#3-기술-스택)
4. [프로젝트 구조](#4-프로젝트-구조)
5. [데이터베이스 설계](#5-데이터베이스-설계)
6. [API 명세](#6-api-명세)
7. [인증 및 보안](#7-인증-및-보안)
8. [상태 관리](#8-상태-관리)
9. [컴포넌트 아키텍처](#9-컴포넌트-아키텍처)
10. [성능 최적화](#10-성능-최적화)

---

## 1. 시스템 개요

### 1.1 프로젝트 정보
- **프로젝트명:** SSF Shop E-Commerce Platform
- **프로젝트 유형:** 풀스택 웹 애플리케이션
- **개발 목적:** 패션 전문 이커머스 플랫폼 구축
- **벤치마크:** SSF Shop (www.ssfshop.com)

### 1.2 주요 특징
- React 기반 SPA (Single Page Application)
- RESTful API 기반 백엔드 통신
- JWT 기반 인증 시스템
- OAuth2 소셜 로그인 지원 (카카오, 네이버)
- 반응형 디자인 (모바일/태블릿/데스크톱)

### 1.3 시스템 요구사항

#### 개발 환경
- **Node.js:** 16.x 이상
- **npm:** 8.x 이상
- **React:** 19.2.0
- **Java:** 11 이상 (백엔드)
- **MySQL:** 8.0 이상

#### 브라우저 지원
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 2. 시스템 아키텍처

### 2.1 전체 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │   React Application (SPA)                        │  │
│  │   - React Router (페이지 라우팅)                │  │
│  │   - Context API (상태 관리)                      │  │
│  │   - Axios (HTTP 클라이언트)                      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓ HTTP/HTTPS
┌─────────────────────────────────────────────────────────┐
│                    API Gateway                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Spring Boot REST API                           │  │
│  │   - JWT 인증                                     │  │
│  │   - OAuth2 통합                                  │  │
│  │   - Request/Response 처리                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  Business Logic Layer                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Service Layer                                   │  │
│  │   - 상품 관리 서비스                            │  │
│  │   - 주문 처리 서비스                            │  │
│  │   - 사용자 관리 서비스                          │  │
│  │   - 결제 서비스                                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   Data Access Layer                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Spring Data JPA                                 │  │
│  │   - Repository 인터페이스                        │  │
│  │   - Entity 관리                                   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    Database Layer                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │   MySQL 8.0                                       │  │
│  │   - 사용자 데이터                                │  │
│  │   - 상품 데이터                                  │  │
│  │   - 주문 데이터                                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 2.2 프론트엔드 아키텍처

```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── auth/           # 인증 관련 컴포넌트
│   ├── Header.jsx      # 헤더 컴포넌트
│   ├── Footer.jsx      # 푸터 컴포넌트
│   ├── NavBar.jsx      # 네비게이션 바
│   └── ProductCard.jsx # 상품 카드
├── pages/              # 페이지 컴포넌트
│   ├── home/          # 홈 페이지
│   ├── auth/          # 인증 페이지
│   ├── cart/          # 장바구니
│   ├── order/         # 주문 관리
│   └── mypage/        # 마이페이지
├── context/            # Context API 상태 관리
│   └── AuthContext.js # 인증 컨텍스트
├── hooks/              # 커스텀 훅
│   └── useWishlist.js # 위시리스트 훅
├── api/                # API 통신 모듈
│   ├── auth.js        # 인증 API
│   └── orders.js      # 주문 API
├── data/               # 정적 데이터
│   ├── productData.js # 상품 데이터
│   └── categoryData.js# 카테고리 데이터
└── styles/             # 스타일시트
```

---

## 3. 기술 스택

### 3.1 프론트엔드

| 기술 | 버전 | 용도 |
|------|------|------|
| React | 19.2.0 | UI 라이브러리 |
| React Router DOM | 5.1.0 | 클라이언트 사이드 라우팅 |
| React Context API | - | 전역 상태 관리 |
| CSS3 | - | 스타일링 |

### 3.2 백엔드 (예정)

| 기술 | 버전 | 용도 |
|------|------|------|
| Spring Boot | 2.7.x | 백엔드 프레임워크 |
| Spring Data JPA | 2.7.x | ORM |
| Spring Security | 2.7.x | 보안 및 인증 |
| MySQL | 8.0 | 데이터베이스 |
| JWT | - | 토큰 기반 인증 |
| OAuth2 | - | 소셜 로그인 |

### 3.3 개발 도구

| 도구 | 용도 |
|------|------|
| Git | 버전 관리 |
| GitHub | 소스 코드 호스팅 |
| VS Code | IDE |
| Postman | API 테스트 |
| Chrome DevTools | 디버깅 |

---

## 4. 프로젝트 구조

### 4.1 디렉토리 구조

```
project_team/
├── public/                    # 정적 파일
│   ├── icons/                # 아이콘 파일
│   ├── images/               # 이미지 파일
│   │   ├── men/             # 남성 상품 이미지
│   │   ├── women/           # 여성 상품 이미지
│   │   ├── kids/            # 키즈 상품 이미지
│   │   ├── sports/          # 스포츠 상품 이미지
│   │   ├── golf/            # 골프 상품 이미지
│   │   ├── luxury/          # 럭셔리 상품 이미지
│   │   ├── beauty/          # 뷰티 상품 이미지
│   │   ├── life/            # 라이프 상품 이미지
│   │   ├── shoes/           # 신발 상품 이미지
│   │   └── outlet/          # 아울렛 상품 이미지
│   ├── index.html           # HTML 템플릿
│   ├── manifest.json        # PWA 매니페스트
│   └── robots.txt           # 검색엔진 크롤러 설정
├── src/                      # 소스 코드
│   ├── components/          # 공통 컴포넌트
│   │   ├── auth/           # 인증 컴포넌트
│   │   │   ├── KakaoLoginButton.jsx
│   │   │   └── NaverLoginButton.jsx
│   │   ├── Header.jsx      # 헤더
│   │   ├── Footer.jsx      # 푸터
│   │   ├── NavBar.jsx      # 네비게이션
│   │   ├── Hero.jsx        # 히어로 섹션
│   │   ├── ProductCard.jsx # 상품 카드
│   │   ├── ProductGrid.jsx # 상품 그리드
│   │   ├── ProductThumb.jsx# 상품 썸네일
│   │   ├── SectionHeader.jsx# 섹션 헤더
│   │   └── WishButton.jsx  # 위시리스트 버튼
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── home/          # 홈
│   │   ├── auth/          # 인증 (로그인/회원가입)
│   │   ├── men/           # 남성 카테고리
│   │   ├── women/         # 여성 카테고리
│   │   ├── kids/          # 키즈 카테고리
│   │   ├── sports/        # 스포츠 카테고리
│   │   ├── golf/          # 골프 카테고리
│   │   ├── luxury/        # 럭셔리 카테고리
│   │   ├── beauty/        # 뷰티 카테고리
│   │   ├── life/          # 라이프 카테고리
│   │   ├── shoes/         # 신발 카테고리
│   │   ├── outlet/        # 아울렛 카테고리
│   │   ├── cart/          # 장바구니
│   │   ├── order/         # 주문
│   │   ├── mypage/        # 마이페이지
│   │   ├── wish/          # 위시리스트
│   │   ├── admin/         # 관리자
│   │   ├── company/       # 회사소개
│   │   ├── help/          # 고객센터
│   │   └── policy/        # 약관/정책
│   ├── context/            # Context API
│   │   └── AuthContext.js # 인증 컨텍스트
│   ├── hooks/              # 커스텀 훅
│   │   └── useWishlist.js # 위시리스트 훅
│   ├── api/                # API 통신
│   │   ├── auth.js        # 인증 API
│   │   └── orders.js      # 주문 API
│   ├── data/               # 정적 데이터
│   │   ├── productData.js # 상품 데이터
│   │   ├── categoryData.js# 카테고리 데이터
│   │   └── navData.js     # 네비게이션 데이터
│   ├── styles/             # 글로벌 스타일
│   │   └── Auth.css       # 인증 스타일
│   ├── App.js              # 루트 컴포넌트
│   ├── App.css             # 앱 스타일
│   └── index.js            # 진입점
├── docs/                    # 문서
│   ├── developer/          # 개발자 문서
│   └── customer/           # 고객 문서
├── .env                     # 환경 변수
├── .gitignore              # Git 제외 파일
├── package.json            # 의존성 관리
└── README.md               # 프로젝트 소개
```

### 4.2 주요 파일 설명

#### `src/App.js`
- 애플리케이션의 루트 컴포넌트
- 라우팅 설정
- 전역 Context Provider 설정

#### `src/context/AuthContext.js`
- 사용자 인증 상태 관리
- 로그인/로그아웃 로직
- JWT 토큰 관리

#### `src/api/auth.js`
- 인증 관련 API 호출
- 회원가입, 로그인, 로그아웃
- OAuth2 소셜 로그인

---

## 5. 데이터베이스 설계

### 5.1 ERD (Entity Relationship Diagram)

```
┌─────────────────┐         ┌─────────────────┐
│     Users       │         │    Products     │
├─────────────────┤         ├─────────────────┤
│ user_id (PK)    │         │ product_id (PK) │
│ email           │         │ name            │
│ password        │         │ category        │
│ name            │         │ price           │
│ phone           │         │ discount_price  │
│ address         │         │ description     │
│ created_at      │         │ stock           │
│ updated_at      │         │ image_url       │
└─────────────────┘         │ created_at      │
        │                   │ updated_at      │
        │                   └─────────────────┘
        │                           │
        │                           │
        ├───────────────────────────┤
        │                           │
        ↓                           ↓
┌─────────────────┐         ┌─────────────────┐
│     Orders      │         │   Order_Items   │
├─────────────────┤         ├─────────────────┤
│ order_id (PK)   │────────→│ item_id (PK)    │
│ user_id (FK)    │         │ order_id (FK)   │
│ total_amount    │         │ product_id (FK) │
│ status          │         │ quantity        │
│ payment_method  │         │ price           │
│ created_at      │         │ subtotal        │
│ updated_at      │         └─────────────────┘
└─────────────────┘
        │
        ↓
┌─────────────────┐
│     Cart        │
├─────────────────┤
│ cart_id (PK)    │
│ user_id (FK)    │
│ product_id (FK) │
│ quantity        │
│ created_at      │
└─────────────────┘
```

### 5.2 테이블 명세

#### Users 테이블
```sql
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role VARCHAR(20) DEFAULT 'USER',
    provider VARCHAR(20),  -- 'LOCAL', 'KAKAO', 'NAVER'
    provider_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_provider (provider, provider_id)
);
```

#### Products 테이블
```sql
CREATE TABLE products (
    product_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    sub_category VARCHAR(50),
    brand VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2),
    description TEXT,
    stock INT DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_brand (brand),
    INDEX idx_price (price)
);
```

#### Orders 테이블
```sql
CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',  -- PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'UNPAID',
    shipping_address TEXT,
    tracking_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);
```

#### Order_Items 테이블
```sql
CREATE TABLE order_items (
    item_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    INDEX idx_order (order_id),
    INDEX idx_product (product_id)
);
```

#### Cart 테이블
```sql
CREATE TABLE cart (
    cart_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id),
    INDEX idx_user (user_id)
);
```

#### Wishlist 테이블
```sql
CREATE TABLE wishlist (
    wishlist_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id),
    INDEX idx_user (user_id)
);
```

---

## 6. API 명세

### 6.1 API 엔드포인트

#### 인증 API

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| POST | `/api/auth/signup` | 회원가입 | `{ email, password, name, phone }` | `{ user, token }` |
| POST | `/api/auth/login` | 로그인 | `{ email, password }` | `{ user, token }` |
| POST | `/api/auth/logout` | 로그아웃 | - | `{ message }` |
| GET | `/api/auth/me` | 현재 사용자 정보 | - | `{ user }` |
| POST | `/api/auth/refresh` | 토큰 갱신 | `{ refreshToken }` | `{ token }` |

#### OAuth2 API

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/api/auth/kakao` | 카카오 로그인 | - | Redirect to Kakao |
| GET | `/api/auth/kakao/callback` | 카카오 콜백 | `code, state` | `{ user, token }` |
| GET | `/api/auth/naver` | 네이버 로그인 | - | Redirect to Naver |
| GET | `/api/auth/naver/callback` | 네이버 콜백 | `code, state` | `{ user, token }` |

#### 상품 API

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/api/products` | 상품 목록 조회 | `?category=&page=&size=` | `{ products, total, page }` |
| GET | `/api/products/:id` | 상품 상세 조회 | - | `{ product }` |
| GET | `/api/products/search` | 상품 검색 | `?q=&category=` | `{ products }` |
| POST | `/api/products` | 상품 등록 (관리자) | `{ name, category, price, ... }` | `{ product }` |
| PUT | `/api/products/:id` | 상품 수정 (관리자) | `{ name, price, ... }` | `{ product }` |
| DELETE | `/api/products/:id` | 상품 삭제 (관리자) | - | `{ message }` |

#### 장바구니 API

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/api/cart` | 장바구니 조회 | - | `{ items }` |
| POST | `/api/cart` | 장바구니 추가 | `{ productId, quantity }` | `{ item }` |
| PUT | `/api/cart/:id` | 수량 변경 | `{ quantity }` | `{ item }` |
| DELETE | `/api/cart/:id` | 장바구니 삭제 | - | `{ message }` |
| DELETE | `/api/cart` | 장바구니 전체 삭제 | - | `{ message }` |

#### 주문 API

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/api/orders` | 주문 목록 조회 | `?page=&size=` | `{ orders, total, page }` |
| GET | `/api/orders/:id` | 주문 상세 조회 | - | `{ order, items }` |
| POST | `/api/orders` | 주문 생성 | `{ items, shippingAddress, paymentMethod }` | `{ order }` |
| PUT | `/api/orders/:id/status` | 주문 상태 변경 | `{ status }` | `{ order }` |
| DELETE | `/api/orders/:id` | 주문 취소 | - | `{ message }` |

#### 위시리스트 API

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/api/wishlist` | 위시리스트 조회 | - | `{ items }` |
| POST | `/api/wishlist` | 위시리스트 추가 | `{ productId }` | `{ item }` |
| DELETE | `/api/wishlist/:id` | 위시리스트 삭제 | - | `{ message }` |

### 6.2 API 응답 포맷

#### 성공 응답
```json
{
  "success": true,
  "data": {
    // 응답 데이터
  },
  "message": "Success"
}
```

#### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": {}
  }
}
```

### 6.3 HTTP 상태 코드

| 코드 | 의미 | 사용 시나리오 |
|------|------|---------------|
| 200 | OK | 성공적인 GET, PUT 요청 |
| 201 | Created | 성공적인 POST 요청 (리소스 생성) |
| 204 | No Content | 성공적인 DELETE 요청 |
| 400 | Bad Request | 잘못된 요청 파라미터 |
| 401 | Unauthorized | 인증 실패 |
| 403 | Forbidden | 권한 없음 |
| 404 | Not Found | 리소스를 찾을 수 없음 |
| 409 | Conflict | 리소스 충돌 (중복 이메일 등) |
| 500 | Internal Server Error | 서버 에러 |

---

## 7. 인증 및 보안

### 7.1 JWT 인증 흐름

```
1. 로그인 요청
   ┌────────┐                    ┌────────┐
   │ Client │ ─── POST /login ──→│ Server │
   └────────┘                    └────────┘

2. 인증 및 토큰 발급
   ┌────────┐                    ┌────────┐
   │ Client │←── JWT Token ──────│ Server │
   └────────┘                    └────────┘

3. API 요청 (with Token)
   ┌────────┐                    ┌────────┐
   │ Client │─── GET /api/... ──→│ Server │
   │        │   Header:           │        │
   │        │   Authorization:    │        │
   │        │   Bearer {token}    │        │
   └────────┘                    └────────┘

4. 토큰 검증 및 응답
   ┌────────┐                    ┌────────┐
   │ Client │←─── Response ──────│ Server │
   └────────┘                    └────────┘
```

### 7.2 JWT 토큰 구조

```
Header.Payload.Signature

Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "userId": 123,
  "email": "user@example.com",
  "role": "USER",
  "iat": 1634567890,
  "exp": 1634654290
}
```

### 7.3 OAuth2 소셜 로그인

#### 카카오 로그인 플로우
```
1. 사용자가 "카카오 로그인" 버튼 클릭
2. 카카오 로그인 페이지로 리디렉션
3. 사용자 인증 후 인가 코드 수신
4. 인가 코드를 서버로 전송
5. 서버가 카카오 API로 액세스 토큰 요청
6. 사용자 정보 조회 및 회원 등록/로그인 처리
7. JWT 토큰 발급 및 클라이언트로 반환
```

#### 네이버 로그인 플로우
```
(카카오와 동일한 흐름)
```

### 7.4 보안 고려사항

1. **비밀번호 암호화**
   - BCrypt 알고리즘 사용 (Spring Security)
   - Salt 자동 생성

2. **XSS 방지**
   - 사용자 입력 검증 및 이스케이프
   - Content-Security-Policy 헤더 설정

3. **CSRF 방지**
   - CSRF 토큰 사용
   - SameSite 쿠키 설정

4. **SQL Injection 방지**
   - JPA Prepared Statement 사용
   - 사용자 입력 검증

5. **토큰 저장**
   - LocalStorage 대신 HttpOnly Cookie 권장
   - Refresh Token 분리 관리

---

## 8. 상태 관리

### 8.1 Context API 구조

#### AuthContext
```javascript
// src/context/AuthContext.js
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true
});
```

**상태:**
- `user`: 현재 로그인한 사용자 정보
- `isAuthenticated`: 로그인 여부
- `loading`: 인증 상태 확인 중

**액션:**
- `login(email, password)`: 로그인
- `logout()`: 로그아웃
- `updateUser(userData)`: 사용자 정보 업데이트

### 8.2 커스텀 훅

#### useWishlist
```javascript
// src/hooks/useWishlist.js
const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (productId) => { /* ... */ };
  const removeFromWishlist = (productId) => { /* ... */ };
  const isInWishlist = (productId) => { /* ... */ };

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
};
```

---

## 9. 컴포넌트 아키텍처

### 9.1 컴포넌트 계층 구조

```
App
├── Header
│   └── NavBar
├── Routes
│   ├── Home
│   │   ├── Hero
│   │   ├── SectionHeader
│   │   └── ProductGrid
│   │       └── ProductCard
│   │           └── WishButton
│   ├── CategoryPage
│   │   └── ProductGrid
│   ├── Cart
│   ├── Order
│   └── MyPage
└── Footer
```

### 9.2 컴포넌트 설계 원칙

1. **단일 책임 원칙**
   - 각 컴포넌트는 하나의 명확한 역할
   - 재사용 가능하도록 설계

2. **Props Drilling 최소화**
   - Context API 활용
   - 필요시 컴포넌트 합성 패턴 사용

3. **Presentational vs Container**
   - Presentational: UI 렌더링만 담당
   - Container: 로직 및 상태 관리

### 9.3 주요 컴포넌트 명세

#### ProductCard
```javascript
// Props
{
  product: {
    id: number,
    name: string,
    brand: string,
    price: number,
    discountPrice: number,
    imageUrl: string,
    category: string
  },
  showWishButton: boolean,
  onClick: function
}
```

#### Header
```javascript
// Props
{
  transparent: boolean,  // 투명 헤더 여부
  fixed: boolean        // 고정 헤더 여부
}
```

---

## 10. 성능 최적화

### 10.1 최적화 기법

1. **코드 스플리팅**
```javascript
// React.lazy를 활용한 동적 import
const Home = React.lazy(() => import('./pages/home/Home'));
const Cart = React.lazy(() => import('./pages/cart/CartPage'));
```

2. **이미지 최적화**
   - WebP 포맷 사용
   - Lazy Loading 적용
   - 반응형 이미지 (srcset)

3. **메모이제이션**
```javascript
// React.memo로 불필요한 리렌더링 방지
export default React.memo(ProductCard);

// useMemo로 비싼 계산 캐싱
const filteredProducts = useMemo(
  () => products.filter(p => p.category === category),
  [products, category]
);
```

4. **가상 스크롤링**
   - 긴 목록의 경우 react-window 또는 react-virtualized 사용

### 10.2 성능 모니터링

- **Lighthouse**: 웹 성능 측정
- **React DevTools Profiler**: 컴포넌트 렌더링 분석
- **Chrome DevTools**: 네트워크, 메모리 프로파일링

### 10.3 번들 크기 최적화

```bash
# 번들 분석
npm run build
npx source-map-explorer 'build/static/js/*.js'
```

**최적화 방법:**
- Tree Shaking 활성화
- 불필요한 의존성 제거
- 동적 import 활용

---

## 부록

### A. 개발 환경 설정

```bash
# 프로젝트 클론
git clone https://github.com/your-repo/ssf-shop.git
cd ssf-shop

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일 수정

# 개발 서버 실행
npm start
```

### B. 코딩 컨벤션

- **JavaScript**: ESLint + Airbnb Style Guide
- **React**: Functional Components + Hooks
- **CSS**: BEM 방법론
- **Git Commit**: Conventional Commits

### C. 트러블슈팅

| 문제 | 해결 방법 |
|------|-----------|
| npm install 실패 | node_modules 삭제 후 재설치 |
| CORS 에러 | 백엔드 CORS 설정 확인 |
| 빌드 실패 | package.json 의존성 버전 확인 |

---

**문서 관리자:** 개발팀
**최종 수정일:** 2025-10-22
**문의:** dev-team@ssfshop.com
