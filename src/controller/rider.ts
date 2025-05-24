import { Router } from 'express';``

const riderRouter = Router();

riderRouter.get('/', (req, res) => {
  res.json({ message: 'Rider route root' });
});

riderRouter.post('/ride/initialise', (req, res) => {
  res.json({ message: 'Ride successfully booked!' });
});

export default riderRouter;
