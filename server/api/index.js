import { Router } from 'express';

import blogPosts from './blog-posts';
import links from './links';

const router = Router();

router.use(blogPosts);
router.use(links);

export default router;
