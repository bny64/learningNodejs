(function(){
    'user strict';

    let pageNo = 1;
    let pageSize = 3;
    let lastCheck = false;
    let firstCheck = false;

    getCommentList();

    function getCommentList(){
        const sendData = {};
        const xhr = new XMLHttpRequest();

        sendData.pageNo = pageNo;
        sendData.pageSize = pageSize;

        xhr.onload = () => {
            makeCommentList(xhr);
        }

        xhr.open('POST', '/board/getCommentList');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(sendData));
    }

    function makeCommentList(xhr){
        if(xhr.status === 200){

            const result = JSON.parse(xhr.responseText);

            if(!firstCheck){
                firstCheck = true;
                let html = '';
                html += '<div class="row txAnCtr commentRow">';
                let i = 0;
                for(i; i<result.count/3+1; i++){
                    html += '<span class="pageBtn" style="margin-right:5px;>"' + i + '</span>';
                }
                html += '</div>';
                document.querySelector('.lastRow').insertAdjacentHTML('beforebegin', html);

                let firstBtn = document.querySelectorAll('.pageBtn')[0];
                if(firstBtn.classList){
                    firstBtn.classList.add('fffty');
                }else{
                    firstBtn.className = ' ' + 'fffty';
                }

            }

            let html = '<div class="row">';
            result.contents.map((cur)=>{
                let html = '';
                html += '<div class="col-md-4 animate-box>"';
                html += '<div class="feature-left">';
                html += '<div class="feature-copy">';
                html += '<h3>' + cur.name + '</h3>';
                html += '<p>' + cur.contents + '</p>';
                html += '</div></div></div>';
            });
            html += '</div>';
            document.querySelector('.commentRow').insertAdjacentHTML('beforebegin', html);
        }
    }
})();