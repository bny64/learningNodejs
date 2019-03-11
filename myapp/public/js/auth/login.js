document.querySelector('#loginBtn').addEventListener('click', (e)=>{
    document.querySelector('.dim-layer').style.display = 'block';
});

document.querySelector('.btn-layerClose').addEventListener('click',(e)=>{
    document.querySelector('#loginAccount').value = '';
    document.querySelector('#loginPassword').value = '';
    document.querySelector('.dim-layer').style.display = 'none';
})