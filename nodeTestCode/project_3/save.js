var globalValue;

exports.setGlobal = (val)=>{
    globalValue = val;
};

exports.returnGlobal = () => {
    console.log(global);
    return globalValue;
};