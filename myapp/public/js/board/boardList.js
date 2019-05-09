(function(){
    'use strict';

    let pageNo = 1;
    let pageSize = 9;
    let eleCount = 0;    

    document.querySelector('#moreBtn').addEventListener('click', ()=>{        
        getBoardList();
    });

    getBoardList();

    function getBoardList(){
        const sendData = {};
        const xhr = new XMLHttpRequest();
        //혹은 ie10이상
        /* 
        const formData = new FormData();
        formData.append(pageNo, pageNo);
        formData.append(pageSize, pageSize);
        xhr.send(formData);

        */
        sendData.pageNo = pageNo;
        sendData.pageSize = pageSize;

        xhr.onload = ()=>{
            makeBoardList(xhr);
        }

        xhr.open('POST','/board/getBoardList');
        xhr.setRequestHeader('Content-type', "application/json");
        xhr.send(JSON.stringify(sendData));
    };
    
    function makeBoardList(xhr){        

        if(xhr.status === 200){
            
            const result = JSON.parse(xhr.responseText).contents;
            let html = '';
            let i = 0;
            for(; i<result.length; i++){
                if(i%3==0) html += '<div class="row">';
                
                const div = document.createElement('div');
                div.innerHTML = result[i].contents;
                result[i].contents = div.innerText;

                html += '<div class="col-md-4 col-sm-6 fh5co-tours animate-box fadeInUp animated" data-animate-effect="fadeIn">';
                html += '<div href="#"><img class="img-responsive" src="/images/place-3.jpg" alt="Free HTML5 Website Template by FreeHTML5.co">';
                html += '<div class="desc" style="height:270px;">';
                html += '<span></span>';
                let splitTit = result[i].title.length > 8 ? result[i].title.substring(0, 8)+'...' : result[i].title;
                html += '<h3 class="mb20">' + splitTit + '</h3>';
                html += '<span class="mb20">' + result[i].name + '</span>';
                let splitCon = result[i].contents.length > 20 ? result[i].contents.substring(0, 20) + '...' : result[i].contents;
                html += '<span class="price mb20">' + splitCon + '</span>';
                html += '<a class="btn btn-primary btn-outline" href="#">상세 보기<i class="icon-arrow-right22"></i></a>';
                html += '</div></div></div>';

                if(i%3==2) html += '</div>';
            }
            pageNo++;
            document.querySelector('.lastRow').insertAdjacentHTML('beforebegin', html);

        }else{
            console.error(xhr.responseText);
        }
        
    };

})();
