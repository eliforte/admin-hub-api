import dotenv from 'dotenv'
import mongoose from 'mongoose';
import App from './app';
import UserRoutes from '../routes/users';
import LoginRoute from '../routes/login';
import VoucherRoutes from '../routes/voucher';
import ErrorHandler from '../middlewares/errors';

dotenv.config();
const app = new App();

const databaseUrl = process.env.NODE_ENV === 'production'
  ? process.env.URL_PROD
  : process.env.URL_DEV;

mongoose.connect(`${databaseUrl}`);

const corsOptions = {
  origin: [`${process.env.URL_PROD}`, `${process.env.URL_DEV}`, 'http://localhost:3000']
}

app.useCors(corsOptions);
app.newRoutes(new UserRoutes().router);
app.newRoutes(new LoginRoute().router);
app.newRoutes(new VoucherRoutes().router);
app.errorHandler(ErrorHandler.handler);

app.server(process.env.PORT || 5050);
