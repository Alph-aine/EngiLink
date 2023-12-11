// Middleware to hanlde async errors
export default (func) => async (req, res, next) => {
  Promise.resolve(func(req, res, next))
    .catch(next);
};
