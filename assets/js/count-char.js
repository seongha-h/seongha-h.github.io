// assets/js/count-char.js
const text = "이상의 날개는 1939년에 발표된 단편소설이다";
const target = "이";

let count = 0;
for (const ch of text) {
    if (ch === target) {
        count++;
    }
}

console.log(`"${text}"`);
console.log(`'${target}' 글자는 ${count}에 등장합니다.`);

let hangul =0;
let total=0;
for (const ch of text){
    if (ch !== " "){
        total++;
        if (ch>="가" && ch<= "힣")
            hangul++;
    }
}

const ratio = (hangul/total)*100;
console.log(`한글글자비율: (${ratio.toFixed(1)}`);