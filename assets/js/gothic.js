
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






// 종합: text → 상위 30개 단어 배열
function analyze(text, stopwords) {
    const body = extractBody(text);
    const words = getWords(body);
    const cleaned = removeStopwords(words, stopwords);
    const counts = countWords(cleaned);

    return topN(counts, 30);
}


Promise.all([
    fetch("/data/frankenstein.txt").then(r => r.text()),
    fetch("/data/dracula.txt").then(r => r.text()),
    fetch("/data/stopwords-en.txt").then(r => r.text()),
    fetch("/data/stopwords-custom.txt").then(r => r.text()),
]).then(([frankensteinText, draculaText, stopText, customStopText]) => {

    const basicStopwords = stopText
        .split(/\s+/)
        .filter(w => w.length > 0);

    const customStopwords = customStopText
        .split(/\s+/)
        .filter(w => w.length > 0);

    const stopwords = basicStopwords.concat(customStopwords);

    const frankensteinTop = analyze(frankensteinText, stopwords);
    const draculaTop = analyze(draculaText, stopwords);

    drawChart("#chart-frankenstein", frankensteinTop, "rgba(40, 167, 69, 0.6)");
    drawChart("#chart-dracula", draculaTop, "rgba(220, 53, 69, 0.6)");
});
