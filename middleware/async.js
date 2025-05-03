// Middleware pour capturer les erreurs asynchrones
module.exports = fn => {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
