const Libp2p = require('libp2p');
const mplex = require('libp2p-mplex');
const { Noise } = require('libp2p-noise');

// Créer un noeud js-libp2p
const node = new Libp2p({
  modules: {
    transport: [
      mplex({}),
    ],
    security: [
      new Noise(),
    ],
  },
});

// Gérer les événements de connexion et de déconnexion
node.on('peerStore:peerStoreChange', (peer) => {
  if (peer.isConnected) {
    console.log(`Connecté à un pair: ${peer.id.toString()}`);

    // Établir un canal de communication avec le pair
    const channel = node.createStream(peer, '/tunnel');

    // Gérer le trafic entrant
    channel.on('data', (data) => {
      console.log(`Données reçues du tunnel js-libp2p: ${data}`);
      // Transmettre les données reçues au tunnel SSH
      device.write(data);
    });

    // Gérer le trafic sortant
    device.on('data', (data) => {
      console.log(`Données envoyées au tunnel js-libp2p: ${data}`);
      // Envoyer les données au tunnel js-libp2p
      channel.write(data);
    });
  } else {
    console.log(`Déconnecté du pair: ${peer.id.toString()}`);
  }
});

// Démarrer le noeud
await node.start();

// Découvrir et se connecter aux pairs
// ...