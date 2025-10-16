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

    // 일주 60갑자 해석
    this.dayPillarInterpretations = {
      '갑자': { title: '갑자일주 - 혁신적인 리더', description: '창의적이고 독립적입니다. 새로운 것을 시작하는 능력이 뛰어나며 리더십이 강합니다. 지혜롭고 적응력이 좋아 다양한 환경에서 성공할 수 있습니다.', strength: '창의력, 리더십, 지혜', weakness: '고집, 완벽주의' },
      '을축': { title: '을축일주 - 온화한 실무자', description: '성실하고 꾸준하며 신뢰할 수 있는 성격입니다. 실용적이고 인내심이 강해 어려운 일도 끝까지 해냅니다. 타인을 배려하는 따뜻한 마음을 가졌습니다.', strength: '성실함, 인내심, 신뢰성', weakness: '우유부단함, 변화 거부' },
      '병인': { title: '병인일주 - 열정적인 도전자', description: '열정적이고 활동적이며 모험심이 강합니다. 긍정적인 에너지로 주변을 밝게 만들고, 새로운 도전을 즐깁니다. 사교성이 뛰어나 인맥이 넓습니다.', strength: '열정, 사교성, 추진력', weakness: '성급함, 집중력 부족' },
      '정묘': { title: '정묘일주 - 섬세한 예술가', description: '섬세하고 예술적 감각이 뛰어납니다. 디테일에 강하고 미적 감각이 우수합니다. 차분하고 신중한 성격으로 실수가 적습니다.', strength: '섬세함, 예술성, 신중함', weakness: '소심함, 결정력 부족' },
      '무진': { title: '무진일주 - 안정적인 관리자', description: '포용력이 크고 책임감이 강합니다. 관리 능력이 뛰어나며 조직을 안정적으로 이끌어갑니다. 신뢰를 중시하고 약속을 잘 지킵니다.', strength: '포용력, 책임감, 관리능력', weakness: '고집, 융통성 부족' },
      '기사': { title: '기사일주 - 지혜로운 계획가', description: '지적이고 계획적입니다. 분석력이 뛰어나며 전략적 사고에 능합니다. 차분하고 신중하게 일을 처리하여 실패가 적습니다.', strength: '지혜, 분석력, 계획성', weakness: '우유부단함, 과도한 신중함' },
      '경오': { title: '경오일주 - 강인한 전사', description: '강인하고 결단력이 있습니다. 목표 지향적이며 추진력이 강해 원하는 것을 이루어냅니다. 정의감이 강하고 원칙을 중시합니다.', strength: '결단력, 추진력, 정의감', weakness: '강압적, 융통성 부족' },
      '신미': { title: '신미일주 - 섬세한 완벽주의자', description: '섬세하고 완벽주의 성향이 있습니다. 품질과 디테일을 중시하며 높은 수준의 작업물을 만들어냅니다. 예의 바르고 품위가 있습니다.', strength: '섬세함, 완벽주의, 품위', weakness: '까다로움, 스트레스' },
      '임신': { title: '임신일주 - 유연한 전략가', description: '유연하고 적응력이 뛰어납니다. 변화에 빠르게 대응하며 다양한 상황을 잘 헤쳐나갑니다. 통찰력이 있어 본질을 꿰뚫어봅니다.', strength: '유연성, 적응력, 통찰력', weakness: '우유부단함, 일관성 부족' },
      '계유': { title: '계유일주 - 지혜로운 조언자', description: '지혜롭고 통찰력이 뛰어납니다. 조언을 잘하고 타인을 이해하는 능력이 있습니다. 학문적 재능이 있으며 깊이 있는 사고를 합니다.', strength: '지혜, 통찰력, 이해심', weakness: '소심함, 자신감 부족' },
      // 나머지 50개 일주는 일반적인 해석으로 처리
      'default': { title: '일주 분석', description: '당신의 일주는 고유한 특성을 가지고 있습니다.', strength: '강점 분석 중', weakness: '약점 분석 중' }
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

  // 음양 분석
  analyzeYinYang(saju) {
    const pillars = [saju.year, saju.month, saju.day, saju.hour];
    let yangCount = 0;
    let yinCount = 0;

    pillars.forEach(pillar => {
      if (this.yinYang[pillar.stem] === '양') yangCount++;
      else yinCount++;
      if (this.yinYang[pillar.branch] === '양') yangCount++;
      else yinCount++;
    });

    const balance = yangCount > yinCount ? '양' : yinCount > yangCount ? '음' : '균형';
    const interpretation = this.getYinYangInterpretation(balance, yangCount, yinCount);

    return {
      yangCount,
      yinCount,
      balance,
      interpretation
    };
  }

  // 음양 해석
  getYinYangInterpretation(balance, yangCount, yinCount) {
    if (balance === '균형') {
      return '음양의 균형이 잘 잡혀 있어 조화로운 성격을 가지고 있습니다. 상황에 따라 유연하게 대처하는 능력이 뛰어납니다.';
    } else if (balance === '양') {
      return `양의 기운이 강합니다 (양: ${yangCount}, 음: ${yinCount}). 외향적이고 활동적이며 적극적인 성향이 있습니다. 리더십이 있지만 때로는 조급할 수 있으니 침착함이 필요합니다.`;
    } else {
      return `음의 기운이 강합니다 (양: ${yangCount}, 음: ${yinCount}). 내향적이고 사려 깊으며 신중한 성향이 있습니다. 통찰력이 뛰어나지만 때로는 적극성이 필요할 수 있습니다.`;
    }
  }

  // 십성 분석
  analyzeTenGods(saju) {
    const dayStem = saju.day.stem;
    const dayElement = this.elements[dayStem];
    const dayYinYang = this.yinYang[dayStem];
    const tenGodsAnalysis = [];

    // 각 기둥의 천간과 지지 분석
    const pillars = [
      { name: '년간', stem: saju.year.stem },
      { name: '월간', stem: saju.month.stem },
      { name: '시간', stem: saju.hour.stem }
    ];

    pillars.forEach(pillar => {
      const targetElement = this.elements[pillar.stem];
      const targetYinYang = this.yinYang[pillar.stem];
      const tenGod = this.getTenGod(dayElement, dayYinYang, targetElement, targetYinYang);

      tenGodsAnalysis.push({
        position: pillar.name,
        stem: pillar.stem,
        tenGod: tenGod,
        interpretation: this.getTenGodInterpretation(tenGod)
      });
    });

    return tenGodsAnalysis;
  }

  // 십성 결정
  getTenGod(myElement, myYinYang, targetElement, targetYinYang) {
    const relation = this.getElementRelation(myElement, targetElement);
    const sameYinYang = myYinYang === targetYinYang;

    if (myElement === targetElement) {
      return sameYinYang ? '비견(比肩)' : '겁재(劫財)';
    } else if (relation === '상생') {
      // 내가 생하는 경우
      return sameYinYang ? '식신(食神)' : '상관(傷官)';
    } else if (relation === '상극') {
      // 내가 극하는 경우
      return sameYinYang ? '편재(偏財)' : '정재(正財)';
    } else if (relation === '극당함') {
      // 나를 극하는 경우
      return sameYinYang ? '편관(偏官)' : '정관(正官)';
    } else if (relation === '생조받음') {
      // 나를 생하는 경우
      return sameYinYang ? '편인(偏印)' : '정인(正印)';
    }
    return '미상';
  }

  // 십성 해석
  getTenGodInterpretation(tenGod) {
    const interpretations = {
      '비견(比肩)': '독립심과 자존심이 강합니다. 형제, 친구, 동료와의 관계가 중요합니다.',
      '겁재(劫財)': '경쟁심이 강하고 승부욕이 있습니다. 재물 관리에 신경 써야 합니다.',
      '식신(食神)': '창의적이고 낙천적입니다. 예술적 재능이나 표현력이 뛰어납니다.',
      '상관(傷官)': '비판적이고 개혁적입니다. 기술이나 전문 분야에 재능이 있습니다.',
      '편재(偏財)': '사교적이고 돈 벌 기회가 많습니다. 재물의 유동이 큽니다.',
      '정재(正財)': '성실하고 근면합니다. 안정적인 재물 운이 있습니다.',
      '편관(偏官)': '강인하고 결단력이 있습니다. 리더십과 추진력이 뛰어납니다.',
      '정관(正官)': '책임감이 강하고 윤리적입니다. 사회적 지위가 중요합니다.',
      '편인(偏印)': '직관력이 뛰어나고 학구적입니다. 독특한 사고방식을 가집니다.',
      '정인(正印)': '학습 능력이 뛰어나고 교양이 있습니다. 어른의 도움을 받습니다.'
    };
    return interpretations[tenGod] || '';
  }

  // 용신 분석 (간단 버전)
  analyzeUsefulGod(elements, yinYangBalance) {
    const sortedElements = Object.entries(elements).sort((a, b) => b[1] - a[1]);
    const strongest = sortedElements[0][0];
    const weakest = sortedElements.filter(e => e[1] <= 1).map(e => e[0]);

    // 가장 강한 오행을 제어하거나 가장 약한 오행을 보충하는 것이 용신
    const relations = {
      '목': { controls: '토', controlledBy: '금' },
      '화': { controls: '금', controlledBy: '수' },
      '토': { controls: '수', controlledBy: '목' },
      '금': { controls: '목', controlledBy: '화' },
      '수': { controls: '화', controlledBy: '토' }
    };

    const usefulGod = relations[strongest].controlledBy;
    const interpretation = `사주에서 ${strongest} 기운이 가장 강하므로, ${usefulGod} 기운이 용신이 됩니다. ${usefulGod}의 속성을 가진 색깔, 방향, 직업 등이 도움이 됩니다.`;

    return {
      usefulGod,
      interpretation,
      recommendations: this.getUsefulGodRecommendations(usefulGod)
    };
  }

  // 용신 추천사항
  getUsefulGodRecommendations(element) {
    const recommendations = {
      '목': {
        colors: ['초록색', '청록색', '연두색'],
        directions: ['동쪽'],
        numbers: [3, 8],
        careers: ['교육', '출판', '임업', '섬유', '종이']
      },
      '화': {
        colors: ['빨간색', '주황색', '보라색'],
        directions: ['남쪽'],
        numbers: [2, 7],
        careers: ['연예', '요식업', '에너지', '전기', '화학']
      },
      '토': {
        colors: ['노란색', '갈색', '베이지'],
        directions: ['중앙', '서남', '동북'],
        numbers: [5, 10],
        careers: ['부동산', '건축', '농업', '도자기', '광업']
      },
      '금': {
        colors: ['흰색', '금색', '은색'],
        directions: ['서쪽'],
        numbers: [4, 9],
        careers: ['금융', '기계', '자동차', '금속', '보석']
      },
      '수': {
        colors: ['검은색', '파란색', '남색'],
        directions: ['북쪽'],
        numbers: [1, 6],
        careers: ['유통', '운송', '수산', '관광', '컨설팅']
      }
    };
    return recommendations[element] || {};
  }

  // 상세 성격 분석
  analyzePersonality(dayMaster, tenGods, yinYangBalance) {
    const element = dayMaster.element;
    const yinYang = dayMaster.yinYang;

    const basePersonality = this.getElementPersonality(element);
    const yinYangModifier = yinYang === '양' ? '적극적이고 외향적인' : '차분하고 내성적인';

    return {
      base: basePersonality,
      modifier: yinYangModifier,
      summary: `${yinYangModifier} ${element} 기질을 가지고 있습니다. ${basePersonality}`
    };
  }

  // 일주 분석
  analyzeDayPillar(dayPillar) {
    const ganJi = dayPillar.ganJi;
    const interpretation = this.dayPillarInterpretations[ganJi] || this.dayPillarInterpretations['default'];

    return {
      ganJi: ganJi,
      title: interpretation.title,
      description: interpretation.description,
      strength: interpretation.strength,
      weakness: interpretation.weakness,
      recommendation: this.getDayPillarRecommendation(ganJi)
    };
  }

  // 일주별 추천사항
  getDayPillarRecommendation(ganJi) {
    const recommendations = {
      '갑자': '새로운 분야에 도전하고 리더십을 발휘할 기회를 찾으세요. 창의적인 아이디어를 실현할 수 있는 환경이 좋습니다.',
      '을축': '꾸준함을 무기로 장기적인 목표를 설정하세요. 신뢰를 바탕으로 한 인간관계를 중시하세요.',
      '병인': '열정을 쏟을 수 있는 일을 찾으세요. 사람들과의 교류를 통해 에너지를 얻으세요.',
      '정묘': '세심함을 요구하는 일에 적합합니다. 예술이나 디자인 분야에서 재능을 발휘할 수 있습니다.',
      '무진': '관리나 조직 운영에 재능이 있습니다. 안정적인 환경에서 장기적으로 성장하세요.',
      '기사': '계획과 전략이 필요한 일에 강점이 있습니다. 분석적 사고를 활용하세요.',
      '경오': '목표를 명확히 하고 추진력을 발휘하세요. 정의로운 일에 앞장서세요.',
      '신미': '품질과 완성도를 중시하는 일이 적합합니다. 스트레스 관리에 신경 쓰세요.',
      '임신': '변화하는 환경에 강합니다. 유연성을 살려 다양한 기회를 잡으세요.',
      '계유': '조언자나 교육자로서의 역할이 잘 맞습니다. 지혜를 나누는 일을 하세요.'
    };

    return recommendations[ganJi] || '당신의 고유한 강점을 발견하고 발전시키세요.';
  }

  // 오행별 성격
  getElementPersonality(element) {
    const personalities = {
      '목': '성장과 발전을 추구하며 인자하고 부드러운 성품을 가지고 있습니다. 창의적이고 융통성이 있으나 때로는 우유부단할 수 있습니다.',
      '화': '열정적이고 밝으며 사교성이 뛰어납니다. 예의 바르고 문화적 소양이 있으나 감정 기복이 있을 수 있습니다.',
      '토': '안정적이고 신뢰할 수 있으며 포용력이 있습니다. 성실하고 근면하나 변화에 소극적일 수 있습니다.',
      '금': '정의롭고 결단력이 있으며 원칙적입니다. 강인하고 책임감이 강하나 융통성이 부족할 수 있습니다.',
      '수': '지혜롭고 유연하며 적응력이 뛰어납니다. 통찰력이 있고 학습 능력이 우수하나 우유부단할 수 있습니다.'
    };
    return personalities[element] || '';
  }

  // 사주 전체 분석 (확장)
  getFullAnalysis(birthInfo) {
    const saju = this.calculateSaju(birthInfo);
    const elements = this.analyzeElements(saju);
    const fortune = this.getTodayFortune(saju);
    const yinYangAnalysis = this.analyzeYinYang(saju);
    const tenGodsAnalysis = this.analyzeTenGods(saju);

    // 강한 오행과 약한 오행
    const sortedElements = Object.entries(elements).sort((a, b) => b[1] - a[1]);
    const strongElement = sortedElements[0];
    const weakElements = sortedElements.filter(e => e[1] <= 1);

    const dayMaster = {
      stem: saju.day.stem,
      branch: saju.day.branch,
      element: this.elements[saju.day.stem],
      yinYang: this.yinYang[saju.day.stem]
    };

    const usefulGod = this.analyzeUsefulGod(elements, yinYangAnalysis);
    const personality = this.analyzePersonality(dayMaster, tenGodsAnalysis, yinYangAnalysis);
    const dayPillarAnalysis = this.analyzeDayPillar(saju.day);

    return {
      saju: saju,
      elements: elements,
      strongElement: strongElement,
      weakElements: weakElements,
      todayFortune: fortune,
      dayMaster: dayMaster,
      yinYangAnalysis: yinYangAnalysis,
      tenGodsAnalysis: tenGodsAnalysis,
      usefulGod: usefulGod,
      personality: personality,
      dayPillarAnalysis: dayPillarAnalysis
    };
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SajuCalculator;
}
