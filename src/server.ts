import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import errorHandler from './middlewares/errorHandler';
import './typeorm';
import accountRouter from './routes/accountRouter';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/account', accountRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor ouvindo na porta:${PORT}!`));
