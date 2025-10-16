// 사주 시스템 애플리케이션
document.addEventListener('DOMContentLoaded', function() {
    const calculator = new SajuCalculator();
    const form = document.getElementById('sajuForm');
    const resultsSection = document.getElementById('results');

    // 폼 제출 이벤트
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // 입력값 가져오기
        const birthInfo = {
            year: parseInt(document.getElementById('year').value),
            month: parseInt(document.getElementById('month').value),
            day: parseInt(document.getElementById('day').value),
            hour: parseInt(document.getElementById('hour').value) * 2, // 시간 변환
            gender: document.getElementById('gender').value
        };

        // 유효성 검사
        if (!validateInput(birthInfo)) {
            alert('올바른 생년월일을 입력해주세요.');
            return;
        }

        // 사주 분석
        const analysis = calculator.getFullAnalysis(birthInfo);

        // 결과 표시
        displayResults(analysis);

        // 결과 섹션으로 스크롤
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    });

    // 입력값 유효성 검사
    function validateInput(birthInfo) {
        const { year, month, day } = birthInfo;

        if (year < 1900 || year > 2100) return false;
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;

        // 월별 일수 체크
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) return false;

        return true;
    }

    // 결과 표시
    async function displayResults(analysis) {
        const { saju, elements, strongElement, weakElements, todayFortune, dayMaster } = analysis;

        // 사주팔자 표시
        document.getElementById('yearStem').textContent = saju.year.stem;
        document.getElementById('yearBranch').textContent = saju.year.branch;
        document.getElementById('monthStem').textContent = saju.month.stem;
        document.getElementById('monthBranch').textContent = saju.month.branch;
        document.getElementById('dayStem').textContent = saju.day.stem;
        document.getElementById('dayBranch').textContent = saju.day.branch;
        document.getElementById('hourStem').textContent = saju.hour.stem;
        document.getElementById('hourBranch').textContent = saju.hour.branch;

        // 일간 정보
        document.getElementById('dayMasterStem').textContent = dayMaster.stem;
        document.getElementById('dayMasterElement').textContent = dayMaster.element;
        document.getElementById('dayMasterYinYang').textContent = dayMaster.yinYang;

        // 오행 차트
        displayElementsChart(elements);

        // 강약 오행
        document.getElementById('strongElement').textContent =
            `${strongElement[0]} (${strongElement[1]}개)`;

        const weakElementsText = weakElements.length > 0
            ? weakElements.map(e => `${e[0]} (${e[1]}개)`).join(', ')
            : '없음';
        document.getElementById('weakElements').textContent = weakElementsText;

        // 오늘의 운세
        document.getElementById('todayGanJi').textContent = todayFortune.today.ganJi;
        document.getElementById('todayElement').textContent = todayFortune.element;
        document.getElementById('todayRelation').textContent = todayFortune.relation;
        document.getElementById('fortuneSummary').textContent = todayFortune.analysis;

        // Supabase에 결과 저장 (선택사항)
        if (typeof saveSajuReading === 'function') {
            await saveSajuReading(saju.birthInfo, analysis);
        }
    }

    // 오행 차트 표시
    function displayElementsChart(elements) {
        const chartDiv = document.getElementById('elementsChart');
        chartDiv.innerHTML = '';

        const elementOrder = ['목', '화', '토', '금', '수'];
        const elementColors = {
            '목': 'element-목',
            '화': 'element-화',
            '토': 'element-토',
            '금': 'element-금',
            '수': 'element-수'
        };

        elementOrder.forEach(element => {
            const count = elements[element] || 0;
            const elementDiv = document.createElement('div');
            elementDiv.className = `element-item ${elementColors[element]}`;
            elementDiv.innerHTML = `
                <div class="element-name">${element}</div>
                <div class="element-count">${count}</div>
            `;
            chartDiv.appendChild(elementDiv);
        });
    }

    // 예시 버튼 (테스트용)
    function addExampleButton() {
        const exampleBtn = document.createElement('button');
        exampleBtn.textContent = '예시 데이터로 테스트';
        exampleBtn.className = 'submit-btn';
        exampleBtn.style.marginBottom = '20px';
        exampleBtn.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';

        exampleBtn.addEventListener('click', function() {
            document.getElementById('year').value = 1990;
            document.getElementById('month').value = 5;
            document.getElementById('day').value = 15;
            document.getElementById('hour').value = 6;
            document.getElementById('gender').value = '남';
        });

        form.insertBefore(exampleBtn, form.firstChild);
    }

    // 개발 모드에서만 예시 버튼 표시
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        addExampleButton();
    }
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// 추가 유틸리티 함수들
function getElementEmoji(element) {
    const emojis = {
        '목': '🌳',
        '화': '🔥',
        '토': '⛰️',
        '금': '⚔️',
        '수': '💧'
    };
    return emojis[element] || '';
}

function getElementDescription(element) {
    const descriptions = {
        '목': '목(木)은 성장과 발전을 상징합니다.',
        '화': '화(火)는 열정과 창조를 상징합니다.',
        '토': '토(土)는 안정과 신뢰를 상징합니다.',
        '금': '금(金)은 강인함과 정의를 상징합니다.',
        '수': '수(水)는 지혜와 융통성을 상징합니다.'
    };
    return descriptions[element] || '';
}

// 콘솔에 정보 출력 (디버깅용)
console.log('사주팔자 운세 시스템이 로드되었습니다.');
console.log('Version: 1.0.0');
console.log('Author: Claude Code');
