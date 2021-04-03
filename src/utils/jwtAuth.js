import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export default function () {
  return (req, res, next) => {
    const tokenJWT = (req.get('Authorization') || '').split(' ')[1];

    // if no token then return error 401
    if (!tokenJWT) {
      return next(createError(401, 'No token provided'));
    }

    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
      if (err) return next(createError(401, err.message));
      req.userId = payload.id;
      next();
    });
  };
}
