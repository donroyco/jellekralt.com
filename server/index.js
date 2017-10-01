import querystring from 'querystring';
import express from 'express';
import { Nuxt, Builder } from 'nuxt';

import api from './api';

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

const mainDomain = 'jellekralt.com';
const dokkuDomain = 'jellekralt-com.kra.lt';

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
  const url = req.url;

  if (host !== mainDomain && host !== dokkuDomain) {
    let redirectTo = `https://${mainDomain}${url}`;

    res.redirect(redirectTo);
  } else {
    next();
  }
}

function dokkuHeaders (req, res, next) {
  const host = req.hostname;

  if (host === dokkuDomain) {
    res.setHeader('X-Robots-Tag', ['googlebot: nofollow', 'otherbot: noindex, nofollow']);
  }
}
