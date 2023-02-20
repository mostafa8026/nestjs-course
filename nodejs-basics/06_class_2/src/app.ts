import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});