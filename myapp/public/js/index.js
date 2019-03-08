//validate check.
function validateForm(){
    let x = document.forms['loginForm']['emailAdd'].value;
    if(!x){
        alert('메일 주소를 선택해 주세요.');
        return false;
    }
};