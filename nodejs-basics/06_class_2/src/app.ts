import express, { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import path from 'path';
import { Events } from './models/events.model';
import { BaseRepository } from './models/base.repository';
import { EventsInterface } from './interfaces/events.interface';
import { generateRandomPositions } from './utils/get-playes';

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

const eventsRepository = new BaseRepository<EventsInterface>('events');

app.get('/', (req: express.Request, res: express.Response) => {
  //res.send('Hello World');
  res.render('index');
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
    ], 800, 400, 50, 50)
  });
});

// Get all events
app.get('/events', async (req: Request, res: Response) => {
  const events = await eventsRepository.getAll();
  res.json(events);
});

// Get event by id
app.get('/events/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const event = await eventsRepository.getById(id);
  if (!event) {
    return res.status(404).send('Event not found');
  }
  res.json(event);
});

// Create event
app.post('/events', async (req: Request, res: Response) => {
  const eventData = plainToClass(Events, req.body);
  const errors = await validate(eventData);
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }
  const event = await eventsRepository.create(eventData);
  res.json(event);
});

// Update event
app.put('/events/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const eventData = plainToClass(Events, req.body);
  eventData.id = id;
  const errors = await validate(eventData);
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }
  try {
    const event = await eventsRepository.update(eventData);
    res.json(event);
  } catch (err) {
    res.status(404).send('Event not found');
  }
});

// Delete event
app.delete('/events/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const event = await eventsRepository.delete(id);
    res.json(event);
  } catch (err) {
    res.status(404).send('Event not found');
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});