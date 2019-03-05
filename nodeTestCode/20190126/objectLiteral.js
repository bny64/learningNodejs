const colors = require('colors');

var relationship1 = {
    name : 'zero',
    friend : ['nero','hero','xero'],
    logFriends:function(){
        var that = this;
        this.friend.forEach(function(friend){
            console.log(this.name, friend)
        })
    }
}

relationship1.logFriends();

const relationship2 = {
    name : 'zero',
    friend:['nero','hero','exro'],
    logFriends(){
        this.friend.forEach(friend=>{
            console.log(this.name, friend);
        })
    }
}

relationship2.logFriends();

const obj = {
    name : "nam",
    firstFunc(){
        console.log(this.name);
    }
}

function secFunc(){
    this.name = "nam";
    console.log(this.name);
}

obj.firstFunc();
secFunc();