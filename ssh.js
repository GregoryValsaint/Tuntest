const ssh = require('ssh2');
const client = new ssh.Client();

client.on('ready', () => {
  console.log('Connexion SSH établie');

  // Gérer le trafic entrant
  client.on('data', (data) => {
    console.log(`Données reçues du tunnel SSH: ${data}`);
    // Transmettre les données reçues au tunnel js-libp2p
    // ...
  });

  // Gérer le trafic sortant
  // Recevoir les données du tunnel js-libp2p et les envoyer au tunnel SSH
  // ...
});

client.connect({
  host: 'remote-server',
  port: 22,
  username: 'username',
  password: 'password'
});