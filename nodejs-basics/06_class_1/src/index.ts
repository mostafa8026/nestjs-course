import express, {Request, Response, NextFunction} from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import postsController from './controllers/posts.controller'

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views')

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

app.use('/api/posts', postsController)

export interface Post {
    name: string;
    family: string;
}



app.get('/home/posts/:id', (req, res) => {
    const postId = req.params.id;

    return res.render('posts/post', {
        post: {
            id: postId
        }
    })
})

app.get('/home', (req,res)=>{
    return res.render('index');
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Start listening on port http://localhost:${port}`)
})
