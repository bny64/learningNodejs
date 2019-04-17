(function(){
    'use strict'

    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시한다.
        changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시한다.
        yearRange: '-100:+0', //달력 기간 설정
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

    $("#datePicker").datepicker();

    let input = document.querySelectorAll('.input100');
    let submitForm = document.querySelector('.login100-form-btn');

    submitForm.addEventListener('click', (e)=>{
        
        let submitFlag = false;
        e.preventDefault();

        //[].forEach.call(input, (element)=>{}); 아래와 같음.
        input.forEach((e)=>{
            const targetNode = e.parentNode;
            if(targetNode.classList){
                targetNode.classList.remove('alert-validate');
            }else{
                targetNode.className = targetNode.className.replace(new RegExp('(^|\\b)' + 'alert-validate'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        });

        [].every.call(input, (element)=>{
            if(!validate(element)){
                showValidate(element);
                submitFlag = false;
                return false;
            }else{
                submitFlag = true;
                return true; 
            }
        });
        
        if(submitFlag){            
            document.getElementsByClassName('login100-form')[0].submit();
        }else alert('nope');
    });

    input.forEach((e)=>{
        e.addEventListener('focus', (e)=>{
            const targetNode = e.target.parentNode;
            if(targetNode.classList){
                targetNode.classList.remove('alert-validate');
            }else{
                targetNode.className = targetNode.className.replace(new RegExp('(^|\\b)' + 'alert-validate'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        });
    });

    function validate(input){
        if(input.getAttribute('type')==='email' || input.getAttribute('name')==='email'){
            if(input.value.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }else{
                return true;
            }
        }else if(input.getAttribute('name')==='phoneNumber'){
            if(input.value.trim().match(/^\d{3}-\d{3,4}-\d{4}$/) === null){
                return false;
            }else{
                return true;
            }
        }else if(input.getAttribute('name')==='birthday'){
            if(input.value.trim().match(/^\d{4}-\d{2}-\d{2}$/) === null){
                return false;
            }else{
                return true;
            }
        }else{
            if(input.value.trim() == ''){
                return false;
            }else{
                return true;
            }
        }
    }

    function showValidate(input) {
        let thisAlert = input.parentNode;
        if(thisAlert.classList){    
            thisAlert.classList.add('alert-validate');
        }else{
            thisAlert.className += ' ' + 'alert-validate';
        }
    }

    function hideValidate(input) {
        let thisAlert = input.parentNode;

        if (thisAlert.classList){
            thisAlert.classList.remove('alert-validate');
        }else{
            thisAlert.className = thisAlert.className.replace(new RegExp('(^|\\b)' + 'alert-validate'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    let showPass = 0;

    let btnShowPass = document.querySelector('.btn-show-pass');
    btnShowPass.addEventListener('click', ()=>{
        let nextIpt = btnShowPass.nextElementSibling;
        let findI = btnShowPass.querySelector('i');
        if(showPass===0){            
            nextIpt.setAttribute('type', 'text');
            if(findI.classList){ //IE 10이상
                findI.classList.remove('fa-eye');
                findI.classList.add('fa-eye-slash');
            }else{
                findI.className = findI.className.replace(new RegExp('(^|\\b)' + 'fa-eye'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                findI.className += ' ' + 'fa-eye-slash';
            }
            showPass = 1;
        }else{
            nextIpt.setAttribute('type', 'password');
            if(findI.classList){
                findI.classList.remove('fa-eye-slash');
                findI.classList.add('fa-eye');
            }else{
                findI.className = findI.className.replace(new RegExp('(^|\\b)' + 'fa-eye-slash'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                findI.className += ' ' + 'fa-eye';
            }
            showPass = 0;
        }
    });

    document.querySelector('#loginBtn').addEventListener('click',()=>{
        location.href = "http://49.247.211.93:9001/login";
    });

})();