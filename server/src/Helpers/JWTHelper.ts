import { NextFunction, Request, Response } from "express";
import HttpErrors from "http-errors";
import JWT from "jsonwebtoken";


export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.headers.cookie) {
    return next(HttpErrors(401, "Unauthorized"))
  }

  const jwtToken = req.headers.cookie.split("=")[1];

  console.log(jwtToken);
  let decodedToken;
  decodedToken = JWT.verify(jwtToken, process.env.JWT_SECRET_KEY!, (err, payload) => {
    if (err) {
      return next(HttpErrors(401, "Unauthorized"));
    }
    next();
  });
};
