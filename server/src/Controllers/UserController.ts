import { NextFunction, Request, Response } from "express";
import HttpError from "http-errors";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

import { loginAuthSchema, regAuthSchema } from "../Helpers/ValidationSchema";
import { userModel } from "../Models/UserModel";
import { quizModel } from "../Models/QuizModel";

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("Login request recieved");

    const result = await loginAuthSchema.validateAsync(req.body);

    const user = await userModel.findOne({
      username: result.username,
    });

    if (!user) {
      return next(HttpError(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      result.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(HttpError(401, "Wrong password"));
    }

    console.log("Before access token");
    
    const accessToken = JWT.sign({userID: user._id, name:user.name, username:user.username}, process.env.JWT_SECRET_KEY!);

    console.log("Access token = " ,accessToken);
    

    return res
      .status(200)
      .cookie("JWT", accessToken, {
        sameSite: "lax",
        expires: new Date(new Date().getTime() + 60 * 15 * 1000),
        httpOnly: true,
        path: "/",
      })
      .json({
        message: "User logged in",
        username: user.username,
        userID: user._id,
        name: user.name
      });
  } catch (error) {
    if (error.isJoi) {
      return next(
        HttpError(401, "Make sure that all fields have 5 characters")
      );
    }
    return next(HttpError(500, "Internal Server Error"));
  }
}

export function logoutUser(req:Request, res:Response, next:NextFunction) {
  return res.status(202).clearCookie('JWT').json({
    message: "User Logged out"
  })
}

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await regAuthSchema.validateAsync(req.body);

    const existingUsername = await userModel.findOne({
      username: result.username,
    });

    if (existingUsername) {
      return next(HttpError(409, "User Already Exists"));
    }

    const hashedPassword = await bcrypt.hash(result.password, 10);
    let newUser = await userModel.create({
      username: result.username,
      password: hashedPassword,
      name: result.name,
    });

    await newUser.save();

    return res.status(200).json({
      message: "New User Created",
    });
  } catch (err) {
    if (err.isJoi === true) {
      return next(HttpError(422, "All fields must have at least 5 characters"));
    }
    console.log("Error occurred while creating user");
    console.log(err);
    return next(HttpError(500, "Internal server error"));
  }
}

// This is for GET to /users/:userID, it returns names of all the quizzes of the user
export async function getUserQuizzes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    
    const userID = req.params.userID;

    const names = await quizModel
      .find({
        userID: userID,
      })
      .select({
        quizName: 1,
        isPublic: 1,
      });

    console.log(names);
    

    // res.status(200).json({
    //   message: "Quizzes fetched",
    //   quizNames: names
    // })
    return res.status(200).json({
      message: "Fetched quiz names",
      quizzes: names,
    });
  } catch (err) {
    return next(
      HttpError(
        500,
        "Internal server error while fetching list of user quizzes"
      )
    );
  }
}

// This is used when we want just want to check whether user has been authenticated, especially
// When they reload the page and component gets mounted again

export async function validateNext(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(200).json({
    message: "Authenticated",
  });
}
