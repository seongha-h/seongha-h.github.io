// [숙제10] JavaScript 기초 연습
// 0000-00000 김인문
// Q1
function classifyEra(year) {
    if (year < 1910) {
        return "개화기 이전";
    } else if (year >= 1910 && year < 1945) {
        return "일제강점기";
    } else if (year >= 1945 && year < 1990) {
        return "해방 이후-현대";
    } else {
        return "동시대";
    }
}

console.log(`1908년: ${classifyEra(1908)}`);
console.log(`1936년: ${classifyEra(1936)}`);
console.log(`1972년: ${classifyEra(1972)}`);
console.log(`2025년: ${classifyEra(2025)}`);

// Q2
const works = ["날개", "오감도", "지주회시", "종생기", "권태"];
console.log(works.length);
console.log(works[0]);
console.log(works[works.length - 1]);
const title = works.map(work => `「${work}」`);
console.log(title)
const bigTitles = works.filter(work=>work.length >= 3);
console.log(bigTitles)
for (let i =0;i<works.length;i++){
    console.log(`${i+1}번째 작품: ${works[i]}`)
}

//Q3
function countChar(text, target){
    let count = 0
    for (const ch of text){
        if (ch === target){
            count++;
        }}
    return count
}
console.log(`"박씨는 이씨에게 시집간 김씨의 외사촌 동생이다."에서 '씨'는 ${countChar("박씨는 이씨에게 시집간 김씨의 외사촌 동생이다.", "씨")}번 등장합니다.`);
console.log(`"이상의 「날개」는 1936년 작품이다."에서 '이'는 ${countChar("이상의 「날개」는 1936년 작품이다.", "이")}번 등장합니다.`);
console.log(`"banana"에서 'a'는 ${countChar("banana", "a")}번 등장합니다.`);

//Q4
const text = "이상의 「날개」는 1936년에 발표된 단편소설이다.";
const targets = ["이", "의", "날", "개", "소"];
const counts = targets.map(t => countChar(text,t));
console.log(counts)
for (let i=0;i<targets.length;i++){
    console.log(`'${targets[i]}': ${counts[i]}번`);
}
const freq = targets.filter(t => countChar(text, t) >= 2);
console.log(freq);
let maxIdx = 0
for (let i=0;i<targets.length;i++){
    if (counts[i]>counts[maxIdx])
        maxIdx = i
}
console.log(`가장 자주 나온 글자: '${targets[maxIdx]}' (${counts[maxIdx]}번)`);
