import db from '@/utils/firestoreClient';
import { Router } from 'express';``

const riderRouter = Router();

riderRouter.get('/', (req, res) => {
  res.json({ message: 'Rider route root' });
});

riderRouter.get('/ride/initialise', async (req: any, res: any) => {
  const { amount, driverId, riderId, driverPubKey, riderPubKey} = req.body;

  if (!amount || !driverId || !riderId) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const newRide = {
      amount,
      driverId,
      riderId,
      driverPubKey,
      riderPubKey,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const docRef = await db.collection('rides').add(newRide);

    res.json({ message: 'Ride successfully booked!', rideId: docRef.id });
  } catch (error) {
    console.error('Error booking ride:', error);
    res.status(500).json({ message: 'Failed to book ride', error: error});
  }
});

export default riderRouter;
