export class PostService {
    get(page, count) {
        return `posts in page ${page}, with count: ${count}`;
    }
}