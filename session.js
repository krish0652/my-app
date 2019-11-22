/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export function validate(req, res, next) {
  console.log('validator');
  next();
}
