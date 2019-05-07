(function(){
    'use strict';

    let pageNo = 1;
    let pageSize = 9;

    getBoardList();

    function getBoardList(){
        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append('pageNo', pageNo);
        formData.append('pageSize', pageSize);

        xhr.onload = ()=>{
            makeBoardList(xhr);
        }

        xhr.open('POST','/board/getBoardList');
        xhr.send(formData);
    };
    
    function makeBoardList(xhr){
        if(xhr.status===200){
            if(xhr.status === 200){
                const result = JSON.parse(xhr.responseText).contents;
                result.forEach((curEle)=>{
                    const div = document.createElement('div');
                    div.innerHTML = curEle.contents;
                    curEle.contents = div.innerText; 
                    console.log(curEle);    
                });
    
            }else{
                console.error(xhr.responseText);
            }
        }
    };

})();
