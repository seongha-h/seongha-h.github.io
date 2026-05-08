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
    console.log(`${text}에서 ${target}은 ${count}번 등장합니다`)
}
countChar("박씨는 이씨에게 시집간 김씨의 외사촌 동생이다.", "씨")
countChar("이상의 「날개」는 1936년 작품이다.", "이")
countChar("banana", "a")
