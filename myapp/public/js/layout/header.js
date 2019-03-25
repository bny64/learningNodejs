(function(){
    'use strict';

    const logoutBtn = document.querySelector('#logoutBtn');
    
    if(logoutBtn){
        logoutBtn.addEventListener('click', ()=>{
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if(xhr.status === 200){
                    window.location.reload();                    
                }
            };
            xhr.open('POST','/auth/logout');
            xhr.send(null);
        });
    }
})();
