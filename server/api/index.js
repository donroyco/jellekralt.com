import { Router } from 'express';

import blogPosts from './blog-posts';

const router = Router();

// Add USERS Routes
router.use(blogPosts);

export default router;
