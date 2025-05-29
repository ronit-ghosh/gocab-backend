const admin = require("firebase-admin");

const driverServiceAccount = require("../keys/driver-app-service-key.json");
const riderServiceAccount = require("../keys/rider-app-service-key.json");

const driverApp = admin.initializeApp(
  {
    credential: admin.credential.cert(driverServiceAccount),
    databaseURL: "https://stickersmash-b6cd8-default-rtdb.asia-southeast1.firebasedatabase.app"
  },
  "driverApp" 
);

const riderApp = admin.initializeApp(
  {
    credential: admin.credential.cert(riderServiceAccount)
  },
  "riderApp" 
);

export const driverDb = driverApp.firestore();
export const riderDb = riderApp.firestore();
