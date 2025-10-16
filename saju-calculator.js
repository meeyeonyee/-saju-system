// 사주 계산 시스템
// Korean Four Pillars of Destiny Calculator

class SajuCalculator {
  constructor() {
    // 천간 (天干) - Heavenly Stems
    this.heavenlyStems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];

    // 지지 (地支) - Earthly Branches
    this.earthlyBranches = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

    // 오행 (五行) - Five Elements
    this.elements = {
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
    };

    // 음양 (陰陽)
    this.yinYang = {
      '갑': '양', '을': '음',
      '병': '양', '정': '음',
      '무': '양', '기': '음',
      '경': '양', '신': '음',
      '임': '양', '계': '음',
      '자': '양', '축': '음', '인': '양', '묘': '음',
      '진': '양', '사': '음', '오': '양', '미': '음',
      '신': '양', '유': '음', '술': '양', '해': '음'
    };

    // 십성 (十星) - Ten Gods
    this.tenGods = {
      '비견': '같은 오행, 같은 음양',
      '겁재': '같은 오행, 다른 음양',
      '식신': '내가 생하는 오행, 같은 음양',
      '상관': '내가 생하는 오행, 다른 음양',
      '편재': '내가 극하는 오행, 같은 음양',
      '정재': '내가 극하는 오행, 다른 음양',
      '편관': '나를 극하는 오행, 같은 음양',
      '정관': '나를 극하는 오행, 다른 음양',
      '편인': '나를 생하는 오행, 같은 음양',
      '정인': '나를 생하는 오행, 다른 음양'
    };

    // 월지 계절 매핑
    this.monthBranches = {
      1: '인', 2: '묘', 3: '진',
      4: '사', 5: '오', 6: '미',
      7: '신', 8: '유', 9: '술',
      10: '해', 11: '자', 12: '축'
    };
  }

  // 간지 계산 (60갑자)
  getGanJi(year) {
    // 기준년도: 1984년 = 갑자년 (60갑자의 시작)
    const baseYear = 1984;
    const diff = year - baseYear;
    const cycle = ((diff % 60) + 60) % 60;

    const stemIndex = cycle % 10;
    const branchIndex = cycle % 12;

    return {
      stem: this.heavenlyStems[stemIndex],
      branch: this.earthlyBranches[branchIndex],
      ganJi: this.heavenlyStems[stemIndex] + this.earthlyBranches[branchIndex]
    };
  }

  // 월주 계산
  getMonthPillar(year, month) {
    // 월간 계산 (년간에 따라 결정)
    const yearStem = this.getGanJi(year).stem;
    const yearStemIndex = this.heavenlyStems.indexOf(yearStem);

    // 월간 기준점 계산
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

  // 일주 계산 (간략화된 버전 - 실제로는 만세력 필요)
  getDayPillar(year, month, day) {
    // 실제 만세력 계산은 매우 복잡하므로 근사치 사용
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

  // 시주 계산
  getHourPillar(year, month, day, hour) {
    const dayPillar = this.getDayPillar(year, month, day);
    const dayStemIndex = this.heavenlyStems.indexOf(dayPillar.stem);

    // 시간을 지지로 변환
    const hourBranchIndex = Math.floor((hour + 1) / 2) % 12;
    const hourBranch = this.earthlyBranches[hourBranchIndex];

    // 시간 천간 계산
    const hourStemBase = (dayStemIndex % 5) * 2;
    const hourStemIndex = (hourStemBase + hourBranchIndex) % 10;
    const hourStem = this.heavenlyStems[hourStemIndex];

    return {
      stem: hourStem,
      branch: hourBranch,
      ganJi: hourStem + hourBranch
    };
  }

  // 사주팔자 계산
  calculateSaju(birthInfo) {
    const { year, month, day, hour, gender } = birthInfo;

    const yearPillar = this.getGanJi(year);
    const monthPillar = this.getMonthPillar(year, month);
    const dayPillar = this.getDayPillar(year, month, day);
    const hourPillar = this.getHourPillar(year, month, day, hour);

    return {
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      hour: hourPillar,
      gender: gender,
      birthInfo: birthInfo
    };
  }

  // 오행 분석
  analyzeElements(saju) {
    const elements = {};
    const pillars = [saju.year, saju.month, saju.day, saju.hour];

    pillars.forEach(pillar => {
      const stemElement = this.elements[pillar.stem];
      const branchElement = this.elements[pillar.branch];

      elements[stemElement] = (elements[stemElement] || 0) + 1;
      elements[branchElement] = (elements[branchElement] || 0) + 1;
    });

    return elements;
  }

  // 오행 상생상극 관계
  getElementRelation(element1, element2) {
    const relations = {
      '목': { generates: '화', controls: '토', controlledBy: '금', generatedBy: '수' },
      '화': { generates: '토', controls: '금', controlledBy: '수', generatedBy: '목' },
      '토': { generates: '금', controls: '수', controlledBy: '목', generatedBy: '화' },
      '금': { generates: '수', controls: '목', controlledBy: '화', generatedBy: '토' },
      '수': { generates: '목', controls: '화', controlledBy: '토', generatedBy: '금' }
    };

    const rel = relations[element1];
    if (rel.generates === element2) return '상생';
    if (rel.controls === element2) return '상극';
    if (rel.controlledBy === element2) return '극당함';
    if (rel.generatedBy === element2) return '생조받음';
    return '동일';
  }

  // 오늘의 운세 계산
  getTodayFortune(saju) {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    const todayPillar = this.getDayPillar(todayYear, todayMonth, todayDay);
    const dayStem = saju.day.stem;
    const todayStem = todayPillar.stem;

    const myElement = this.elements[dayStem];
    const todayElement = this.elements[todayStem];

    const relation = this.getElementRelation(myElement, todayElement);

    return {
      today: todayPillar,
      relation: relation,
      element: todayElement,
      analysis: this.getFortuneSummary(relation, todayElement)
    };
  }

  // 운세 요약
  getFortuneSummary(relation, element) {
    const summaries = {
      '상생': `오늘은 ${element} 기운이 당신을 도와주는 날입니다. 새로운 시도나 중요한 결정을 하기 좋은 날입니다.`,
      '상극': `오늘은 조심스럽게 행동하세요. ${element} 기운과 충돌할 수 있으니 신중함이 필요합니다.`,
      '극당함': `오늘은 에너지 소모가 클 수 있습니다. 무리하지 말고 휴식을 취하는 것이 좋습니다.`,
      '생조받음': `오늘은 도움을 받거나 좋은 기회가 올 수 있는 날입니다. 주변에 감사함을 표현하세요.`,
      '동일': `오늘은 평온한 날입니다. 자신을 돌아보고 계획을 세우기 좋은 날입니다.`
    };

    return summaries[relation] || '평범한 하루가 될 것입니다.';
  }

  // 사주 전체 분석
  getFullAnalysis(birthInfo) {
    const saju = this.calculateSaju(birthInfo);
    const elements = this.analyzeElements(saju);
    const fortune = this.getTodayFortune(saju);

    // 강한 오행과 약한 오행
    const sortedElements = Object.entries(elements).sort((a, b) => b[1] - a[1]);
    const strongElement = sortedElements[0];
    const weakElements = sortedElements.filter(e => e[1] <= 1);

    return {
      saju: saju,
      elements: elements,
      strongElement: strongElement,
      weakElements: weakElements,
      todayFortune: fortune,
      dayMaster: {
        stem: saju.day.stem,
        branch: saju.day.branch,
        element: this.elements[saju.day.stem],
        yinYang: this.yinYang[saju.day.stem]
      }
    };
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SajuCalculator;
}
