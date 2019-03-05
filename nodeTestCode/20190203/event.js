const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', ()=>{
    console.log('이벤트 1');
})
myEvent.on('event2', ()=>{
    console.log('이벤트 2');
})
myEvent.on('event2', ()=>{
    console.log('이벤트 2 추가');
})

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.once('event3', ()=>{
    console.log('이벤트 3');
})

myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', ()=>{
    console.log('이벤트 4');
})

myEvent.removeAllListeners('event4'); //event4 가 제거됨
console.log('event4 제거');
myEvent.emit('event2');
myEvent.emit('event4');

const lister = () => {
    console.log('이벤트 5');
}

myEvent.on('event5', lister);
myEvent.removeListener('event5', lister);
myEvent.emit('event5');

console.log(myEvent.listenerCount('event2'));