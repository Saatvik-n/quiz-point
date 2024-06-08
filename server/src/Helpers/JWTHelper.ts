import { NextFunction, Request, Response } from "express";
import HttpErrors from "http-errors";
import JWT from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../Constants/Constants.js";


export const validateJWT = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.headers.cookie) {
        console.log('No cookie');
        return next(HttpErrors(401, "No cookie"))
    }
    const jwtToken = req.headers.cookie.split("=")[1];

    let decodedToken;

    let result = JWT.decode(jwtToken) as any

    decodedToken = JWT.verify(jwtToken, JWT_SECRET_KEY!, (err, payload) => {
        if (err) {
            console.log('Error verifying JWT');
            return next(HttpErrors(401, "Could not verify JWT"));
        }
        return res.json({
            username: result.username,
            userID: result.userID,
            name: result.name
        })
    });
};

export function onlyValidateJWT(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.cookie) {
        return next(HttpErrors(401, "Unauthorized"))
    }
    const jwtToken = req.headers.cookie.split("=")[1];

    let decodedToken;

    let result = JWT.decode(jwtToken) as any

    decodedToken = JWT.verify(jwtToken, JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            return next(HttpErrors(401, "Unauthorized"));
        }
        next()
    });

}
