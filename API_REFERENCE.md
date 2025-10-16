# 📖 API Reference - SajuCalculator Class

## 목차
1. [개요](#개요)
2. [클래스 초기화](#클래스-초기화)
3. [Public Methods](#public-methods)
4. [Private Methods](#private-methods)
5. [데이터 구조](#데이터-구조)
6. [사용 예제](#사용-예제)
7. [에러 처리](#에러-처리)

---

## 📚 개요

`SajuCalculator` 클래스는 사주팔자 계산의 핵심 로직을 담당합니다.

**파일**: `saju-calculator.js`
**버전**: 1.0.0
**의존성**: 없음 (Pure JavaScript)

---

## 🏗 클래스 초기화

### Constructor

```javascript
const calculator = new SajuCalculator();
```

#### Description
새로운 SajuCalculator 인스턴스를 생성합니다.

#### Parameters
없음

#### Returns
`SajuCalculator` - 새로운 인스턴스

#### Properties Initialized

```javascript
{
  heavenlyStems: string[],      // 천간 배열 (10개)
  earthlyBranches: string[],    // 지지 배열 (12개)
  elements: object,              // 오행 매핑
  yinYang: object,              // 음양 매핑
  tenGods: object,              // 십성 설명
  monthBranches: object         // 월별 지지
}
```

#### Example

```javascript
const calculator = new SajuCalculator();
console.log(calculator.heavenlyStems);
// ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
```

---

## 🔧 Public Methods

### calculateSaju()

사주팔자를 계산합니다.

#### Signature

```javascript
calculateSaju(birthInfo: Object): Object
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| birthInfo | Object | Yes | 생년월일 정보 |
| birthInfo.year | number | Yes | 출생 연도 (1900-2100) |
| birthInfo.month | number | Yes | 출생 월 (1-12) |
| birthInfo.day | number | Yes | 출생 일 (1-31) |
| birthInfo.hour | number | Yes | 출생 시간 (0-23) |
| birthInfo.gender | string | Yes | 성별 ('남' 또는 '여') |

#### Returns

```javascript
{
  year: {
    stem: string,      // 년간
    branch: string,    // 년지
    ganJi: string      // 년주 (간+지)
  },
  month: {
    stem: string,
    branch: string,
    ganJi: string
  },
  day: {
    stem: string,
    branch: string,
    ganJi: string
  },
  hour: {
    stem: string,
    branch: string,
    ganJi: string
  },
  gender: string,
  birthInfo: Object
}
```

#### Example

```javascript
const birthInfo = {
  year: 1990,
  month: 5,
  day: 15,
  hour: 12,
  gender: '남'
};

const saju = calculator.calculateSaju(birthInfo);
console.log(saju);
/*
{
  year: { stem: '경', branch: '오', ganJi: '경오' },
  month: { stem: '신', branch: '사', ganJi: '신사' },
  day: { stem: '갑', branch: '자', ganJi: '갑자' },
  hour: { stem: '경', branch: '오', ganJi: '경오' },
  gender: '남',
  birthInfo: { ... }
}
*/
```

---

### analyzeElements()

사주의 오행 분포를 분석합니다.

#### Signature

```javascript
analyzeElements(saju: Object): Object
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| saju | Object | Yes | calculateSaju()의 반환값 |

#### Returns

```javascript
{
  '목': number,  // 목 오행 개수 (0-8)
  '화': number,  // 화 오행 개수 (0-8)
  '토': number,  // 토 오행 개수 (0-8)
  '금': number,  // 금 오행 개수 (0-8)
  '수': number   // 수 오행 개수 (0-8)
}
```

#### Example

```javascript
const saju = calculator.calculateSaju(birthInfo);
const elements = calculator.analyzeElements(saju);
console.log(elements);
// { 목: 2, 화: 2, 토: 0, 금: 3, 수: 1 }
```

#### Notes
- 각 기둥의 천간과 지지에서 오행을 추출
- 총 8글자이므로 합계는 8
- 0개인 오행은 부족한 오행

---

### getTodayFortune()

오늘의 운세를 계산합니다.

#### Signature

```javascript
getTodayFortune(saju: Object): Object
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| saju | Object | Yes | calculateSaju()의 반환값 |

#### Returns

```javascript
{
  today: {
    stem: string,      // 오늘의 천간
    branch: string,    // 오늘의 지지
    ganJi: string      // 오늘의 일진
  },
  relation: string,    // 관계 ('상생', '상극', '극당함', '생조받음', '동일')
  element: string,     // 오늘의 오행
  analysis: string     // 운세 해석
}
```

#### Example

```javascript
const saju = calculator.calculateSaju(birthInfo);
const fortune = calculator.getTodayFortune(saju);
console.log(fortune);
/*
{
  today: { stem: '갑', branch: '진', ganJi: '갑진' },
  relation: '상생',
  element: '목',
  analysis: '오늘은 목 기운이 당신을 도와주는 날입니다...'
}
*/
```

#### Notes
- 현재 날짜 기준으로 계산
- 일간과 오늘 일진의 오행 관계 분석

---

### getFullAnalysis()

전체 사주 분석을 수행합니다. (권장)

#### Signature

```javascript
getFullAnalysis(birthInfo: Object): Object
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| birthInfo | Object | Yes | 생년월일 정보 (calculateSaju와 동일) |

#### Returns

```javascript
{
  saju: Object,           // calculateSaju() 결과
  elements: Object,       // analyzeElements() 결과
  strongElement: [        // 가장 강한 오행
    string,               // 오행 이름
    number                // 개수
  ],
  weakElements: [         // 약한 오행들 (≤1개)
    [string, number],
    ...
  ],
  todayFortune: Object,   // getTodayFortune() 결과
  dayMaster: {            // 일간 정보
    stem: string,         // 일간 (나를 나타냄)
    branch: string,       // 일지
    element: string,      // 일간의 오행
    yinYang: string       // 일간의 음양
  }
}
```

#### Example

```javascript
const birthInfo = {
  year: 1990,
  month: 5,
  day: 15,
  hour: 12,
  gender: '남'
};

const analysis = calculator.getFullAnalysis(birthInfo);
console.log(analysis);
/*
{
  saju: { ... },
  elements: { 목: 2, 화: 2, 토: 0, 금: 3, 수: 1 },
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
*/
```

#### Notes
- 가장 편리한 메서드
- 모든 분석을 한 번에 수행
- UI 표시에 최적화

---

## 🔐 Private Methods

### getGanJi()

특정 연도의 간지를 계산합니다.

#### Signature

```javascript
getGanJi(year: number): Object
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| year | number | Yes | 연도 (1900-2100) |

#### Returns

```javascript
{
  stem: string,      // 천간
  branch: string,    // 지지
  ganJi: string      // 간지
}
```

#### Algorithm

```javascript
const baseYear = 1984;  // 갑자년
const diff = year - baseYear;
const cycle = ((diff % 60) + 60) % 60;

const stemIndex = cycle % 10;
const branchIndex = cycle % 12;
```

#### Example

```javascript
const ganJi = calculator.getGanJi(1990);
// { stem: '경', branch: '오', ganJi: '경오' }
```

---

### getMonthPillar()

월주를 계산합니다.

#### Signature

```javascript
getMonthPillar(year: number, month: number): Object
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| year | number | Yes | 연도 |
| month | number | Yes | 월 (1-12) |

#### Returns

```javascript
{
  stem: string,
  branch: string,
  ganJi: string
}
```

#### Algorithm

오호법(五虎法) 적용:
```javascript
const yearStem = this.getGanJi(year).stem;
const yearStemIndex = this.heavenlyStems.indexOf(yearStem);
const monthStemBase = (yearStemIndex % 5) * 2;
const monthStemIndex = (monthStemBase + month - 1) % 10;
```

---

### getDayPillar()

일주를 계산합니다.

#### Signature

```javascript
getDayPillar(year: number, month: number, day: number): Object
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| year | number | Yes | 연도 |
| month | number | Yes | 월 (1-12) |
| day | number | Yes | 일 (1-31) |

#### Returns

```javascript
{
  stem: string,
  branch: string,
  ganJi: string
}
```

#### Algorithm

근사 계산 (실제 만세력과 다를 수 있음):
```javascript
const date = new Date(year, month - 1, day);
const baseDate = new Date(1984, 0, 1);  // 갑자일
const daysDiff = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
const cycle = ((daysDiff % 60) + 60) % 60;
```

#### Warning
⚠️ 이 메서드는 근사치를 사용합니다. 정확한 일주는 만세력 참조 필요.

---

### getHourPillar()

시주를 계산합니다.

#### Signature

```javascript
getHourPillar(year: number, month: number, day: number, hour: number): Object
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| year | number | Yes | 연도 |
| month | number | Yes | 월 |
| day | number | Yes | 일 |
| hour | number | Yes | 시간 (0-23) |

#### Returns

```javascript
{
  stem: string,
  branch: string,
  ganJi: string
}
```

#### Algorithm

오자법(五子法) 적용:
```javascript
const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
const hourStemBase = (dayStemIndex % 5) * 2;
const hourStemIndex = (hourStemBase + hourBranchIndex) % 10;
```

---

### getElementRelation()

두 오행 간의 관계를 분석합니다.

#### Signature

```javascript
getElementRelation(element1: string, element2: string): string
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| element1 | string | Yes | 첫 번째 오행 |
| element2 | string | Yes | 두 번째 오행 |

#### Returns

`string` - 관계 ('상생', '상극', '극당함', '생조받음', '동일')

#### Example

```javascript
const relation = calculator.getElementRelation('목', '화');
// '상생' (목생화)

const relation2 = calculator.getElementRelation('목', '토');
// '상극' (목극토)
```

#### Relation Table

| element1 | element2 | Relation |
|----------|----------|----------|
| 목 | 화 | 상생 |
| 목 | 토 | 상극 |
| 목 | 금 | 극당함 |
| 목 | 수 | 생조받음 |
| 목 | 목 | 동일 |

---

### getFortuneSummary()

운세 관계에 따른 해석을 반환합니다.

#### Signature

```javascript
getFortuneSummary(relation: string, element: string): string
```

#### Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| relation | string | Yes | 관계 ('상생', '상극' 등) |
| element | string | Yes | 오행 |

#### Returns

`string` - 운세 해석 메시지

#### Example

```javascript
const summary = calculator.getFortuneSummary('상생', '목');
// '오늘은 목 기운이 당신을 도와주는 날입니다. 새로운 시도나 중요한 결정을 하기 좋은 날입니다.'
```

---

## 📦 데이터 구조

### heavenlyStems

천간 배열

```javascript
['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계']
```

**Index**: 0-9
**Type**: `string[]`

---

### earthlyBranches

지지 배열

```javascript
['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해']
```

**Index**: 0-11
**Type**: `string[]`

---

### elements

천간/지지별 오행 매핑

```javascript
{
  '갑': '목', '을': '목',
  '병': '화', '정': '화',
  '무': '토', '기': '토',
  '경': '금', '신': '금',
  '임': '수', '계': '수',
  '인': '목', '묘': '목',
  '진': '토', '술': '토', '축': '토', '미': '토',
  '사': '화', '오': '화',
  '신': '금', '유': '금',
  '해': '수', '자': '수'
}
```

**Type**: `Object<string, string>`

---

### yinYang

천간/지지별 음양 매핑

```javascript
{
  '갑': '양', '을': '음',
  '병': '양', '정': '음',
  // ...
  '자': '양', '축': '음',
  // ...
}
```

**Type**: `Object<string, string>`

---

### monthBranches

월별 지지 매핑

```javascript
{
  1: '인',  // 1월 = 인월
  2: '묘',  // 2월 = 묘월
  3: '진',
  4: '사',
  5: '오',
  6: '미',
  7: '신',
  8: '유',
  9: '술',
  10: '해',
  11: '자',
  12: '축'
}
```

**Type**: `Object<number, string>`

---

## 💡 사용 예제

### 기본 사용

```javascript
// 1. 인스턴스 생성
const calculator = new SajuCalculator();

// 2. 생년월일 정보 준비
const birthInfo = {
  year: 1990,
  month: 5,
  day: 15,
  hour: 12,
  gender: '남'
};

// 3. 전체 분석 (가장 간단)
const analysis = calculator.getFullAnalysis(birthInfo);

// 4. 결과 사용
console.log('일간:', analysis.dayMaster.stem);
console.log('오행:', analysis.elements);
console.log('오늘의 운세:', analysis.todayFortune.analysis);
```

### 단계별 사용

```javascript
const calculator = new SajuCalculator();
const birthInfo = { year: 1990, month: 5, day: 15, hour: 12, gender: '남' };

// 1단계: 사주 계산
const saju = calculator.calculateSaju(birthInfo);
console.log('사주팔자:', saju);

// 2단계: 오행 분석
const elements = calculator.analyzeElements(saju);
console.log('오행 분포:', elements);

// 3단계: 오늘의 운세
const fortune = calculator.getTodayFortune(saju);
console.log('오늘의 운세:', fortune);
```

### 여러 사람 비교

```javascript
const calculator = new SajuCalculator();

const people = [
  { name: '철수', year: 1990, month: 5, day: 15, hour: 12, gender: '남' },
  { name: '영희', year: 1992, month: 8, day: 20, hour: 14, gender: '여' }
];

people.forEach(person => {
  const analysis = calculator.getFullAnalysis(person);
  console.log(`${person.name}의 일간: ${analysis.dayMaster.stem}`);
  console.log(`${person.name}의 강한 오행: ${analysis.strongElement[0]}`);
});
```

### 오행 관계 확인

```javascript
const calculator = new SajuCalculator();

const person1 = { year: 1990, month: 5, day: 15, hour: 12, gender: '남' };
const person2 = { year: 1992, month: 8, day: 20, hour: 14, gender: '여' };

const analysis1 = calculator.getFullAnalysis(person1);
const analysis2 = calculator.getFullAnalysis(person2);

const element1 = analysis1.dayMaster.element;
const element2 = analysis2.dayMaster.element;

const relation = calculator.getElementRelation(element1, element2);
console.log(`두 사람의 관계: ${relation}`);
```

---

## ⚠️ 에러 처리

### 유효성 검사

```javascript
function validateBirthInfo(birthInfo) {
  const { year, month, day, hour, gender } = birthInfo;

  // 연도 체크
  if (year < 1900 || year > 2100) {
    throw new Error('연도는 1900-2100 범위여야 합니다.');
  }

  // 월 체크
  if (month < 1 || month > 12) {
    throw new Error('월은 1-12 범위여야 합니다.');
  }

  // 일 체크
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    throw new Error(`${month}월은 1-${daysInMonth}일까지입니다.`);
  }

  // 시간 체크
  if (hour < 0 || hour > 23) {
    throw new Error('시간은 0-23 범위여야 합니다.');
  }

  // 성별 체크
  if (gender !== '남' && gender !== '여') {
    throw new Error('성별은 "남" 또는 "여"여야 합니다.');
  }

  return true;
}
```

### 에러 처리 예시

```javascript
const calculator = new SajuCalculator();

try {
  const birthInfo = {
    year: 1990,
    month: 2,
    day: 30,  // 오류: 2월 30일은 없음
    hour: 12,
    gender: '남'
  };

  validateBirthInfo(birthInfo);
  const analysis = calculator.getFullAnalysis(birthInfo);
} catch (error) {
  console.error('오류:', error.message);
  // 사용자에게 오류 메시지 표시
}
```

### Null 체크

```javascript
const analysis = calculator.getFullAnalysis(birthInfo);

// 결과 체크
if (!analysis || !analysis.saju) {
  console.error('사주 계산 실패');
  return;
}

// 안전하게 접근
const dayStem = analysis?.dayMaster?.stem || '알 수 없음';
```

---

## 🔍 디버깅

### 로깅

```javascript
const calculator = new SajuCalculator();

// 디버그 모드
const DEBUG = true;

function debugLog(label, data) {
  if (DEBUG) {
    console.log(`[DEBUG] ${label}:`, data);
  }
}

const birthInfo = { year: 1990, month: 5, day: 15, hour: 12, gender: '남' };

const saju = calculator.calculateSaju(birthInfo);
debugLog('사주', saju);

const elements = calculator.analyzeElements(saju);
debugLog('오행', elements);

const fortune = calculator.getTodayFortune(saju);
debugLog('운세', fortune);
```

### 성능 측정

```javascript
console.time('사주계산');
const analysis = calculator.getFullAnalysis(birthInfo);
console.timeEnd('사주계산');
// 사주계산: 2.5ms
```

---

## 📝 버전 히스토리

### v1.0.0 (2025-10-16)
- 초기 릴리스
- 기본 사주 계산 기능
- 오행 분석
- 오늘의 운세

### 향후 계획

- v1.1.0: 십성 계산
- v1.2.0: 대운 계산
- v2.0.0: 정확한 만세력 적용

---

**마지막 업데이트**: 2025년 10월 16일
**버전**: 1.0.0
**라이선스**: MIT
