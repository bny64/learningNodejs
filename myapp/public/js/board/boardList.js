(function(){
    'use strict';

    let pageNo = 1;
    let pageSize = 9;
    let eleCount = 0;    

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

        if(xhr.status === 200){
            
            const result = JSON.parse(xhr.responseText).contents;
            let html = '';
            let i = 0;
            for(; i<result.length; i++){
                if(i%3==0) html += '<div class="row">';
                
                const div = document.createElement('div');
                div.innerHTML = result[i].contents;
                result[i].contents = div.innerText;

                html += '<div class="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn">';
                html += '<div href="#"><img src="/images/place-3.jpg" alt="Free HTML5 Website Template by FreeHTML5.co" class="img-responsive">';
                html += '<div class="desc" style="height:192px;">';
                html += '<span></span>';
                html += '<h3 class="mb20">' + result[i].title + '</h3>';
                html += '<span class="mb20">' + result[i].name + '</span>';
                html += '<span class="price mb20">' + result[i].contents.substring(0, 10) + '</span>';
                html += '<a class="btn btn-primary btn-outline" href="#">상세 보기<i class="icon-arrow-right22"></i></a>';
                html += '</div></div></div>';

                if(i%3==2) html += '</div>';
            }

            document.querySelector('.lastRow').insertAdjacentHTML('beforebegin', html);

        }else{
            console.error(xhr.responseText);
        }
        
    };

})();
