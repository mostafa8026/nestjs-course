import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import Router, { Request, Response } from 'express';
import { EventsInterface } from '../interfaces/events.interface';
import { BaseRepository } from '../models/base.repository';
import { Events } from '../models/events.model';

const eventRouter = Router();
const eventsRepository = new BaseRepository<EventsInterface>('events');

// Get all events
eventRouter.get('/', async (req: Request, res: Response) => {
  const events = await eventsRepository.getAll();
  res.json(events);
});

// Get event by id
eventRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const event = await eventsRepository.getById(id);
  if (!event) {
    return res.status(404).send('Event not found');
  }
  res.json(event);
});

// Create event
eventRouter.post('/', async (req: Request, res: Response) => {
  const eventData = plainToClass(Events, req.body);
  const errors = await validate(eventData);
  if (errors.length > 0) {
    return res.status(400).send(errors);
  }
  const event = await eventsRepository.create(eventData);
  res.json(event);
});

// Update event
eventRouter.put('/:id', async (req: Request, res: Response) => {
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
eventRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const event = await eventsRepository.delete(id);
    res.json(event);
  } catch (err) {
    res.status(404).send('Event not found');
  }
});

export default eventRouter;