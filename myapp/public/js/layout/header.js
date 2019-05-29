(function(){
    'use strict';

    const logoutBtn = document.querySelector('#logoutBtn');
    
    if(logoutBtn){
        logoutBtn.addEventListener('click', ()=>{
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if(xhr.status === 200){
                    window.location.href = "http://49.247.211.93:9001";
                }
            };
            xhr.open('POST','/auth/logout');
            xhr.send(null);
        });
    }
})();
