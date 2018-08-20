import { Router } from 'express';
import NodeCache from 'node-cache';
import * as Pinboard from 'node-pinboard';

const API_TOKEN = process.env.PINBOARD_API_TOKEN;
const pinboard = new Pinboard(API_TOKEN);

const router = Router();
const cache = new NodeCache({});

router.get('/links', (req, res, next) => {
  const links = cache.get('links');

  if (links) {
    return res.json(links);
  }

  pinboard.recent({}, (err, data) => {
    let links = [];

    if (err) return res.status(500).send(err);

    if (data && data.posts) {
      links = data.posts
        .filter(link => {
          const tags = link.tags.split(' ');
          return link.shared === 'yes' && tags.includes('linkdump');
        })
        .map(link => {
          let { href, description, time } = link;
          return {
            href,
            description,
            time
          };
        });
    }

    cache.set('links', links, 10 * 60);

    res.json(links);
  });
});

export default router;
