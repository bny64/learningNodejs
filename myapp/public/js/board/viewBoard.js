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
        let contents = document.querySelector('#commentContents').value;        
        addComment(contents);
    });

    getCommentList(1);

    function addComment(contents){
        const sendData = {};
        const xhr = new XMLHttpRequest();

        sendData.boardNo = boardNo;
        sendData.contents = contents;

        xhr.onload = () => {
            firstCheck = false;
            document.querySelector('#commentContents').value = '';            
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
            makeCommentList(xhr);
        }

        xhr.open('POST', '/board/getCommentList');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(sendData));
    }

    function makeCommentList(xhr){
        if(xhr.status === 200){
            
            const result = JSON.parse(xhr.responseText);
            const containerNode = document.querySelector('.lastRow').parentNode;

            if(result.count[0].count==0) return;

            if(!firstCheck){
                firstCheck = true;

                const commentRowDiv = document.querySelector('.commentRow');

                if(commentRowDiv !== null && containerNode.hasChildNodes(commentRowDiv)){                    
                    containerNode.removeChild(commentRowDiv);
                }

                let html = '';
                html += '<div class="row txAnCtr commentRow mbt20">';
                let i = 0;
                const length = result.count[0].count%3 == 0 ? result.count[0].count/3 : Math.floor(result.count[0].count/3) + 1;
                for(i; i<length; i++){
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

                        getCommentList(element.textContent || element.innerText);

                    });
                });

            }

            const commentListDiv = document.querySelector('.commentList');

            if(commentListDiv !== null && containerNode.hasChildNodes(commentListDiv)){
                containerNode.removeChild(commentListDiv);
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