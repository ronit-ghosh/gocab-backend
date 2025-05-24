import express from 'express';
import cors from 'cors';
import rootRouter from './routes/router';


const app = express();


//middlewares 
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({message: 'server is up and running!'});
})

app.use('/api', rootRouter);

app.listen(5001, () => {
  console.log('gocab backend is running on port 5001');
})
