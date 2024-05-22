const tuntap = require('tuntap2');

// Créer une interface tuntap
const device = await tuntap.createDevice();
console.log(`Interface tuntap créée: ${device.name}`);

// Configurer l'interface tuntap
device.address = '192.168.1.10';
device.netmask = '255.255.255.0';
device.gateway = '192.168.1.1';
await device.up();
console.log(`Interface tuntap configurée et activée`);


try {
    const tun = new Tun();
    tun.mtu = 1400;
    tun.ipv4 = '10.0.0.100/24';
    tun.on('data', (buf) => {
        console.log('received:', buf)
    })
    tun.isUp = true;
    console.log(`Interface tuntap configurée et activée`);
    var result = `created tun: ${tun.name}, ip: ${tun.ipv4}, ${tun.ipv6}, mtu: ${tun.mtu}`
    tun.release();
}
catch(e) {
    console.log('error: ', e);
    process.exit(0);
}