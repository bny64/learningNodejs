const router = (pathName, req, res) => {
    if (pathName == '/keyboard') {
        const menu = {
            type: 'buttons',
            buttons: ["메뉴1", "메뉴2", "메뉴3"]
        };
        res.end(JSON.stringify(menu));       
    } else{
        console.log('path other');  
        res.end('bye');
    }
}

module.exports = router;