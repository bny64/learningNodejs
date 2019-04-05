//event

const dataArea = document.querySelectorAll('.dataArea');
const dataPeriod = document.querySelectorAll('.dataPeriod');
let g_chart = null;

document.querySelector('#period').addEventListener('click', (e)=>{
    [].forEach.call(dataArea, (element)=>{
        element.style.display = 'none'
    });

    [].forEach.call(dataPeriod, (element)=>{
        element.style.display = ''
    });
});

document.querySelector('#count').addEventListener('click', (e)=>{
    [].forEach.call(dataPeriod, (element)=>{
        element.style.display = 'none'
    });

    [].forEach.call(dataArea, (element)=>{
        element.style.display = ''
    });
});

//makechart 클릭 이벤트
document.querySelector("#makeChart").addEventListener('click', ()=>{
    const stDate = moment(document.querySelector('#date-start').value,'YYYYMMDD');
    const edDate = moment(document.querySelector('#date-end').value, 'YYYYMMDD');
    const chart_dataType = document.querySelector('[name=dataType]:checked').id;

    if(Number(edDate) <= Number(stDate)){
        alert('시작날짜는 종료날짜보다 이전일 수 없습니다.');
        return;
    }else{
        const chart_type = document.querySelector('span').textContent;        
        let range1 = null;
        let range2 = null;
        if(chart_dataType==='count'){            
            range1 = document.querySelector('#minCount').value;
            range2 = document.querySelector('#maxCount').value;            
        }else if(chart_dataType==='period'){
            range1 = document.querySelector('#date-start').value;
            range2 = document.querySelector('#end-start').value;
            
        }
        if(!(range1 && range2)){
            if(chart_dataType==='count') alert("최소갯수와 최대갯수를 입력하세요.");
            else alert("시작날짜와 종료날짜를 입력하세요.");
            return;
        }
        g_chart = null;
        makeChart(chart_type, chart_dataType, range1, range2);
    }    
});

function makeChart(type, dataType, start, end){
    const chartData = []; 

    if(dataType==='count'){
        const dataNumber = Math.floor(Math.random()*(end - start + 1))+Number(start);
        let i = 1;
        for(i;i<dataNumber; i++){
            chartData.push([i, Math.random()*99]);        }
    }else if(dataType==='period'){
        const day = 1000*60*60*24;
        const startDate = Number(moment(start, 'YYYY/MM/DD'));
        const endDate = Number(moment(end, 'YYYY/MM/DD'));
        let i = startDate;
        for(i; i<=endDate; i += day){
            chartData.push([i, Math.random()*99]);
        }
    }

    const chartObject = {
        chart : {
            renderTo : document.querySelector('#chart'),
            type:'line',
            height:'360',
            width:'1152'
        },
        title : {
            text : ''
        },
        legend:{
            enabled: false
        },
        tooltip : {
            enabled : false
        },
        credits:{
            enabled : false   
        },
        yAxis:{
            title : {
                text : ''
            }
        },
        series : [{
            data : chartData,
        }]
    }

    g_chart = new Highcharts.chart(chartObject);

}