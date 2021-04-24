import { NextFunction, Request, Response } from "express";
import HttpError from "http-errors";
import { mongoose } from "@typegoose/typegoose";
import { quizModel } from "../Models/QuizModel";

export async function getQuiz(req: Request, res: Response, next: NextFunction) {
  try {
    const quizID = req.params.quizID;
    const quiz = await quizModel.findById(quizID);
    
    if (quiz === null) {
      return next(HttpError(404, "Quiz Not Found"))
    }

    return res.status(200).json({
      message: "Fetched quiz successfully",
      quiz: quiz,
    });
  } catch (error) {
    return next(HttpError(500, "Error fetching quiz"));
  }
}

export async function checkQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const quizID = req.params.quizID;

    // This function is used because mongoose will throw an error if you try to pass a string which is not a valid object id
    if (!mongoose.isValidObjectId(quizID)) {
      return next(HttpError(404, "Quiz ID Not Valid"));
    }

    const quiz = await quizModel.findById(quizID).exec();
    if (quiz === null) {
      return next(HttpError(404, "Quiz Not found"));
    }
    if (quiz.isPublic !== true) {
      return next(HttpError(404, "Quiz is not Public"));
    }
    return res.status(200).json({
      quizID: quiz.id.toString(),
      quizName: quiz.quizName,
    });
  } catch (error) {
    return next(
      HttpError(500, "Internal server error while checking quiz validity")
    );
  }
}

export async function createNewQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const quizName = req.body.quizName;
    const quizData = req.body.quizData;
    const userID = req.body.userID;

    console.log(quizData);

    // All of these fields are in the quiz document

    let newQuiz = await quizModel.create({
      userID: userID,
      quizData: quizData,
      quizName: quizName,
      isPublic: false,
    });

    await newQuiz.save();

    return res.status(200).json({
      message: "New Quiz Created Successfully",
      quizID: newQuiz._id.toString(),
    });
  } catch (error) {
    console.log(error);

    return next(HttpError(500, "Error creating quiz"));
  }
}

// This is to delete the quiz, it is in the form of DELETE, at /quiz/:quizid
export async function deleteQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const quizID = req.params.quizID;

    await quizModel.findByIdAndDelete(quizID);

    return res.status(200).json({
      message: "Successfully deleted quiz",
    });
  } catch (error) {
    return next(HttpError(500, "Error deleting quiz"));
  }
}

// This is to replace the quiz, it is in the form of PUT, at /quiz/:quizid
export async function replaceQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const quizID = req.params.quizID;
    const quizName = req.body.quizName;
    const quizData = req.body.quizData;
    const userID = req.body.userID;

    await quizModel.findByIdAndUpdate(quizID, {
      quizName: quizName,
      userID: userID,
      quizData: quizData,
    });

    return res.status(200).json({
      message: "Quiz updated",
    });
  } catch (error) {
    return next(HttpError(500, "Error deleting quiz"));
  }
}

export async function toggleQuizPublic(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const quizID = req.params.quizID;

    const quiz = await quizModel.findById(quizID);

    if (!quiz) {
      return next(HttpError(404, "Quiz Not Found"));
    }
    const currentStatus = quiz.isPublic;

    await quizModel.findByIdAndUpdate(quizID, {
      isPublic: !currentStatus,
    });

    res.status(200).json({
      message: "Quiz status changed ",
    });
  } catch (error) {
    return next(HttpError(500, "Error toggling quiz public"));
  }
}

export async function getQuizDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const quizID = req.params.quizID;
    console.log("Quiz id is: ", quizID);

    const quiz = await quizModel.findById(quizID).exec();

    if (quiz === undefined || quiz === null) {
      return next(HttpError(404, "Could not find quiz"));
    }

    let singleQuestionNo = 0;
    let multipleQuestionNo = 0;
    let flashcardNo = 0;

    for (let i = 0; i < quiz.quizData.length; i++) {
      const question = quiz.quizData[i];
      switch (question.type) {
        case "Single Option":
          singleQuestionNo++;
          break;
        case "Multiple Option":
          multipleQuestionNo++;
          break;

        case "Flashcard":
          flashcardNo++;
        default:
          break;
      }
    }

    return res.status(200).json({
      message: "Quiz data fetched successfully",
      numbers: {
        singleQuestionNo,
        multipleQuestionNo,
        flashcardNo,
      },
    });
  } catch (error) {
    console.log("Error fetching quiz numbers");
    return next(HttpError(500, "Error fetching quiz numbers"));
  }
}
