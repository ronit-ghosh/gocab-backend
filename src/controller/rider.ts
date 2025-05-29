import { riderDb } from '@/utils/firestoreClient';
import { Router } from 'express';``

const riderRouter = Router();

riderRouter.get('/', (req, res) => {
  res.json({ message: 'Rider route root' });
});

riderRouter.post('/ride/initialise', async (req: any, res: any) => {
  const {pickup, drop, fare, base, final, currency, solAmount, selectedRideType, userId, driverId, driverPubKey, riderPubKey, endTime} = req.body;

  try {
    const newRide = {
      pickup,
      drop,
      fare,
      base, 
      final, 
      currency,
      solAmount,
      selectedRideType,
      userId, 
      driverId,
      driverPubKey,
      riderPubKey,
      endTime,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const docRef = await riderDb.collection('rides').add(newRide);


    console.log('Ride successfully booked!', docRef.id );
    res.json({ message: 'Ride successfully booked!', rideId: docRef.id });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ message: 'Failed to book ride', error: error});
  }
});

// riderRouter.post('/ride/initialise', async (req: any, res: any) => {
//   const { amount, driverId, riderId, driverPubKey, riderPubKey} = req.body;
//
//   if (!amount || !driverId || !riderId) {
//     return res.status(400).json({ message: 'Missing required fields.' });
//   }
//
//   try {
//     const newRide = {
//       amount,
//       driverId,
//       riderId,
//       driverPubKey,
//       riderPubKey,
//       completed: false,
//       createdAt: new Date().toISOString()
//     };
//
//     const docRef = await db.collection('rides').add(newRide);
//
//
//     console.log('Ride successfully booked!', docRef.id );
//     res.json({ message: 'Ride successfully booked!', rideId: docRef.id });
//   } catch (error) {
//     console.error('Error booking ride:', error);
//     res.status(500).json({ message: 'Failed to book ride', error: error});
//   }
// });

export default riderRouter;
