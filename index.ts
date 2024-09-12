//server/index.ts
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

import getNews from './src/controllers/newsController';

config();

const app = express();
app.use(cors()); // Enable CORS
app.use(json());


app.get('/api/news/', getNews); // Get news from the GNews API with query and page number

const PORT = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI; // Get the MongoDB URI from the environment variables

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}

// Connect to MongoDB and start the server
connect(mongoUri)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.error(error.message));
