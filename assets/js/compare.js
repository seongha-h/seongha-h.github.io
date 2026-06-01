//1, 
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark   = "*** END OF THE PROJECT GUTENBERG EBOOK";

    const startIdx = text.indexOf(startMark);
    const endIdx   = text.indexOf(endMark);

    // 시작 표시 다음 줄부터 끝 표시 직전까지
    return text.slice(startIdx, endIdx);
}
//2. 가져온 본문에서 단어들의 배열을 얻기
function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“”()\[\]_*]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 0);
}


//3. 가져온 배열에서 불용어 지우기
function removeStopwords(words,stopwords){
    return words.filter(w => !stopwords.includes(w));
}

// 4. 단어들의 배열을 {단어:빈도}의 꼴로 만들어주기
function countWords(words){
    const counts={}; 
    for (const word in words){
        counts[words]=(counts[word] || 0)+1    }
    return counts;}

//5. 상위 n개의 배열
function topN(counts,n){
    return Object.entries(counts) //->객체 빈도
    .sort(a,b=>b[1]-a[1])
    .slice(0,n);
}

//종합:text --> 상위 n개의 단어의 배열
function analyze(text,stopwords){
    const body=extractBody(text);
    const words=getWords(body);
    const cleaned=removeStopwords(words,stopwords);
    const counts=countWords(cleaned)
    return topN(counts,30);
}

Promise.all([
    fetch("/data/scarlet.txt").then(r => r.text()),
    fetch("/data/hound.txt").then(r => r.text()),
    fetch("/data/stopwords-en.txt").then(r => r.text()),
]).then(([scarletText, houndText, stopwordsText]) => {
    const stopwords = stopwordsText.split(/\s+/)
        .filter(w => w.length > 0);

    const scarletTop = analyze(scarletText, stopwords);
    const houndTop = analyze(houndText, stopwords);

    drawChart("#chart-scarlet", scarletTop,
        "rgba(220, 53, 69, 0.6)");
    drawChart("#chart-hound", houndTop,
        "rgba(54, 162, 235, 0.6)");
});

function drawChart(selector, top, color){
    const canvas = document.querySelector(selector)
    new Chart (canvas,{
        type: "bar",
        data:{
            labels:top.map(item =>item[0]), //단어
            datasets:[{
                label:'빈도',
                data:top.map(item =>item[1], //빈도
                backgroundColor: color
            }]
        },
    options: {
    indexAxis: "y",                  // 가로 막대
    maintainAspectRatio: false,      // 부모 <div> height에 맞춤, 비울보전 안해서 가로로 긴 그림
    scales: {
        x: { beginAtZero: true },
        y: { ticks: { autoSkip: false } },  // 라벨 30개 전부
    },
},
});
}