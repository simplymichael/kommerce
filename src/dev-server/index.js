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


server.use(jsonServer.rewriter(routes)); // Support custom routes
server.use(router); // Use default router
server.listen(port, () => {
  console.log(`JSON Server is running on port: ${port}`);
});
