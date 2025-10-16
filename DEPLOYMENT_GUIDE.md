# Vercel + Supabase 배포 가이드

사주팔자 운세 시스템을 Vercel과 Supabase로 배포하는 전체 가이드입니다.

## 📋 목차

1. [사전 준비](#사전-준비)
2. [Git 저장소 설정](#git-저장소-설정)
3. [Supabase 설정](#supabase-설정)
4. [Vercel 배포](#vercel-배포)
5. [환경 변수 설정](#환경-변수-설정)
6. [배포 확인](#배포-확인)
7. [문제 해결](#문제-해결)

## 🎯 사전 준비

### 필요한 계정
- [x] GitHub 계정
- [x] Vercel 계정 (GitHub 계정으로 가입 가능)
- [x] Supabase 계정 (GitHub 계정으로 가입 가능)

### 설치 필요 도구
- Git
- 웹 브라우저 (Chrome, Firefox, Safari 등)

## 📦 Git 저장소 설정

### 1. GitHub 저장소 생성

1. [GitHub](https://github.com) 로그인
2. 우측 상단 **+** 아이콘 → **New repository** 클릭
3. 저장소 정보 입력:
   - **Repository name**: `saju-system`
   - **Description**: "한국 전통 사주팔자 운세 시스템"
   - **Visibility**: Public 또는 Private 선택
   - **Initialize this repository with a README**: 체크 안 함

4. **Create repository** 클릭

### 2. 로컬 저장소와 연결

터미널에서 프로젝트 디렉토리로 이동 후:

```bash
# 프로젝트 디렉토리로 이동
cd saju-system

# Git 저장소 초기화 (이미 완료됨)
# git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 사주팔자 운세 시스템"

# GitHub 저장소와 연결 (YOUR_USERNAME을 본인의 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/saju-system.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3. 저장소 확인

GitHub 페이지를 새로고침하여 파일이 업로드되었는지 확인합니다.

## 🗄️ Supabase 설정

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 로그인
2. **New Project** 클릭
3. 프로젝트 정보 입력:
   - **Name**: `saju-system`
   - **Database Password**: 강력한 비밀번호 생성 및 저장
   - **Region**: `Northeast Asia (Seoul)` 선택
   - **Pricing Plan**: `Free` 선택

4. **Create new project** 클릭 (약 2분 소요)

### 2. API 키 복사

프로젝트가 생성되면:

1. 좌측 메뉴 **Settings** → **API** 클릭
2. 다음 정보를 안전한 곳에 복사:
   ```
   Project URL: https://xxxxx.supabase.co
   anon public key: eyJhbGc...
   ```

### 3. 데이터베이스 테이블 생성 (선택사항)

사주 분석 결과를 저장하려면 [SUPABASE_GUIDE.md](./SUPABASE_GUIDE.md)를 참고하여 테이블을 생성하세요.

좌측 메뉴 **SQL Editor** → **New Query**:

```sql
-- 사주 분석 결과 저장 테이블
CREATE TABLE saju_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  birth_year INTEGER NOT NULL,
  birth_month INTEGER NOT NULL,
  birth_day INTEGER NOT NULL,
  birth_hour INTEGER NOT NULL,
  gender VARCHAR(10) NOT NULL,

  year_pillar JSONB NOT NULL,
  month_pillar JSONB NOT NULL,
  day_pillar JSONB NOT NULL,
  hour_pillar JSONB NOT NULL,

  elements JSONB NOT NULL,
  strong_element VARCHAR(10),
  weak_elements JSONB,

  day_master JSONB NOT NULL
);

-- 인덱스 생성
CREATE INDEX idx_saju_created_at ON saju_readings(created_at DESC);

-- RLS 활성화
ALTER TABLE saju_readings ENABLE ROW LEVEL SECURITY;

-- 읽기/쓰기 정책
CREATE POLICY "Public access" ON saju_readings FOR ALL TO public USING (true);
```

**Run** 버튼 클릭하여 실행

## 🚀 Vercel 배포

### 1. Vercel 로그인

1. [Vercel](https://vercel.com) 접속
2. **Sign Up** 또는 **Log In**
3. **Continue with GitHub** 선택

### 2. 새 프로젝트 생성

1. Dashboard에서 **Add New** → **Project** 클릭
2. **Import Git Repository** 섹션에서:
   - GitHub 저장소 접근 권한 허용
   - `saju-system` 저장소 찾기
   - **Import** 클릭

### 3. 프로젝트 설정

**Configure Project** 화면에서:

#### Build Settings
- **Framework Preset**: `Other` (정적 HTML 사이트)
- **Build Command**: 비워두기 (빌드 불필요)
- **Output Directory**: 비워두기 (루트 디렉토리 사용)
- **Install Command**: 비워두기

#### Root Directory
- 그대로 `.` (루트) 유지

### 4. 환경 변수 설정 (선택사항)

Supabase를 사용하는 경우:

**Environment Variables** 섹션에서 추가:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |

### 5. 배포 시작

1. **Deploy** 버튼 클릭
2. 배포 진행 상황 확인 (약 1-2분 소요)
3. 배포 완료 시 축하 화면 표시

### 6. 배포 URL 확인

배포가 완료되면:
- 자동 생성된 URL: `https://saju-system-xxxxx.vercel.app`
- **Visit** 버튼 클릭하여 사이트 확인

## 🌐 커스텀 도메인 설정 (선택사항)

### 도메인 연결하기

1. Vercel 프로젝트 Dashboard → **Settings** → **Domains**
2. **Add Domain** 클릭
3. 보유한 도메인 입력 (예: `saju.example.com`)
4. DNS 레코드 설정 안내 따라하기

#### DNS 설정 예시
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## 🔧 환경 변수 설정 (프로덕션)

### Vercel에서 환경 변수 추가

1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 변수 추가:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# 기타 설정 (필요시)
NODE_ENV=production
```

4. **Save** 클릭
5. **Redeploy** 필요 (자동으로 제안됨)

### 로컬 개발 환경

프로젝트 루트에 `.env` 파일 생성:

```bash
# .env (git에 커밋하지 마세요!)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

## ✅ 배포 확인

### 체크리스트

- [ ] 웹사이트가 정상적으로 로드됨
- [ ] 생년월일 입력 폼이 작동함
- [ ] 사주 분석 결과가 올바르게 표시됨
- [ ] 오행 차트가 보임
- [ ] 오늘의 운세가 표시됨
- [ ] 모바일에서도 정상 작동함
- [ ] (선택) Supabase에 데이터가 저장됨

### 테스트 방법

1. 배포된 URL 접속
2. 예시 데이터 입력:
   - 연도: 1990
   - 월: 5
   - 일: 15
   - 시간: 오시 (11:30-13:29)
   - 성별: 남

3. "사주 분석하기" 버튼 클릭
4. 결과 확인

## 🔄 업데이트 배포

코드를 수정한 후 재배포하는 방법:

```bash
# 변경사항 커밋
git add .
git commit -m "업데이트 내용 설명"

# GitHub에 푸시
git push origin main
```

Vercel이 자동으로 새 버전을 감지하고 배포합니다!

## 🐛 문제 해결

### 배포는 성공했지만 페이지가 표시되지 않음

**원인**: 파일 경로 문제
**해결**:
1. Vercel Dashboard → **Deployments** 확인
2. 배포 로그에서 에러 확인
3. `vercel.json` 파일 확인

### CSS가 적용되지 않음

**원인**: 파일 경로 대소문자 구분
**해결**:
```html
<!-- index.html에서 확인 -->
<link rel="stylesheet" href="styles.css">
<!-- 파일명이 정확히 일치하는지 확인 -->
```

### Supabase 연결 오류

**원인**: API 키 또는 URL 오류
**해결**:
1. Vercel 환경 변수 재확인
2. Supabase 프로젝트 상태 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### CORS 에러

**원인**: Supabase CORS 설정
**해결**:
1. Supabase Dashboard → **Settings** → **API**
2. **CORS** 섹션에서 Vercel 도메인 추가
3. 또는 `*` (모든 도메인) 허용

### 404 에러

**원인**: 라우팅 문제
**해결**:
`vercel.json` 확인:
```json
{
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

## 📊 배포 후 모니터링

### Vercel Analytics

1. Vercel Dashboard → 프로젝트 선택
2. **Analytics** 탭
3. 방문자 수, 페이지 뷰 등 확인

### Supabase 데이터 확인

1. Supabase Dashboard → **Table Editor**
2. `saju_readings` 테이블 선택
3. 저장된 데이터 확인

## 🎨 추가 최적화

### 성능 최적화

1. **이미지 최적화**: 없음 (현재 이미지 사용 안 함)
2. **CSS 압축**: Vercel이 자동으로 처리
3. **JavaScript 압축**: Vercel이 자동으로 처리

### SEO 개선

`index.html`에 메타 태그 추가:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="한국 전통 명리학 기반 사주팔자 분석 및 오늘의 운세 확인 서비스">
    <meta name="keywords" content="사주, 사주팔자, 운세, 오행, 명리학, 일주, 천간지지">
    <meta name="author" content="Saju System">

    <!-- Open Graph (소셜 미디어 공유) -->
    <meta property="og:title" content="사주팔자 운세 시스템">
    <meta property="og:description" content="생년월일시를 입력하여 사주팔자를 분석하고 오늘의 운세를 확인하세요">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://your-domain.vercel.app">

    <title>사주팔자 운세 시스템</title>
</head>
```

### 보안 헤더

`vercel.json`이 이미 보안 헤더를 포함하고 있습니다:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

## 📱 모바일 최적화

현재 프로젝트는 이미 반응형 디자인이 적용되어 있습니다.

테스트 방법:
1. Chrome DevTools 열기 (F12)
2. 디바이스 툴바 토글 (Ctrl+Shift+M)
3. 다양한 디바이스 크기로 테스트

## 🔐 보안 체크리스트

- [x] `.gitignore`에 `.env` 포함됨
- [x] API 키는 환경 변수로 관리
- [x] Supabase RLS 정책 설정
- [x] HTTPS 자동 적용 (Vercel 기본)
- [x] 보안 헤더 설정됨

## 📚 참고 문서

- [Vercel 공식 문서](https://vercel.com/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Git 기본 가이드](https://git-scm.com/book/ko/v2)
- [SUPABASE_GUIDE.md](./SUPABASE_GUIDE.md) - 자세한 Supabase 연동 가이드

## 🎉 축하합니다!

사주팔자 운세 시스템을 성공적으로 배포하셨습니다!

### 다음 단계

1. 친구들과 공유하기
2. 피드백 받고 개선하기
3. 추가 기능 개발하기
4. 커스텀 도메인 연결하기

### 도움이 필요하신가요?

- GitHub Issues 생성
- README.md 참조
- Vercel/Supabase 커뮤니티 포럼 방문

---

## 빠른 명령어 참고

```bash
# 변경사항 확인
git status

# 변경사항 추가 및 커밋
git add .
git commit -m "커밋 메시지"

# GitHub에 푸시 (자동 배포)
git push origin main

# 로그 확인
git log --oneline

# 브랜치 확인
git branch

# 새 브랜치 생성 및 전환
git checkout -b feature/new-feature
```

## 자주 사용하는 Vercel 명령어

```bash
# Vercel CLI 설치
npm i -g vercel

# 로컬에서 Vercel 프로젝트 연결
vercel link

# 로컬 환경 변수 가져오기
vercel env pull

# 프로덕션 배포
vercel --prod

# 배포 로그 확인
vercel logs
```

---

행운을 빕니다! 🍀
