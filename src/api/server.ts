import dotenv from 'dotenv'
import mongoose from 'mongoose';
import App from './app';

dotenv.config();
const app = new App();

const databaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.URL_PROD
  : process.env.URL_DEV;

mongoose.connect(`${databaseUrl}`);

const corsOptions = {
  origin: [`${process.env.URL_PROD}`, `${process.env.URL_DEV}`, 'http://localhost:9000']
}

app.useCors(corsOptions);

app.server(process.env.PORT || 5050);
