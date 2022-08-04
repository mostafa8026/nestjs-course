import express from 'express'

const app = express();

app.use(express.json());

let id = 0;
const posts = [];

app.get('/', (req, res) => {
    console.log(req.url);

    return res.send('Hello world!');
})

app.get('/posts', (req, res) => {
    return res.send(posts);
})

app.delete('/posts/:id', (req, res) => {
    console.log(req.params);
    const {id} = req.params;

    const index = posts.findIndex((x) => x.id == id);

    console.log(index);

    if(index < 0) {
        return res.status(404).send('post not found');
    }

    const post = posts[index];
    posts.splice(index, 1);

    return res.send(post)
})

app.post('/posts', (req, res) => {
    console.log(req.body);
    id++;
    req.body.id = id;
    posts.push(req.body);
    return res.send(req.body);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})