// [숙제13] 텍스트 분석 도구 구현
// 0000-00000 김인문
// --- 함수 정의들 (21강 코드 재사용) ---
// 1. Project Gutenberg 본문 부분만 추출하기
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark = "*** END OF THE PROJECT GUTENBERG EBOOK";

    const startIdx = text.indexOf(startMark);
    const endIdx = text.indexOf(endMark);

    // 표시가 없으면 원문 전체 사용
    if (startIdx === -1 || endIdx === -1) {
        return text;
    }

    // 시작 표시 다음부터 끝 표시 직전까지
    return text.slice(startIdx + startMark.length, endIdx);
}

// 2. 가져온 본문에서 단어 배열 만들기
function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“”()\[\]_*]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 0);
}

// 3. 단어 배열에서 불용어 제거하기
function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}

// 4. 단어 배열을 {단어: 빈도} 형태의 객체로 만들기
function countWords(words) {
    const counts = {};

    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }

    return counts;
}

// 5. 빈도 상위 n개 단어 뽑기
function topN(counts, n) {
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}

// 종합: text → 상위 30개 단어 배열
function analyze(text, stopwords) {
    const body = extractBody(text);
    const words = getWords(body);
    const cleaned = removeStopwords(words, stopwords);
    const counts = countWords(cleaned);

    return topN(counts, 30);
}

// 텍스트 파일 3개를 동시에 불러오기
Promise.all([
    fetch("/data/frankenstein.txt")).then(r => r.text()),
    fetch("/data/dracula.txt").then(r => r.text()),
    fetch("/data/stopwords-en.txt").then(r => r.text()),
]).then(([scarletText, houndText, stopText]) => {

    const stopwords = stopText
        .split(/\s+/)
        .filter(w => w.length > 0);

    const scarletTop = analyze(scarletText, stopwords);
    const houndTop = analyze(houndText, stopwords);

    drawChart("#chart-frankenstein", frankensteinTop, "rgba(40, 167, 69, 0.6)");
    drawChart("#chart-dracula", draculaTop, "rgba(220, 53, 69, 0.6)");
});

// 그래프 그리기
function drawChart(selector, top, color) {
    const canvas = document.querySelector(selector);

    new Chart(canvas, {
        type: "bar",
        data: {
            labels: top.map(item => item[0]), // 단어
            datasets: [{
                label: "빈도",
                data: top.map(item => item[1]), // 빈도
                backgroundColor: color
            }]
        },
        options: {
            indexAxis: "y",                  // 가로 막대
            maintainAspectRatio: false,      // 부모 div height에 맞춤
            scales: {
                x: { beginAtZero: true },
                y: { ticks: { autoSkip: false } } // 라벨 30개 전부 표시
            }
        }
    });
}