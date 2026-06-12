function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“”()\[\]_*]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 0);
}

function countWords(words) {
    const counts = {};

    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }

    return counts;
}

function topN(counts, n) {
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}

function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}

function drawChart(selector, top, color) {
    const canvas = document.querySelector(selector);

    return new Chart(canvas, {
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