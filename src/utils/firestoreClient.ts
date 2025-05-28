const admin = require("firebase-admin");

const serviceAccount = require("../keys/admin-service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stickersmash-b6cd8-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();


export default db;
