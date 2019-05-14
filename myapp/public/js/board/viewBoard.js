(function(){
    'user strict';

    const iconArr = [
        'icon-hotairballoon', 'icon-search','icon-wallet','icon-wine','icon-genius','icon-chat'
    ]
    
    let pageSize = 3;
    let lastCheck = false;
    let firstCheck = false;
    const boardNo = document.querySelector('#listNoVal').value;

    document.querySelector('#showComment').addEventListener('click',()=>{
        document.querySelector('#popup').style.display = '';
    });

    document.querySelector('#cancelComment').addEventListener('click',()=>{
        document.querySelector('#popup').style.display = 'none';
    });

    document.querySelector('#addComment').addEventListener('click',()=>{
        document.querySelector('#popup').style.display = 'none';
        const contents = document.querySelector('#commentContents').value;        
        addComment(contents);
    });

    getCommentList(1);

    function addComment(contents){
        const sendData = {};
        const xhr = new XMLHttpRequest();

        sendData.boardNo = boardNo;
        sendData.contents = contents;

        xhr.onload = () => {
            getCommentList(1);
        }
        xhr.open('POST', '/board/addComment');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(sendData));
    }

    function getCommentList(pageNo){
        const sendData = {};
        const xhr = new XMLHttpRequest();

        sendData.pageNo = pageNo;
        sendData.pageSize = pageSize;
        sendData.boardNo = boardNo;

        xhr.onload = () => {
            firstCheck = false;
            makeCommentList(xhr);
        }

        xhr.open('POST', '/board/getCommentList');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(sendData));
    }

    function makeCommentList(xhr){
        if(xhr.status === 200){

            const result = JSON.parse(xhr.responseText);

            if(result.count[0].count==0) return;

            if(!firstCheck){
                firstCheck = true;
                let html = '';
                html += '<div class="row txAnCtr commentRow mbt20">';
                let i = 0;
                for(i; i<Math.floor(result.count[0].count/3)+1; i++){
                    html += '<a href="javascript:void(0);"><span class="pageBtn" style="margin-right:5px;">' + (i+1) + '</span></a>';
                }
                html += '</div>';
                document.querySelector('.lastRow').insertAdjacentHTML('beforebegin', html);

                let firstBtn = document.querySelectorAll('.pageBtn')[0];
                if(firstBtn.classList){
                    firstBtn.classList.add('fffty');
                }else{
                    firstBtn.className = ' ' + 'fffty';
                }

                const pageBtnArr = document.querySelectorAll('.pageBtn');
                pageBtnArr.forEach((element)=>{

                    element.addEventListener('click', ()=>{

                        pageBtnArr.forEach((tagEle)=>{
                            if(tagEle.classList){
                                tagEle.classList.remove('fffty');
                            }else{
                                tagEle.className = tagEle.className.replace(new RegExp('(^|\\b)' + 'fffty'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
                            }
                        });

                        if(element.classList){
                            element.classList.add('fffty');
                        }else{
                            element.className += ' ' + 'fffty';
                        }

                        const commentDiv = document.querySelector('.commentList');
                        //while(commentDiv.firstChild) commentDiv.removeChild(commentDiv.firstChild);
                        commentDiv.parentNode.removeChild(commentDiv);

                        getCommentList(element.textContent || element.innerText);

                    });
                });

            }

            let html = '<div class="row commentList">';
            result.contents.map((cur)=>{                
                html += '<div class="col-md-4 animate-box fadeInUp animated">';
                html += '<div class="feature-left">';
                html += '<span class="icon">';
                const className = iconArr[Math.floor((Math.random() * (iconArr.length)))];
                html += '<i class="'+className+'"></i></span>';
                html += '<div class="feature-copy">';
                html += '<h3>' + cur.name + '</h3>';
                html += '<p>' + cur.contents + '</p>';
                html += '<p><a href="javascript:void(0);"></a></p>';
                html += '</div></div></div>';
            });
            html += '</div>';
            
            document.querySelector('.commentRow').insertAdjacentHTML('beforebegin', html);
        }
    }
})();