const colors = require('colors');

//1. callback 함수만 사용

function one1(callback1, callback2){
    const obj = {name:'john'};
    setTimeout(() => {
        callback1(obj, callback2);    
    }, 500);    
}

function two1(obj, callback){
    obj.age = 20;
    setTimeout(() => {
        callback(obj);    
    }, 500);
    
}

function three1(obj){
    obj.address = "seoul";
    return setTimeout(() => {
        console.log('callback : '.rainbow);   
        console.log(obj);
        return obj;
    }, 500);
}

one1(two1, three1);

//2. promise 사용

function one2(){
    const obj = {name:'Smith'};
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(obj);    
        }, 500);
    });        
}

function two2(obj){
    obj.age = 22;
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(obj);    
        }, 500);
    });     
}

function three2(obj){
    obj.address = "LA";
    return setTimeout(() => {
        console.log('promise : '.zebra);
        console.log(obj);
        return obj;
    }, 500);    
}

one2().then(two2).then(three2);

//3. async, await 사용
//1번째 방법
function one3(){
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve('Jerry');    
        }, 500);
    });        
}

function two3(){
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(33);    
        }, 500);
    });     
}

function three3(){
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve('Tokyo');    
        }, 500);
    });    
}
//2번째 방법
function one3_(obj){
    obj.name = 'Tom';
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(obj);    
        }, 500);
    });        
}

function two3_(obj){
    obj.age = 44;
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(obj);    
        }, 500);
    });     
}

function three3_(obj){
    obj.address = 'beijing';
    return new Promise(resolve=>{
        setTimeout(() => {
            resolve(obj);    
        }, 500);
    });    
}

(async ()=>{
    const obj = {};
    obj.name = await one3();
    obj.age = await two3();
    obj.address = await three3();
    const obj2 = await one3_({}).then(two3_).then(three3_);
    console.log('async, await : '.red);
    console.log(obj);
    console.log(obj2);
})();