import express from 'express';
import helmet from 'helmet';
import userRouter from './controllers/user.controller';
import counter from './middlewares/request-counter.middleware';

const app = express();

app.use(express.json());
app.use(express.static('src/public'))
app.use(counter);
app.use(helmet({
  hidePoweredBy: true
}))
app.use('/person', userRouter)

app.listen(3000, () => {
  console.log('listening on 3000')
})