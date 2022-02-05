import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import errorHandler from './middlewares/errorHandler';
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/user', userRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Servidor ouvindo na porta:${PORT}!`));
