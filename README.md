# 🔮 사주팔자 운세 시스템

한국 전통 명리학을 기반으로 한 사주팔자 분석 및 운세 확인 웹 애플리케이션입니다.

## 📋 목차

- [개요](#개요)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [설치 및 실행](#설치-및-실행)
- [사용 방법](#사용-방법)
- [프로젝트 구조](#프로젝트-구조)
- [핵심 개념](#핵심-개념)
- [API 문서](#api-문서)
- [향후 계획](#향후-계획)
- [주의사항](#주의사항)
- [라이선스](#라이선스)

## 🎯 개요

사주팔자 운세 시스템은 생년월일시를 입력받아 다음 정보를 제공합니다:

- **사주팔자 계산**: 년주, 월주, 일주, 시주
- **오행 분석**: 목, 화, 토, 금, 수의 분포
- **일간 분석**: 나를 나타내는 일간의 특성
- **오늘의 운세**: 현재 일진과의 관계 분석

## ✨ 주요 기능

### 1. 사주팔자 계산
- 천간(天干) 10개: 갑, 을, 병, 정, 무, 기, 경, 신, 임, 계
- 지지(地支) 12개: 자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해
- 60갑자 순환 체계 기반 계산

### 2. 오행 분석
- 각 오행(목, 화, 토, 금, 수)의 개수 계산
- 강한 오행과 약한 오행 파악
- 오행 상생상극 관계 분석

### 3. 오늘의 운세
- 오늘 날짜의 일진 계산
- 내 사주와 오늘 일진의 오행 관계 분석
- 상생, 상극, 극당함, 생조받음 등의 관계 해석

### 4. 직관적인 UI
- 반응형 디자인 (모바일, 태블릿, 데스크톱 대응)
- 아름다운 그라데이션과 애니메이션
- 색상별 오행 시각화

## 🛠 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **계산 로직**: Pure JavaScript
- **스타일링**: CSS Grid, Flexbox, CSS Animations
- **호환성**: 모던 브라우저 (Chrome, Firefox, Safari, Edge)

## 📦 설치 및 실행

### 방법 1: 직접 실행 (권장)

1. 저장소 클론 또는 파일 다운로드
```bash
cd saju-system
```

2. 웹 브라우저로 `index.html` 파일 열기
```bash
# macOS
open index.html

# Windows
start index.html

# Linux
xdg-open index.html
```

### 방법 2: 로컬 서버 실행

Python이 설치된 경우:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

그 후 브라우저에서 `http://localhost:8000` 접속

Node.js가 설치된 경우:

```bash
# http-server 설치
npm install -g http-server

# 서버 실행
http-server
```

## 📖 사용 방법

### 기본 사용법

1. **생년월일 입력**
   - 출생 연도 (예: 1990)
   - 출생 월 (1-12)
   - 출생 일 (1-31)

2. **출생 시간 선택**
   - 12지지 시간대 중 선택
   - 자시(23:30-01:29) ~ 해시(21:30-23:29)

3. **성별 선택**
   - 남자 또는 여자

4. **분석하기 버튼 클릭**

### 결과 해석

#### 사주팔자 표
```
구분    시주    일주    월주    년주
천간    庚      甲      丙      庚
지지    午      子      寅      午
```

- **년주**: 조상, 유년기 (0-15세)
- **월주**: 부모, 청년기 (16-30세)
- **일주**: 본인과 배우자, 중년기 (31-45세)
- **시주**: 자녀, 노년기 (46세 이후)

#### 일간 (日干)
일주의 천간이 바로 '나'를 나타냅니다.
- **갑(甲)**: 양목(陽木) - 큰 나무, 리더십
- **을(乙)**: 음목(陰木) - 풀과 꽃, 부드러움
- **병(丙)**: 양화(陽火) - 태양, 열정
- **정(丁)**: 음화(陰火) - 촛불, 세심함
- **무(戊)**: 양토(陽土) - 산, 안정성
- **기(己)**: 음토(陰土) - 밭, 포용력
- **경(庚)**: 양금(陽金) - 도끼, 강인함
- **신(辛)**: 음금(陰金) - 보석, 섬세함
- **임(壬)**: 양수(陽水) - 바다, 포용력
- **계(癸)**: 음수(陰水) - 빗물, 지혜

#### 오행 분석
- **목(木)**: 봄, 성장, 인자함
- **화(火)**: 여름, 열정, 예의
- **토(土)**: 환절기, 안정, 신뢰
- **금(金)**: 가을, 정의, 결단
- **수(水)**: 겨울, 지혜, 융통성

#### 오행 상생상극
- **상생**: 목→화→토→금→수→목 (순환)
- **상극**: 목→토→수→화→금→목

## 📁 프로젝트 구조

```
saju-system/
├── index.html              # 메인 HTML 파일
├── styles.css              # 스타일시트
├── saju-calculator.js      # 사주 계산 로직
├── app.js                  # 애플리케이션 로직
└── README.md               # 프로젝트 문서
```

### 파일 설명

#### `index.html`
- 전체 페이지 구조
- 입력 폼과 결과 표시 영역
- 반응형 레이아웃

#### `styles.css`
- 전체 디자인 스타일
- 그라데이션 및 애니메이션
- 반응형 미디어 쿼리

#### `saju-calculator.js`
- `SajuCalculator` 클래스
- 사주팔자 계산 로직
- 오행 분석 알고리즘
- 운세 해석 함수

#### `app.js`
- DOM 조작 및 이벤트 처리
- 사용자 입력 유효성 검사
- 결과 표시 및 업데이트

## 🔧 API 문서

### SajuCalculator 클래스

#### 생성자
```javascript
const calculator = new SajuCalculator();
```

#### 주요 메서드

##### `calculateSaju(birthInfo)`
사주팔자 계산

**Parameters:**
```javascript
birthInfo = {
  year: 1990,      // 출생 연도
  month: 5,        // 출생 월 (1-12)
  day: 15,         // 출생 일 (1-31)
  hour: 12,        // 출생 시간 (0-23)
  gender: '남'     // 성별
}
```

**Returns:**
```javascript
{
  year: { stem: '경', branch: '오', ganJi: '경오' },
  month: { stem: '신', branch: '사', ganJi: '신사' },
  day: { stem: '갑', branch: '자', ganJi: '갑자' },
  hour: { stem: '경', branch: '오', ganJi: '경오' },
  gender: '남',
  birthInfo: { ... }
}
```

##### `analyzeElements(saju)`
오행 분석

**Returns:**
```javascript
{
  '목': 2,
  '화': 2,
  '토': 0,
  '금': 3,
  '수': 1
}
```

##### `getTodayFortune(saju)`
오늘의 운세 계산

**Returns:**
```javascript
{
  today: { stem: '갑', branch: '진', ganJi: '갑진' },
  relation: '상생',
  element: '목',
  analysis: '오늘은 목 기운이 당신을 도와주는 날입니다...'
}
```

##### `getFullAnalysis(birthInfo)`
전체 분석 (권장)

**Returns:**
```javascript
{
  saju: { ... },
  elements: { ... },
  strongElement: ['금', 3],
  weakElements: [['토', 0]],
  todayFortune: { ... },
  dayMaster: {
    stem: '갑',
    branch: '자',
    element: '목',
    yinYang: '양'
  }
}
```

## 📊 계산 원리

### 60갑자 계산
60갑자는 10천간과 12지지의 조합으로, 60년을 주기로 순환합니다.

```
기준년도: 1984년 = 갑자년
계산식: (year - 1984) % 60
```

### 월주 계산
월주의 천간은 년간에 따라 결정됩니다.

| 년간 | 1월 | 2월 | 3월 | ... |
|------|-----|-----|-----|-----|
| 갑/기 | 병인 | 정묘 | 무진 | ... |
| 을/경 | 무인 | 기묘 | 경진 | ... |

### 일주 계산
실제로는 만세력을 참조해야 하지만, 본 시스템은 근사 계산을 사용합니다.

```javascript
기준일: 1984.01.01 = 갑자일
daysDiff = (현재날짜 - 기준일) / (24 * 60 * 60 * 1000)
cycle = daysDiff % 60
```

### 시주 계산
시주의 천간은 일간에 따라 결정됩니다.

| 일간 | 자시 | 축시 | 인시 | ... |
|------|------|------|------|-----|
| 갑/기 | 갑자 | 을축 | 병인 | ... |
| 을/경 | 병자 | 정축 | 무인 | ... |

## 🚀 향후 계획

### v1.1 (예정)
- [ ] 양력-음력 변환 기능
- [ ] 정확한 만세력 데이터 적용
- [ ] 대운(大運) 계산 기능
- [ ] 십성(十星) 분석

### v1.2 (예정)
- [ ] 세운(歲運) 분석
- [ ] 신살(神殺) 판단
- [ ] 궁합 분석 기능
- [ ] PDF 다운로드 기능

### v2.0 (예정)
- [ ] 데이터베이스 연동
- [ ] 사용자 계정 시스템
- [ ] 과거 분석 기록 저장
- [ ] 상세한 운세 해석 추가
- [ ] AI 기반 해석 개선

## ⚠️ 주의사항

### 정확도 관련
1. **근사 계산**: 본 시스템은 교육 및 참고 목적으로 제작되었으며, 정확한 만세력이 아닌 근사 계산을 사용합니다.

2. **양력 기준**: 모든 입력은 양력 기준입니다. 음력 생일인 경우 양력으로 변환 후 입력하세요.

3. **시간 기준**: 시간은 진태양시가 아닌 평균태양시 기준입니다.

4. **절입 미반영**: 월 경계의 절입(節入) 시간이 반영되지 않았습니다.

### 사용 제한
- 본 시스템의 결과는 참고용이며, 중요한 결정의 근거로 사용하지 마세요.
- 전문 명리학자의 상담을 대체할 수 없습니다.
- 상업적 용도로 사용 시 정확도 개선이 필요합니다.

## 🤝 기여하기

본 프로젝트에 기여하고 싶으시다면:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 개선 제안
- 정확한 만세력 데이터 추가
- 음력 변환 알고리즘 개선
- UI/UX 개선
- 추가 분석 기능
- 버그 리포트

## 📚 참고 자료

### 명리학 기초
- 천간지지와 60갑자
- 오행 상생상극 원리
- 사주팔자 구성 요소

### 추천 서적
- 『명리정종』 - 만육오
- 『적천수』 - 경도
- 『연해자평』 - 서자평

### 온라인 리소스
- 한국천문연구원 만세력
- 국립민속박물관 명리학 자료
- 한국역학회

## 📄 라이선스

이 프로젝트는 교육 및 참고 목적으로 제작되었습니다.

MIT License

Copyright (c) 2025 Saju System

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 👨‍💻 개발자

**Claude Code**
- 개발 도구: Claude Code by Anthropic
- 개발 일자: 2025년 10월 16일
- 버전: 1.0.0

## 🙏 감사의 말

이 프로젝트는 한국 전통 명리학을 현대 기술과 접목시키려는 시도입니다.
수천 년의 역사를 가진 명리학을 존중하며, 더 많은 사람들이 쉽게 접근할 수 있도록 만들었습니다.

---

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!

💬 질문이나 제안이 있으시면 Issue를 열어주세요.

🔮 행운을 빕니다!
