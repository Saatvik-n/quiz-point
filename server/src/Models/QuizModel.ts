import { prop, Ref, getModelForClass, mongoose } from "@typegoose/typegoose";

import { QuestionType } from "../Types/QuizTypes";

class SingleOption {
  @prop({required: true})
  public answerText!:string

  @prop({required: true})
  public isCorrect!:boolean;
}

class SingleQuestion {
  @prop({required: true})
  public questionText!: string;

  @prop({required: true})
  public questionType!: QuestionType

  @prop({type: () => SingleOption, required: false, _id: false})
  public answerOptions?: SingleQuestion[]

  @prop({required: false})
  public flashcardAnswerText?: string
}

class Quiz {
  @prop({required: true})
  public quizName!: string

  @prop({required: true})
  public userID!: string

  @prop({type: () => SingleQuestion, required: true, _id: false})
  public quizData!: string;

  @prop({required: true})
  public isPublic!: boolean;
}

export const quizModel = getModelForClass(Quiz, {
  schemaOptions: {
    collection: "quizzes"
  }
})