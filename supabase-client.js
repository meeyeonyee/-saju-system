// Supabase 클라이언트 초기화
// 환경 변수는 Vercel에서 자동으로 주입됩니다
const SUPABASE_URL = window.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = window.SUPABASE_ANON_KEY || '';

let supabaseClient = null;

// Supabase 클라이언트 초기화
if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase 클라이언트 초기화 완료');
} else {
    console.log('⚠️ Supabase 환경 변수가 설정되지 않았습니다. 데이터 저장 기능이 비활성화됩니다.');
}

// 사주 분석 결과 저장
async function saveSajuReading(birthInfo, analysis) {
    if (!supabaseClient) {
        console.log('Supabase가 설정되지 않아 저장을 건너뜁니다.');
        return null;
    }

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

        console.log('✅ 사주 분석 결과가 저장되었습니다:', data);
        return data[0];
    } catch (error) {
        console.error('❌ 저장 중 오류:', error.message);
        return null;
    }
}

// 최근 사주 분석 결과 조회
async function getRecentReadings(limit = 10) {
    if (!supabaseClient) return [];

    try {
        const { data, error } = await supabaseClient
            .from('saju_readings')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);

        if (error) throw error;

        return data;
    } catch (error) {
        console.error('조회 중 오류:', error.message);
        return [];
    }
}

// 오행 통계 조회
async function getElementsStatistics() {
    if (!supabaseClient) return null;

    try {
        const { data, error } = await supabaseClient
            .from('saju_readings')
            .select('strong_element');

        if (error) throw error;

        // 오행별 개수 계산
        const stats = {};
        data.forEach(item => {
            const element = item.strong_element;
            if (element) {
                stats[element] = (stats[element] || 0) + 1;
            }
        });

        return stats;
    } catch (error) {
        console.error('통계 조회 중 오류:', error.message);
        return null;
    }
}

console.log('📊 Supabase 클라이언트 모듈 로드 완료');
