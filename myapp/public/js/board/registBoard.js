(function(){
    'use strict';

    //$(document).ready(()=>{
        $("#summernote").summernote({
            lang:'ko-KR',
            disableDragAndDrop:true,
            shortcuts:false,
            minHeight:616,
            maxHeight:616,
            focus:true,
            placeholder:'내용을 입력해 주세요.',
            toolbar : [
                ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['fontname', ['fontname']],
                ['fontsize', ['fontsize']],
                ['color', ['color']],
                ['para', ['paragraph', 'ol', 'ul']],
                ['misc', ['codeview']]
            ]
        });    
    //})
    
    document.querySelector("#registBtn").addEventListener("click",()=>{
        document.getElementsByClassName("contentForm")[0].submit();
    });
    
})();