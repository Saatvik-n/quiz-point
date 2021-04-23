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

  let result = JWT.decode(jwtToken) as any
  console.log(result);

  decodedToken = JWT.verify(jwtToken, process.env.JWT_SECRET_KEY!, (err, payload) => {
    if (err) {
      return next(HttpErrors(401, "Unauthorized"));
    }
    return res.json({
      username: result.username, 
      userID: result.userID, 
      name: result.name
    })
  });
};

export function onlyValidateJWT(req:Request, res: Response, next:NextFunction) {
    if (!req.headers.cookie) {
    return next(HttpErrors(401, "Unauthorized"))
  }
  const jwtToken = req.headers.cookie.split("=")[1];

  let decodedToken;

  let result = JWT.decode(jwtToken) as any

  decodedToken = JWT.verify(jwtToken, process.env.JWT_SECRET_KEY!, (err, payload) => {
    if (err) {
      return next(HttpErrors(401, "Unauthorized"));
    }
    next()
  });

}
