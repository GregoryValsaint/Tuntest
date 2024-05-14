const {Tun, Tap} = require('tuntap2');
var express = require ('express');

//Initiate server
var app = express();



try {
    const tun = new Tun();
    tun.mtu = 1400;
    tun.ipv4 = '10.0.0.100/24';
    tun.on('data', (buf) => {
        console.log('received:', buf)
    })
    tun.isUp = true;
    var result = `created tun: ${tun.name}, ip: ${tun.ipv4}, ${tun.ipv6}, mtu: ${tun.mtu}`
    tun.release();
}
catch(e) {
    console.log('error: ', e);
    process.exit(0);
}

// configure routes
app.get('/', function (req, res) {
    res.send(result)
});

//launch server
app.listen(3000, function(){
    console.log('Serveur en écoute')
});