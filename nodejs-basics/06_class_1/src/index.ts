import express, {Request, Response, NextFunction} from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'

const app = express();
console.log(process.env.PORT);
dotenv.config({
    debug: true
})

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('New request received, ...')
    console.log('Request url: ', req.url);

    next();
}


app.use(express.json());
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(helmet.hidePoweredBy())
app.use(logger);

export interface Post {
    name: string;
    family: string;
}

app.get('/posts', (req: Request, res: Response) => {
    console.log('our route')
    const post: Post = {
        name: 'mostafa',
        family: 'mostafavi'
    }
    return res.send(post)
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Start listening on port http://localhost:${port}`)
})
