const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/__DATA__/api.json');
const middlewares = jsonServer.defaults();
const env = require('../.env');


const port = env.api.port || 3001;
const routes = require('./routes'); // Defines our custom routes

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.dateAdded = Date.now();
  }

  next(); // Continue to JSON Server router
});

// embed product-reviews in every request for products
server.use((req, res, next) => {
  if(req.path.indexOf('/products') === 0 && !req.query._embed) {
    req.query._embed = 'product-reviews';
  }

  next();
});

// Replace query strings with json-server-specific equivalents
server.use((req, res, next) => {
  const replacements = {
    page: '_page',
    limit: '_limit',
    embed: '_embed',
  };

  for(let [key, replacement] of Object.entries(replacements)) {
    if(req.query[key]) {
      req.query[replacement] = req.query[key];
      delete req.query[key];
    }
  }

  next();
});


server.use(jsonServer.rewriter(routes)); // Support custom routes
server.use(router); // Use default router
server.listen(port, () => {
  console.log(`JSON Server is running on port: ${port}`);
});
