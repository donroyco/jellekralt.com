import { Router } from 'express';
import path from 'path';
import markdownApi from './markdown-api';

const router = Router();

/* Load Markdown API */
router.use('/blog', markdownApi({
  path: path.resolve(__dirname, '../../content/blog'),
  showConcepts: !(process.env.NODE_ENV === 'production')
}));

export default router;
