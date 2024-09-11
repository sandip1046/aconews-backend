//server/index.ts
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import router from './src/routes/newsRoutes';
import { get } from 'http';
import getNews from './src/controllers/newsController';

config();

const app = express();
app.use(cors());
app.use(json());


app.get('/api/news/', getNews);

const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

connect(mongoUri)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.error(error.message));
