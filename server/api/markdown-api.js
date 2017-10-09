import { promisify } from 'util';
import fs from 'fs';
import { Observable } from 'rxjs';
import { Router } from 'express';
import NodeCache from 'node-cache';
import marked from 'marked';
import fm from 'front-matter';
import slugify from 'slugify';

// const cache = NodeCache();
const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const cache = new NodeCache({});

marked.setOptions({
  highlight: function (code, language) {
    let codeHtml = require('highlight.js').highlightAuto(code).value;

    return `<pre><code class="hljs ${language}">${codeHtml}</code></pre>`;
  }
});

export default function markdownApi (config) {
  let router = Router();
  let posts = [];

  if (!config.path) {
    throw Error('Markdown API requires path');
  }

  getPosts(config.path)
    .subscribe(
      (post) => posts.push(post),
      () => {},
      () => {
        posts.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        cache.set('posts', posts);
      });

  router.get('/', (req, res, next) => {
    let tag = req.query.tag;
    let posts = cache.get('posts');

    if (!config.showConcepts) {
      posts = posts.filter(post => !post.meta.concept);
    }

    if (tag) {
      posts = posts.filter(post => {
        return post.meta.tags && post.meta.tags.indexOf(tag) > -1
      });

      if (posts.length === 0) {
        return res.status(404).send('Tag not found');
      }
    }

    res.json(posts);
  });

  router.get('/:year/:month/:day/:slug', (req, res, next) => {
    let posts = cache.get('posts'); 
    let { year, month, day, slug } = req.params;
    let date = `${year}-${month}-${day}T00:00:00.000Z`;

    let foundPosts = posts.filter(post => slug === post.slug && date === post.date);

    if (foundPosts.length === 0) {
      return res.status(404).send('Blogpost not found');
    }

    res.json(foundPosts[0]);
  });

  return router;
}

// function readFiles (path) {
//   return getFilenames.then(files => Promise.all(readFile()))
// }

// function getFilenames () {
//   return new Promise((resolve, reject) {

//   });
// }

function getPosts (path) {
  return Observable
    .fromPromise(readDir(path))
    .flatMap(Observable.from)
    .flatMap(file => Observable.fromPromise(readFile(`${path}/${file}`, 'utf8')), (fileName, data) => {
      let parsedData = fm(data);
      let content = marked(parsedData.body);
      let meta = parsedData.attributes;

      if (meta.tags) {
        meta.tags = meta.tags.split(',');
      }

      return {
        fileName,
        content,
        meta
      };
    })
    .map(file => {
      let title = file.fileName.split('-')[1].replace('.md', '');
      let [year, month, day] = file.fileName.split('-')[0].split(' ');

      return Object.assign(file, {
        date: `${year}-${month}-${day}T00:00:00.000Z`,
        slug: slugify(title, { lower: true }),
        title
      });
    });
}
