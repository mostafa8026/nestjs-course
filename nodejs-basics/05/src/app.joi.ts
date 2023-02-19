import express from 'express';
import { ValidationError } from 'joi';
import { User } from './models/user';
import { createUserSchema } from './schema/user.schema';

const app = express();

app.use(express.json())

app.post('/users', async (req, res) => {
  try {
    const { name, email, password } = await createUserSchema.validate(req.body).value;
    const user = new User();
    const existingUser = await user.findByEmail(email);
    if (existingUser) {
      res.status(409).json({ message: 'User with that email already exists' });
      return;
    }
    const newUser = await user.create({ name, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    if (err instanceof ValidationError) {
      res.status(400).json({ message: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
