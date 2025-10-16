# 👨‍💻 사주팔자 운세 시스템 - 개발자 문서

## 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [시스템 아키텍처](#시스템-아키텍처)
3. [코드 구조](#코드-구조)
4. [핵심 알고리즘](#핵심-알고리즘)
5. [개발 가이드](#개발-가이드)
6. [테스트](#테스트)
7. [배포](#배포)
8. [확장 가이드](#확장-가이드)

---

## 🎯 프로젝트 개요

### 기술 스택

```
Frontend:
├── HTML5 (Semantic HTML)
├── CSS3 (Grid, Flexbox, Animations)
└── Vanilla JavaScript (ES6+)

Libraries:
└── None (Pure JavaScript)

Development:
├── Browser DevTools
└── VS Code (권장)

Deployment:
├── Static Hosting
└── GitHub Pages (권장)
```

### 디자인 패턴

- **클래스 기반 OOP**: `SajuCalculator` 클래스
- **모듈 패턴**: 각 파일별 책임 분리
- **이벤트 주도**: DOM 이벤트 리스너
- **데이터 캡슐화**: Private 메서드 활용

### 브라우저 지원

```javascript
// Target Browsers
{
  "chrome": "90+",
  "firefox": "88+",
  "safari": "14+",
  "edge": "90+",
  "ie": "not supported"
}
```

---

## 🏗 시스템 아키텍처

### 전체 구조

```
┌─────────────────────────────────────┐
│         index.html                  │
│     (View Layer)                    │
└────────────┬────────────────────────┘
             │
             ├─────────────────────────┐
             │                         │
┌────────────▼──────────┐  ┌──────────▼─────────┐
│   app.js               │  │   styles.css       │
│   (Controller)         │  │   (Presentation)   │
└────────────┬───────────┘  └────────────────────┘
             │
             │ uses
             │
┌────────────▼──────────┐
│  saju-calculator.js   │
│  (Model / Logic)      │
└───────────────────────┘
```

### 데이터 흐름

```
User Input
    ↓
Form Validation (app.js)
    ↓
birthInfo Object
    ↓
SajuCalculator.getFullAnalysis()
    ↓
├── calculateSaju()
│   ├── getGanJi() (년주)
│   ├── getMonthPillar() (월주)
│   ├── getDayPillar() (일주)
│   └── getHourPillar() (시주)
│
├── analyzeElements()
│
└── getTodayFortune()
    ↓
Analysis Result Object
    ↓
DOM Update (app.js)
    ↓
Display to User
```

---

## 📁 코드 구조

### 파일별 책임

#### 1. `index.html` - View Layer

**책임:**
- HTML 구조 정의
- 시맨틱 마크업
- 접근성 고려

**주요 섹션:**
```html
<!-- 입력 섹션 -->
<section class="input-section">
  <form id="sajuForm">...</form>
</section>

<!-- 결과 섹션 -->
<section class="results-section" id="results">
  <div class="saju-table">...</div>
  <div class="day-master-info">...</div>
  <div class="elements-analysis">...</div>
  <div class="today-fortune">...</div>
</section>
```

#### 2. `styles.css` - Presentation Layer

**구조:**
```css
/* 1. Reset & Base */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 2. Layout */
.container { max-width: 1200px; ... }

/* 3. Components */
.input-section { ... }
.results-section { ... }

/* 4. Elements */
.element-목 { ... }

/* 5. Responsive */
@media (max-width: 768px) { ... }
```

**CSS 변수 활용 (확장 가능):**
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --border-radius: 15px;
  --spacing: 30px;
}
```

#### 3. `saju-calculator.js` - Model Layer

**클래스 구조:**
```javascript
class SajuCalculator {
  // 데이터 정의
  constructor() {
    this.heavenlyStems = [...];
    this.earthlyBranches = [...];
    this.elements = {...};
    this.yinYang = {...};
    // ...
  }

  // Public Methods
  calculateSaju(birthInfo) { ... }
  analyzeElements(saju) { ... }
  getTodayFortune(saju) { ... }
  getFullAnalysis(birthInfo) { ... }

  // Private Methods (Helper)
  getGanJi(year) { ... }
  getMonthPillar(year, month) { ... }
  getDayPillar(year, month, day) { ... }
  getHourPillar(year, month, day, hour) { ... }

  // Analysis Helpers
  getElementRelation(element1, element2) { ... }
  getFortuneSummary(relation, element) { ... }
}
```

#### 4. `app.js` - Controller Layer

**주요 함수:**
```javascript
// Event Handlers
form.addEventListener('submit', handleSubmit);

// Validation
function validateInput(birthInfo) { ... }

// Display
function displayResults(analysis) { ... }
function displayElementsChart(elements) { ... }

// Utilities
function getElementEmoji(element) { ... }
function getElementDescription(element) { ... }
```

---

## 🔬 핵심 알고리즘

### 1. 60갑자 계산 알고리즘

```javascript
// 기본 원리: 천간(10개) × 지지(12개) = 60주기
getGanJi(year) {
  const baseYear = 1984; // 갑자년
  const diff = year - baseYear;
  const cycle = ((diff % 60) + 60) % 60; // 음수 처리

  const stemIndex = cycle % 10;
  const branchIndex = cycle % 12;

  return {
    stem: this.heavenlyStems[stemIndex],
    branch: this.earthlyBranches[branchIndex],
    ganJi: this.heavenlyStems[stemIndex] + this.earthlyBranches[branchIndex]
  };
}
```

**왜 1984년이 기준인가?**
- 1984년 = 갑자년 (60갑자의 시작)
- 계산의 편의성
- 현대 대부분의 생년월일 커버

### 2. 월주 계산 알고리즘

```javascript
getMonthPillar(year, month) {
  // 년간에 따른 월간 계산
  const yearStem = this.getGanJi(year).stem;
  const yearStemIndex = this.heavenlyStems.indexOf(yearStem);

  // 오호법(五虎法) 적용
  const monthStemBase = (yearStemIndex % 5) * 2;
  const monthStemIndex = (monthStemBase + month - 1) % 10;

  const monthBranch = this.monthBranches[month];
  const monthStem = this.heavenlyStems[monthStemIndex];

  return {
    stem: monthStem,
    branch: monthBranch,
    ganJi: monthStem + monthBranch
  };
}
```

**오호법 (五虎法) 설명:**
```
년간이 갑(0) 또는 기(5): 1월 = 병인
년간이 을(1) 또는 경(6): 1월 = 무인
년간이 병(2) 또는 신(7): 1월 = 경인
년간이 정(3) 또는 임(8): 1월 = 임인
년간이 무(4) 또는 계(9): 1월 = 갑인
```

### 3. 일주 계산 알고리즘

```javascript
getDayPillar(year, month, day) {
  // 근사 계산 (실제 만세력과 다를 수 있음)
  const date = new Date(year, month - 1, day);
  const baseDate = new Date(1984, 0, 1); // 갑자일

  const daysDiff = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
  const cycle = ((daysDiff % 60) + 60) % 60;

  const stemIndex = cycle % 10;
  const branchIndex = cycle % 12;

  return {
    stem: this.heavenlyStems[stemIndex],
    branch: this.earthlyBranches[branchIndex],
    ganJi: this.heavenlyStems[stemIndex] + this.earthlyBranches[branchIndex]
  };
}
```

**주의사항:**
- 실제 만세력과 오차 가능
- 윤달, 절입 미반영
- 상업적 용도는 정확한 만세력 필요

### 4. 시주 계산 알고리즘

```javascript
getHourPillar(year, month, day, hour) {
  const dayPillar = this.getDayPillar(year, month, day);
  const dayStemIndex = this.heavenlyStems.indexOf(dayPillar.stem);

  // 시간을 지지로 변환
  const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
  const hourBranch = this.earthlyBranches[hourBranchIndex];

  // 오자법(五子法) 적용
  const hourStemBase = (dayStemIndex % 5) * 2;
  const hourStemIndex = (hourStemBase + hourBranchIndex) % 10;
  const hourStem = this.heavenlyStems[hourStemIndex];

  return {
    stem: hourStem,
    branch: hourBranch,
    ganJi: hourStem + hourBranch
  };
}
```

**시간대 변환:**
```
00:00-00:59 → 자시 (23:30 시작)
01:00-02:59 → 축시 (01:30 시작)
...
```

### 5. 오행 분석 알고리즘

```javascript
analyzeElements(saju) {
  const elements = {};
  const pillars = [saju.year, saju.month, saju.day, saju.hour];

  // 각 기둥의 천간과 지지에서 오행 추출
  pillars.forEach(pillar => {
    const stemElement = this.elements[pillar.stem];
    const branchElement = this.elements[pillar.branch];

    elements[stemElement] = (elements[stemElement] || 0) + 1;
    elements[branchElement] = (elements[branchElement] || 0) + 1;
  });

  return elements; // { 목: 2, 화: 2, 토: 0, 금: 3, 수: 1 }
}
```

### 6. 오행 관계 알고리즘

```javascript
getElementRelation(element1, element2) {
  const relations = {
    '목': { generates: '화', controls: '토',
            controlledBy: '금', generatedBy: '수' },
    '화': { generates: '토', controls: '금',
            controlledBy: '수', generatedBy: '목' },
    '토': { generates: '금', controls: '수',
            controlledBy: '목', generatedBy: '화' },
    '금': { generates: '수', controls: '목',
            controlledBy: '화', generatedBy: '토' },
    '수': { generates: '목', controls: '화',
            controlledBy: '토', generatedBy: '금' }
  };

  const rel = relations[element1];
  if (rel.generates === element2) return '상생';
  if (rel.controls === element2) return '상극';
  if (rel.controlledBy === element2) return '극당함';
  if (rel.generatedBy === element2) return '생조받음';
  return '동일';
}
```

---

## 🛠 개발 가이드

### 개발 환경 설정

#### 1. 에디터 설정 (VS Code)

**권장 확장:**
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "ritwickdey.liveserver"
  ]
}
```

**설정 파일 (`.vscode/settings.json`):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "javascript.validate.enable": true,
  "css.validate": true,
  "html.validate.scripts": true
}
```

#### 2. Prettier 설정 (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "printWidth": 80
}
```

#### 3. ESLint 설정 (`.eslintrc.json`)

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn"
  }
}
```

### 코딩 컨벤션

#### JavaScript

```javascript
// 1. 네이밍
// - 클래스: PascalCase
class SajuCalculator {}

// - 함수/변수: camelCase
function calculateSaju() {}
const birthInfo = {};

// - 상수: UPPER_SNAKE_CASE
const BASE_YEAR = 1984;

// 2. 함수
// - 화살표 함수 활용
const getElement = (stem) => this.elements[stem];

// - 명확한 이름
function calculateYearPillar() {} // Good
function calc() {} // Bad

// 3. 주석
// - JSDoc 스타일
/**
 * 사주팔자 계산
 * @param {Object} birthInfo - 생년월일 정보
 * @returns {Object} 사주 결과
 */
function calculateSaju(birthInfo) {}

// 4. 에러 처리
try {
  const result = calculateSaju(birthInfo);
} catch (error) {
  console.error('사주 계산 오류:', error);
}
```

#### CSS

```css
/* 1. BEM 네이밍 (권장) */
.saju-table {}
.saju-table__header {}
.saju-table__cell--highlighted {}

/* 2. 계층 구조 */
.container {
  /* Positioning */
  position: relative;

  /* Box Model */
  display: flex;
  width: 100%;
  padding: 20px;

  /* Typography */
  font-size: 16px;

  /* Visual */
  background: white;
  border-radius: 10px;

  /* Misc */
  transition: all 0.3s;
}

/* 3. 모바일 우선 */
.element {
  font-size: 14px;
}

@media (min-width: 768px) {
  .element {
    font-size: 16px;
  }
}
```

### Git 워크플로우

#### 브랜치 전략

```
main (production)
  ├── develop (development)
  │   ├── feature/new-function
  │   ├── feature/ui-improvement
  │   └── bugfix/calculation-error
  └── hotfix/critical-bug
```

#### 커밋 메시지

```bash
# 형식
type: subject

body (optional)

# 타입
feat: 새로운 기능
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가
chore: 기타 작업

# 예시
feat: 십성 계산 기능 추가

십성(十星) 계산 알고리즘을 구현했습니다.
- 비견, 겁재, 식신 등 10가지 십성 판단
- 일간 기준 상대 오행 분석
```

---

## 🧪 테스트

### 수동 테스트 체크리스트

#### 기능 테스트

```markdown
[ ] 사주 계산
  [ ] 정상적인 날짜 입력
  [ ] 경계값 테스트 (1900년, 2100년)
  [ ] 2월 29일 (윤년)
  [ ] 모든 월 테스트 (1-12월)
  [ ] 모든 시간대 테스트 (자시-해시)

[ ] 오행 분석
  [ ] 각 오행 개수 정확성
  [ ] 강한/약한 오행 판단
  [ ] 오행 관계 계산

[ ] UI/UX
  [ ] 폼 유효성 검사
  [ ] 결과 표시
  [ ] 반응형 디자인
  [ ] 애니메이션

[ ] 브라우저 호환성
  [ ] Chrome
  [ ] Firefox
  [ ] Safari
  [ ] Edge
```

### 테스트 케이스

```javascript
// test-cases.js (수동 테스트용)
const testCases = [
  {
    name: '기본 케이스',
    input: {
      year: 1990,
      month: 5,
      day: 15,
      hour: 12,
      gender: '남'
    },
    expected: {
      year: { stem: '경', branch: '오' },
      // ...
    }
  },
  {
    name: '윤년 테스트',
    input: {
      year: 2000,
      month: 2,
      day: 29,
      hour: 0,
      gender: '여'
    }
  },
  {
    name: '경계값 테스트',
    input: {
      year: 1900,
      month: 1,
      day: 1,
      hour: 0,
      gender: '남'
    }
  }
];

// 테스트 실행
testCases.forEach(testCase => {
  console.log(`Testing: ${testCase.name}`);
  const calculator = new SajuCalculator();
  const result = calculator.calculateSaju(testCase.input);
  console.log(result);
});
```

### 디버깅 팁

```javascript
// 1. 콘솔 로깅
console.log('birthInfo:', birthInfo);
console.table(elements); // 표 형식으로 출력

// 2. 브라우저 DevTools
debugger; // 브레이크포인트

// 3. 에러 추적
try {
  const result = calculateSaju(birthInfo);
} catch (error) {
  console.error('Error:', error);
  console.trace(); // 스택 트레이스
}

// 4. 성능 측정
console.time('saju-calculation');
const result = calculateSaju(birthInfo);
console.timeEnd('saju-calculation');
```

---

## 🚀 배포

### GitHub Pages 배포

```bash
# 1. GitHub 저장소 생성
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/saju-system.git
git push -u origin main

# 2. GitHub Pages 설정
# Settings → Pages → Source: main branch → Save

# 3. 접속
# https://username.github.io/saju-system/
```

### Netlify 배포

```bash
# 1. Netlify 사이트에서 "New site from Git" 선택
# 2. GitHub 저장소 연결
# 3. Build settings:
#    - Build command: (비워둠)
#    - Publish directory: /
# 4. Deploy!
```

### Vercel 배포

```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. 배포
cd saju-system
vercel

# 3. 프로덕션 배포
vercel --prod
```

---

## 🔧 확장 가이드

### 새로운 기능 추가하기

#### 예시: 십성(十星) 기능 추가

**1. `saju-calculator.js`에 메서드 추가**

```javascript
// SajuCalculator 클래스에 추가
calculateTenGods(saju) {
  const dayElement = this.elements[saju.day.stem];
  const dayYinYang = this.yinYang[saju.day.stem];

  const tenGods = {};
  const pillars = [saju.year, saju.month, saju.hour];

  pillars.forEach((pillar, index) => {
    const stem = pillar.stem;
    const element = this.elements[stem];
    const yinYang = this.yinYang[stem];

    const god = this.determineTenGod(
      dayElement, dayYinYang,
      element, yinYang
    );

    tenGods[['year', 'month', 'hour'][index]] = god;
  });

  return tenGods;
}

determineTenGod(myElement, myYinYang, otherElement, otherYinYang) {
  // 십성 판단 로직
  if (myElement === otherElement) {
    return myYinYang === otherYinYang ? '비견' : '겁재';
  }
  // ... 추가 로직
}
```

**2. `app.js`에 UI 업데이트 추가**

```javascript
function displayTenGods(tenGods) {
  const container = document.getElementById('tenGodsContainer');
  container.innerHTML = `
    <h3>십성 분석</h3>
    <p>년주: ${tenGods.year}</p>
    <p>월주: ${tenGods.month}</p>
    <p>시주: ${tenGods.hour}</p>
  `;
}
```

**3. `index.html`에 컨테이너 추가**

```html
<div class="ten-gods-analysis">
  <div id="tenGodsContainer"></div>
</div>
```

**4. `styles.css`에 스타일 추가**

```css
.ten-gods-analysis {
  background: white;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 30px;
}
```

### API 통합하기

#### 예시: 음력 변환 API

```javascript
// lunar-calendar.js
class LunarCalendar {
  async convertToSolar(lunarDate) {
    const { year, month, day, isLeap } = lunarDate;

    try {
      const response = await fetch(
        `https://api.example.com/lunar-to-solar?` +
        `year=${year}&month=${month}&day=${day}&leap=${isLeap}`
      );

      const data = await response.json();
      return {
        year: data.solar_year,
        month: data.solar_month,
        day: data.solar_day
      };
    } catch (error) {
      console.error('음력 변환 오류:', error);
      return null;
    }
  }
}
```

### 데이터베이스 연동

#### 예시: 사주 저장 기능

```javascript
// database.js
class SajuDatabase {
  constructor() {
    this.dbName = 'SajuDB';
    this.version = 1;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('saju', { keyPath: 'id', autoIncrement: true });
      };
    });
  }

  async saveSaju(birthInfo, analysis) {
    const db = await this.init();
    const transaction = db.transaction(['saju'], 'readwrite');
    const store = transaction.objectStore('saju');

    const data = {
      birthInfo,
      analysis,
      timestamp: new Date().toISOString()
    };

    return store.add(data);
  }

  async getAllSaju() {
    const db = await this.init();
    const transaction = db.transaction(['saju'], 'readonly');
    const store = transaction.objectStore('saju');

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
```

### 성능 최적화

#### 1. 메모이제이션

```javascript
class SajuCalculator {
  constructor() {
    // ...
    this.cache = new Map();
  }

  getDayPillar(year, month, day) {
    const key = `${year}-${month}-${day}`;

    if (this.cache.has(key)) {
      return this.cache.get(key);
    }

    const result = this._calculateDayPillar(year, month, day);
    this.cache.set(key, result);

    return result;
  }
}
```

#### 2. 지연 로딩

```javascript
// 결과를 필요할 때만 계산
class LazyAnalysis {
  constructor(birthInfo) {
    this.birthInfo = birthInfo;
    this._saju = null;
    this._elements = null;
  }

  get saju() {
    if (!this._saju) {
      this._saju = this.calculator.calculateSaju(this.birthInfo);
    }
    return this._saju;
  }

  get elements() {
    if (!this._elements) {
      this._elements = this.calculator.analyzeElements(this.saju);
    }
    return this._elements;
  }
}
```

---

## 📚 추가 리소스

### 유용한 라이브러리

```javascript
// 1. 날짜 처리
// date-fns: https://date-fns.org/
import { format, addDays } from 'date-fns';

// 2. 차트
// Chart.js: https://www.chartjs.org/
const chart = new Chart(ctx, {
  type: 'radar',
  data: elementsData
});

// 3. 음력 변환
// lunar-javascript: https://github.com/yize/lunar-javascript
const lunar = Lunar.fromDate(new Date());
```

### 참고 자료

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)

---

**마지막 업데이트**: 2025년 10월 16일
**버전**: 1.0.0

Happy Coding! 💻
