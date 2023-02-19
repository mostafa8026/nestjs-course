import { instanceToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { default as express, default as Router } from 'express';
import { UserDto } from '../dto/user.dto';
import { UserModel } from '../models/user.model';

const userRouter = Router();

userRouter.post('/', async (req: express.Request, res: express.Response) => {
  const user = new UserModel('user');
  user.id = req.body.id;
  user.name = req.body.name;
  user.password = '123';
  try {
    const validationResult = await validate(user);
    if (validationResult.length) {
      return res.status(400);
    }

    user.create(user);
  } catch (err) {
    console.error(err);
  }
})

userRouter.get('/', (req: express.Request, res: express.Response) => {
  console.log(req.query);

  const user = new UserDto();
  user.id = 5;
  user.name = 'mostafa';
  user.password = '123';

  return res.json(instanceToPlain(user));
})

export default userRouter;