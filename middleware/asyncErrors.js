export default (AsyncErrorParamFunction) => (req, res, next) => {
  Promise.resolve(AsyncErrorParamFunction(req, res, next).catch(next))
}
