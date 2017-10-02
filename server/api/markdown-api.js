import fs from 'fs';
import { Router } from 'express';
import marked from 'marked';
import slugify from 'slugify';

export default function markdownApi (config) {
  let router = Router();

  if (!config.path) {
    throw Error('Markdown API requires path');
  }

  router.get('/', (req, res, next) => {
    fs.readdir(config.path, (err, files) => {
      if (err) {
        return res.status(404).send('Blogposts not found');
      }

      res.json(files.map((file) => {
        let title = file.split('-')[1].replace('.md', '');
        let [year, month, day] = file.split('-')[0].split(' ');

        return {
          date: `${year}-${month}-${day}T00:00:00.000Z`,
          title: title,
          slug: slugify(title, { lower: true })
        };
      }));
    });
  });

  router.get('/:year/:month/:day/:slug', (req, res, next) => {
    let { year, month, day, slug } = req.params;

    fs.readdir(config.path, (err, files) => {
      if (err) {
        return res.status(404).send('Blogposts not found');
      }

      let foundFiles = files.filter((file) => {
        let fileTitle = file.split('-')[1].replace('.md', '');
        let [fileYear, fileMonth, fileDay] = file.split('-')[0].split(' ');

        let matchTitle = slug === slugify(fileTitle, { lower: true });
        let matchYear = year === fileYear;
        let matchMonth = month === fileMonth;
        let matchDay = day === fileDay;

        return matchTitle && matchYear && matchMonth && matchDay;
      });

      if (foundFiles.length === 0) {
        return res.status(404).send('Blogpost not found');
      }

      fs.readFile(config.path + '/' + foundFiles[0], 'utf8', (err, data) => {
        if (err) {
          return res.status(404).send('Blogpost not found');
        }

        res.json({
          date: `${year}-${month}-${day}T00:00:00.000Z`,
          title: 'Foo',
          content: marked(data),
          slug: slug
        });
      });
    });
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
