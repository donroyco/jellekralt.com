import { Router } from 'express';

const router = Router();

// Mock blog posts
const posts = [
  {
    date: '2017-12-22T00:00:00.000Z',
    title: 'Foo',
    slug: 'foo'
  }, {
    date: '2017-12-03T00:00:00.000Z',
    title: 'Bar',
    slug: 'bar'
  }
];

/* GET blogpost listing. */
router.get('/blog', function (req, res, next) {
  res.json(posts);
});

/* GET post by ID. */
router.get('/blog/:year/:month/:day/:slug', function (req, res, next) {
  let { year, month, day, slug } = req.params;
  let date = new Date(`${year}-${month}-${day}T00:00:00.00Z`);
  let post = posts.filter(post => new Date(post.date).getTime() === date.getTime() && post.slug === slug);

  if (post.length) {
    console.log('post[0]', post[0]);

    res.json(post[0]);
  } else {
    res.sendStatus(404);
  }
});

export default router;
