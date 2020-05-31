// Replace query strings with json-server-specific equivalents
const middleware = (req, res, next) => {
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
};

export default middleware;
