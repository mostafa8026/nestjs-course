import express from 'express';
import { errorMiddleware } from './middlewares/error.handler';
import { UserService } from './services/users';
import logger from './utils/logger';

const app = express();
app.use(express.json());

app.post('/users', async (req, res, next) => {
  try {
    const userService = new UserService();

    const newUser = await userService.createUser(req.body)
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    next(err)
  }
});

app.use(errorMiddleware);

app.listen(3000, () => logger.info('Server started on port 3000'));
