// Append creation date to the body of every post request
const middleware = (req, res, next) => {
  if (req.method === 'POST') {
    req.body.dateAdded = Date.now();
  }

  next();
};

export default middleware;
