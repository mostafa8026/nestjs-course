import express from 'express'
import { validate } from 'class-validator'
import { UserDto } from './user';

const user = new UserDto('Mostafa');
user.logName(true);

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
    const user = new UserDto(req.body.name);
    const validationResult = await validate(user);
    if (validationResult) {
        return res.status(400).send(validationResult[0]);
    }
    console.log(validationResult);
    res.send(`Hello World ${JSON.stringify(req.body)}, ${JSON.stringify(validationResult)}`)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});