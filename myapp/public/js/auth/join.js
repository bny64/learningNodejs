(function(){
    'use strict'

    let input = document.querySelectorAll('.validate-input.input100');
    document.querySelector('.validate-form').addEventListener('submit', ()=>{
        let check = true;
        [].forEach.call(input, (element)=>{
            
        });
    });

    function validate(input){
        if(input.getAttribute('type')==='email' || input.getAttribute('name')==='email'){
            if(input.value.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }else{
            if(input.value.trim() == ''){
                alert('공백은 입력할 수 없습니다.');
                return;
            }
        }
    }
})();