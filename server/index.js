import url from 'url';
import express from 'express';
import helmet from 'helmet';
import { Nuxt, Builder } from 'nuxt';

import api from './api';

import redirects from '../redirects.json';

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const mainDomain = 'jellekralt.com';
const dokkuDomain = 'jellekralt-com.kra.lt';

app.use(helmet());

app.set('port', port);

// Import API Routes
app.use('/api', api);

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

if (process.env.NODE_ENV === 'production') {
  app.use(redirect);
}

app.use(dokkuHeaders);

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);

console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

function redirect (req, res, next) {
  const host = req.hostname;
  const urlPath = req.url;
  const fullUrl = url.format({
    host: req.get('host'),
    pathname: req.path
  });
  const foundRedirects = redirects.filter(redirect => redirect.from === fullUrl);

  console.log('fullUrl', fullUrl);

  if (foundRedirects.length > 0) {
    res.redirect(301, foundRedirects[0].to);
  } else if (host !== mainDomain && host !== dokkuDomain) {
    let redirectTo = `https://${mainDomain}${urlPath}`;
    res.redirect(301, redirectTo);
  } else {
    next();
  }
}

function dokkuHeaders (req, res, next) {
  const host = req.hostname;

  if (host === dokkuDomain) {
    res.setHeader('X-Robots-Tag', ['googlebot: nofollow', 'otherbot: noindex, nofollow']);
  }

  next();
}
