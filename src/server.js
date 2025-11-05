import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, { dbName: 'ai-assistant' })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
