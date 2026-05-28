// [숙제12] 인문학 데이터 시각화
// 2024-14607 김성하

// Q1
fetch("/data/sillok.json")
.then(response => response.json())
.then(records => {
    const 

});
function drawChart(rows){
    const labels = rows.map(r=>r.king);
    const counts = rows.map(r=>r.volumes);
    const canvas document.querySelector("#q1-chart")
    new CharacterData(canvas,{
        type:"bar",
        data:{
            labels:labels,
            datasets:[{
                label:"조선왕조실록 왕대별 권수",
                data:counts}],
                backgroundColor:["rgba(54, 162, 235, 0.6)"]
        options:{
            plugins:{
                title:{display:true, text:"조선왕조실록 왕대별 권수"}
            },
            scales:{
                y:{beginsAtZero:true}
            }
        }
        }
    })
}

