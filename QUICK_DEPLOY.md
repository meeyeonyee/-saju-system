# 빠른 배포 가이드

로컬 커밋은 완료되었습니다! 이제 다음 단계를 따라주세요.

## ✅ 완료된 작업
- [x] Git 저장소 초기화
- [x] 모든 파일 커밋 완료
- [x] 배포 설정 파일 생성 (vercel.json, .env.example)

## 🚀 다음 단계 (5분 소요)

### 1️⃣ GitHub 저장소 생성 및 푸시

#### 1-1. GitHub에서 새 저장소 생성
1. https://github.com/new 접속
2. 다음 정보 입력:
   - **Repository name**: `saju-system`
   - **Public** 선택
   - **Initialize this repository with** 모두 체크 해제
3. **Create repository** 클릭

#### 1-2. 터미널에서 푸시
저장소 생성 후 아래 명령어 실행:

```bash
cd /Users/noodle/saju-system

# GitHub 저장소 연결 (YOUR_USERNAME을 본인 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/saju-system.git

# 푸시
git push -u origin main
```

> GitHub 사용자명/비밀번호 입력 요청 시:
> - Username: GitHub 사용자명
> - Password: Personal Access Token 사용 (https://github.com/settings/tokens)

### 2️⃣ Vercel 배포

#### 2-1. Vercel 로그인
1. https://vercel.com 접속
2. **Sign Up** 또는 **Log In**
3. **Continue with GitHub** 선택

#### 2-2. 프로젝트 임포트
1. Dashboard에서 **Add New** → **Project** 클릭
2. **Import Git Repository** 섹션:
   - `saju-system` 저장소 찾기
   - **Import** 클릭

#### 2-3. 프로젝트 설정
**Configure Project** 화면에서:
- **Framework Preset**: `Other` 선택
- **Build Command**: 비워두기
- **Output Directory**: 비워두기
- **Install Command**: 비워두기

#### 2-4. 배포 시작
1. **Deploy** 버튼 클릭
2. 약 1-2분 대기
3. 배포 완료!

#### 2-5. 사이트 확인
- 자동 생성된 URL로 접속: `https://saju-system-xxxxx.vercel.app`
- **Visit** 버튼 클릭

### 3️⃣ Supabase 연동 (선택사항)

데이터베이스를 사용하려면:

#### 3-1. Supabase 프로젝트 생성
1. https://supabase.com 로그인
2. **New Project** 클릭
3. 정보 입력:
   - **Name**: `saju-system`
   - **Database Password**: 강력한 비밀번호 생성
   - **Region**: `Northeast Asia (Seoul)`
   - **Pricing Plan**: `Free`
4. **Create new project** 클릭 (2분 소요)

#### 3-2. API 키 복사
1. **Settings** → **API** 클릭
2. 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...`

#### 3-3. Vercel 환경 변수 설정
1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key
4. **Save** → **Redeploy** 클릭

#### 3-4. 데이터베이스 테이블 생성
1. Supabase Dashboard → **SQL Editor**
2. **New Query** 클릭
3. `SUPABASE_GUIDE.md` 파일의 SQL 복사/실행

---

## 🎉 완료!

배포가 완료되면:
- ✅ 웹사이트가 전 세계에 공개됩니다
- ✅ HTTPS가 자동으로 적용됩니다
- ✅ 코드 푸시 시 자동 배포됩니다
- ✅ 무료로 사용할 수 있습니다

## 📱 테스트하기

배포된 사이트에서:
1. 생년월일 입력
2. "사주 분석하기" 클릭
3. 결과 확인

## 🔧 문제 발생 시

### GitHub 푸시 오류
```bash
# Personal Access Token 생성 필요
# https://github.com/settings/tokens
# repo 권한 선택 후 토큰 생성
```

### Vercel 배포 실패
- Vercel Dashboard → **Deployments** → 로그 확인
- 대부분의 경우 자동으로 성공합니다

### 사이트가 안 보임
- 1-2분 대기 후 새로고침
- Vercel Dashboard에서 배포 상태 확인

## 📚 자세한 가이드

- `DEPLOYMENT_GUIDE.md` - 전체 배포 가이드
- `SUPABASE_GUIDE.md` - Supabase 연동 상세 가이드
- `README.md` - 프로젝트 설명서

---

## 빠른 명령어 요약

```bash
# 1. GitHub 저장소 연결 및 푸시
cd /Users/noodle/saju-system
git remote add origin https://github.com/YOUR_USERNAME/saju-system.git
git push -u origin main

# 2. 이후 업데이트 시
git add .
git commit -m "업데이트 내용"
git push
```

행운을 빕니다! 🍀
