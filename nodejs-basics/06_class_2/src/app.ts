import express from 'express';
import path from 'path';
import eventRouter from './controllers/event.controller';

import dotenv from 'dotenv';
import { generateRandomPositions } from './utils/get-playes';
import logger from './utils/logger';

logger.verbose('before calling config: ', process.env.PORT)
dotenv.config();
logger.verbose('after calling config: ', process.env.PORT)

const app = express();

/**
 * To use ejs you should first install it by setting the view engine of express to ejs
 */
app.set('view engine', 'ejs');
/**
 * Then you should set the views folder to the path of the views folder
 */
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/events', eventRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  //res.send('Hello World');
  res.render('index', {
    title: 'Application'
  });
});

app.get('/football', (req: express.Request, res: express.Response) => {
  //res.send('Hello World');
  res.render('football', {
    players: generateRandomPositions([
      { name: "A", number: "1" },
      { name: "B", number: "2" },
      { name: "C", number: "3" },
      { name: "D", number: "4" },
      { name: "E", number: "5" },
      { name: "F", number: "6" },
    ], 800, 400, 50, 50)
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
});