const dns = require("dns");
let domainAdress = "rc.kbsec.com";
let ipAdress = "58.229.161.45";

dns.lookup(domainAdress, (err, ip)=>{
    if(err) throw err;
    console.log(ip);
})

dns.reverse(ipAdress, (err, domains)=>{
    console.log(domains);
    /* domains.forEach(domain=>{
        console.log(domain)
    }) */
})

