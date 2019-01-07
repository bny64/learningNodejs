var globalValue;

exports.setGlobal = (moduleVaue)=>{
    globalValue = moduleVaue;
};

exports.returnGlobal = () => {
    console.log(global);
    return globalValue;
}; 