# Supabase 연동 가이드

이 문서는 사주팔자 운세 시스템에 Supabase를 연동하는 방법을 설명합니다.

## 📋 목차

1. [Supabase란?](#supabase란)
2. [Supabase 프로젝트 생성](#supabase-프로젝트-생성)
3. [데이터베이스 스키마 설정](#데이터베이스-스키마-설정)
4. [프론트엔드 연동](#프론트엔드-연동)
5. [사용 예시](#사용-예시)
6. [보안 설정](#보안-설정)

## 🌟 Supabase란?

Supabase는 Firebase의 오픈소스 대안으로, PostgreSQL 데이터베이스를 기반으로 하는 백엔드 서비스입니다.

### 주요 기능
- PostgreSQL 데이터베이스
- 실시간 구독 (Real-time subscriptions)
- 인증 시스템 (Authentication)
- 스토리지 (Storage)
- RESTful API 자동 생성

## 🚀 Supabase 프로젝트 생성

### 1. Supabase 가입

1. [Supabase 웹사이트](https://supabase.com) 방문
2. "Start your project" 클릭
3. GitHub 계정으로 로그인

### 2. 새 프로젝트 만들기

1. Dashboard에서 "New Project" 클릭
2. 프로젝트 정보 입력:
   - **Name**: saju-system (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 (저장해두세요!)
   - **Region**: Northeast Asia (Seoul) 선택 권장
   - **Pricing Plan**: Free tier 선택

3. "Create new project" 클릭 (약 2분 소요)

### 3. API 키 확인

프로젝트 생성 후:
1. 좌측 메뉴에서 **Settings** → **API** 클릭
2. 다음 정보 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbGc...` (긴 토큰 문자열)

## 🗄️ 데이터베이스 스키마 설정

### 사주 분석 결과 저장 테이블

좌측 메뉴에서 **SQL Editor** → **New Query** 클릭 후 아래 SQL 실행:

```sql
-- 사용자 사주 분석 결과 저장 테이블
CREATE TABLE saju_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- 생년월일 정보
  birth_year INTEGER NOT NULL,
  birth_month INTEGER NOT NULL,
  birth_day INTEGER NOT NULL,
  birth_hour INTEGER NOT NULL,
  gender VARCHAR(10) NOT NULL,

  -- 사주팔자 결과 (JSON 형태로 저장)
  year_pillar JSONB NOT NULL,
  month_pillar JSONB NOT NULL,
  day_pillar JSONB NOT NULL,
  hour_pillar JSONB NOT NULL,

  -- 오행 분석 결과
  elements JSONB NOT NULL,
  strong_element VARCHAR(10),
  weak_elements JSONB,

  -- 일간 정보
  day_master JSONB NOT NULL,

  -- 추가 정보
  user_ip VARCHAR(50),
  user_agent TEXT
);

-- 인덱스 생성 (조회 성능 향상)
CREATE INDEX idx_saju_created_at ON saju_readings(created_at DESC);
CREATE INDEX idx_saju_birth_date ON saju_readings(birth_year, birth_month, birth_day);

-- Row Level Security (RLS) 활성화
ALTER TABLE saju_readings ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능하도록 정책 설정
CREATE POLICY "Anyone can read saju_readings"
  ON saju_readings
  FOR SELECT
  TO public
  USING (true);

-- 모든 사용자가 삽입 가능하도록 정책 설정
CREATE POLICY "Anyone can insert saju_readings"
  ON saju_readings
  FOR INSERT
  TO public
  WITH CHECK (true);
```

### 운세 조회 로그 테이블 (선택사항)

```sql
-- 일일 운세 조회 로그
CREATE TABLE fortune_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  reading_id UUID REFERENCES saju_readings(id),
  fortune_date DATE NOT NULL,

  -- 오늘의 운세 정보
  today_ganji VARCHAR(10) NOT NULL,
  today_element VARCHAR(10) NOT NULL,
  relation VARCHAR(20) NOT NULL,

  -- 통계용
  user_ip VARCHAR(50)
);

CREATE INDEX idx_fortune_date ON fortune_logs(fortune_date DESC);
CREATE INDEX idx_fortune_reading ON fortune_logs(reading_id);

ALTER TABLE fortune_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fortune_logs"
  ON fortune_logs FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can insert fortune_logs"
  ON fortune_logs FOR INSERT TO public WITH CHECK (true);
```

## 💻 프론트엔드 연동

### 1. Supabase JavaScript 클라이언트 설치

HTML 파일에 CDN 추가:

```html
<!-- index.html의 </body> 태그 직전에 추가 -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

### 2. Supabase 클라이언트 초기화

새 파일 `supabase-client.js` 생성:

```javascript
// Supabase 클라이언트 초기화
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // .env 파일에서 가져오기
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // .env 파일에서 가져오기

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 사주 분석 결과 저장
async function saveSajuReading(birthInfo, analysis) {
  try {
    const { data, error } = await supabaseClient
      .from('saju_readings')
      .insert([
        {
          birth_year: birthInfo.year,
          birth_month: birthInfo.month,
          birth_day: birthInfo.day,
          birth_hour: birthInfo.hour,
          gender: birthInfo.gender,
          year_pillar: analysis.saju.year,
          month_pillar: analysis.saju.month,
          day_pillar: analysis.saju.day,
          hour_pillar: analysis.saju.hour,
          elements: analysis.elements,
          strong_element: analysis.strongElement[0],
          weak_elements: analysis.weakElements,
          day_master: analysis.dayMaster
        }
      ])
      .select();

    if (error) throw error;

    console.log('사주 분석 결과 저장 완료:', data);
    return data[0];
  } catch (error) {
    console.error('저장 중 오류:', error);
    return null;
  }
}

// 운세 로그 저장
async function saveFortuneLog(readingId, fortuneData) {
  try {
    const { data, error } = await supabaseClient
      .from('fortune_logs')
      .insert([
        {
          reading_id: readingId,
          fortune_date: new Date().toISOString().split('T')[0],
          today_ganji: fortuneData.today.ganJi,
          today_element: fortuneData.element,
          relation: fortuneData.relation
        }
      ])
      .select();

    if (error) throw error;

    console.log('운세 로그 저장 완료:', data);
    return data[0];
  } catch (error) {
    console.error('로그 저장 중 오류:', error);
    return null;
  }
}

// 최근 사주 분석 결과 조회
async function getRecentReadings(limit = 10) {
  try {
    const { data, error } = await supabaseClient
      .from('saju_readings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('조회 중 오류:', error);
    return [];
  }
}

// 통계 조회: 오행 분포
async function getElementsStatistics() {
  try {
    const { data, error } = await supabaseClient
      .rpc('get_elements_statistics');

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('통계 조회 중 오류:', error);
    return null;
  }
}
```

### 3. app.js에 Supabase 연동 추가

```javascript
// app.js의 displayResults 함수 수정
async function displayResults(analysis) {
    const { saju, elements, strongElement, weakElements, todayFortune, dayMaster } = analysis;

    // ... 기존 UI 표시 코드 ...

    // Supabase에 결과 저장 (선택사항)
    if (typeof saveSajuReading === 'function') {
        const savedReading = await saveSajuReading(
            analysis.saju.birthInfo,
            analysis
        );

        if (savedReading && savedReading.id) {
            // 운세 로그도 저장
            await saveFortuneLog(savedReading.id, todayFortune);
        }
    }
}
```

### 4. index.html 업데이트

```html
<!-- Supabase 클라이언트 추가 -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-client.js"></script>
<script src="saju-calculator.js"></script>
<script src="app.js"></script>
```

## 📝 사용 예시

### 사주 분석 후 저장하기

```javascript
// 폼 제출 시
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const birthInfo = {
        year: parseInt(document.getElementById('year').value),
        month: parseInt(document.getElementById('month').value),
        day: parseInt(document.getElementById('day').value),
        hour: parseInt(document.getElementById('hour').value) * 2,
        gender: document.getElementById('gender').value
    };

    const analysis = calculator.getFullAnalysis(birthInfo);

    // UI 표시
    displayResults(analysis);

    // Supabase에 저장
    const savedReading = await saveSajuReading(birthInfo, analysis);

    if (savedReading) {
        console.log('저장된 ID:', savedReading.id);
    }
});
```

### 통계 데이터 조회하기

```javascript
// 최근 분석 결과 10개 가져오기
async function showRecentReadings() {
    const readings = await getRecentReadings(10);
    console.log('최근 분석:', readings);
}

// 페이지 로드 시 통계 표시
window.addEventListener('load', async () => {
    const stats = await getElementsStatistics();
    if (stats) {
        displayStatistics(stats);
    }
});
```

## 🔒 보안 설정

### 환경 변수 설정

프로덕션 환경에서는 API 키를 환경 변수로 관리하세요.

#### Vercel 환경 변수 설정

1. Vercel Dashboard → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 변수 추가:
   - `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key

#### 코드에서 환경 변수 사용

```javascript
// supabase-client.js
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_FALLBACK_URL';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_FALLBACK_KEY';
```

### Row Level Security (RLS) 정책

Supabase Dashboard에서:
1. **Database** → **Tables** → `saju_readings` 선택
2. **Policies** 탭에서 적절한 보안 정책 설정

예시 정책:

```sql
-- 읽기 전용 정책
CREATE POLICY "Public read access"
ON saju_readings FOR SELECT
TO public
USING (true);

-- IP 기반 쓰기 제한 (선택사항)
CREATE POLICY "Rate limited insert"
ON saju_readings FOR INSERT
TO public
WITH CHECK (
  (SELECT COUNT(*)
   FROM saju_readings
   WHERE user_ip = current_setting('request.headers')::json->>'x-forwarded-for'
   AND created_at > NOW() - INTERVAL '1 hour') < 10
);
```

## 📊 통계 함수 (선택사항)

### SQL 함수 생성

```sql
-- 오행 분포 통계
CREATE OR REPLACE FUNCTION get_elements_statistics()
RETURNS TABLE (
  element VARCHAR(10),
  count BIGINT,
  percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    strong_element,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM saju_readings), 2) as percentage
  FROM saju_readings
  WHERE strong_element IS NOT NULL
  GROUP BY strong_element
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql;

-- 일간 분포 통계
CREATE OR REPLACE FUNCTION get_daymaster_statistics()
RETURNS TABLE (
  day_stem VARCHAR(10),
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    day_master->>'stem' as day_stem,
    COUNT(*) as count
  FROM saju_readings
  GROUP BY day_master->>'stem'
  ORDER BY count DESC;
END;
$$ LANGUAGE plpgsql;
```

## 🎯 다음 단계

1. ✅ Supabase 프로젝트 생성
2. ✅ 데이터베이스 스키마 설정
3. ✅ 프론트엔드 연동
4. ✅ 보안 정책 설정
5. 🔄 실시간 업데이트 기능 추가 (선택사항)
6. 🔄 사용자 인증 시스템 추가 (선택사항)

## 📚 추가 리소스

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트 문서](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)

## ❓ 문제 해결

### CORS 오류가 발생하는 경우
- Supabase Dashboard → **Settings** → **API** → **CORS**에서 도메인 추가

### 데이터가 저장되지 않는 경우
- RLS 정책 확인
- API 키가 올바른지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 연결이 안 되는 경우
- Supabase 프로젝트가 활성화되어 있는지 확인
- URL과 API 키가 정확한지 확인
- 네트워크 연결 확인

---

이 가이드를 따라하시면 Supabase를 성공적으로 연동할 수 있습니다!
