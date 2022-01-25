## Useful command for join

const builder = this.postRepository
.createQueryBuilder('post')
.select("post", "category.id")
.leftJoinAndSelect("post.categories", "category");

<!-- select p.*, pcc.categoryId from post p
inner join post_categories_category pcc on p.id = pcc.postId
inner join category c on c.id = pcc.categoryId -->
