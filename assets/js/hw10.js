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