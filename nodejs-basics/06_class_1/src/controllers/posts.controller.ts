import Router, {Request, Response} from 'express'
import {Post} from "../index";
import {insert} from '../services/posts.service'

const router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log('our route')
    const post: Post = {
        name: 'mostafa',
        family: 'mostafavi'
    }
    return res.send(post)
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('our route')
    const post: Post = {
        name: 'mostafa',
        family: 'mostafavi'
    }
    return res.send(post)
});

router.post('/', (req, res) => {
    insert(req.body);
})

// post
// delete
// put

export default router;