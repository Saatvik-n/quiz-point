import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import * as React from "react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  AnswerArray,
  initQADataRowObject,
  QuizData,
  quizQADatarow
} from "../../../Types/QuizTypes";
import { checkMultipleChoiceCorrect, checkSingleOptionCorrect, findCorrectAnswerInSingle, findUserAnswerInSingle, getCorrectAnswersInMultiple, getUserAnswersInMultiple } from "../../../Util/QuizUtilFunctions";

export interface QuizQATableProps {
  quizData: QuizData;
  currentAns: AnswerArray;
  correctFlashAns: boolean[];
}



const giveQuizQAData = (
  quizData: QuizData,
  currentAns: AnswerArray,
  correctFlashAns: boolean[]
):Array<quizQADatarow> => {
  let result = []
  for (let i = 0; i < quizData.length; i++) {
    const question = quizData[i];
    let resObj:quizQADatarow = initQADataRowObject
    resObj["questionText"] = question.questionText
    if (question.type === "Flashcard") {
      resObj["isCorrect"] = correctFlashAns[i]
      resObj["yourAnswer"] = currentAns[i] as string
      resObj["givenAnswer"] = question.flashcardAnswerText!
    }
    else if (question.type === "Single Option") {
      resObj["isCorrect"] = checkSingleOptionCorrect(currentAns[i] as boolean[], question.answerOptions!)
      let userSingleOptionAnswer = findUserAnswerInSingle(currentAns[i] as boolean[], quizData[i].answerOptions!)
      let correctSingleOptionAnswer = findCorrectAnswerInSingle(quizData[i].answerOptions!)
      resObj["yourAnswer"] = userSingleOptionAnswer
      resObj["givenAnswer"] = correctSingleOptionAnswer
    }
    else {
      resObj["isCorrect"] = checkMultipleChoiceCorrect(currentAns[i] as boolean[], question.answerOptions!)
      resObj["yourAnswer"] = getUserAnswersInMultiple(currentAns[i] as boolean[], question.answerOptions!)
      resObj["givenAnswer"] = getCorrectAnswersInMultiple(question.answerOptions!)
    }
    
    result.push({...resObj}) 
  }
  
  return result;

};

/*
This component displays the following data:
* question number, each question, if your answer is correct, 
* user's answer, correct answer
*/
const QuizQATable: React.FC<QuizQATableProps> = (props) => {

  const {quizData, currentAns, correctFlashAns} = props

  return (
    <Table variant="simple" size="lg" w={{ base: "500px", md: "900px" }} >
      <TableCaption>
        Note: Flashcard answers are marked correct based on whether you have
        marked them correct
      </TableCaption>
      <Thead>
        <Tr>
          <Th> Question Number </Th>
          <Th> Question </Th>
          <Th> Correct? </Th>
          <Th> Your Answer </Th>
          <Th> Given Answer </Th>
        </Tr>
      </Thead>
      <Tbody>
        {
          giveQuizQAData(quizData, currentAns, correctFlashAns).map((row, index) => {
            return (
              <Tr>
                <Td> {index} </Td>
                <Td> {row.questionText} </Td>
                <Td> {row.isCorrect ? (<CheckIcon />) : (<CloseIcon />)} </Td>
                <Td> {row.yourAnswer} </Td>
                <Td> {row.givenAnswer} </Td>
              </Tr>
            )
          })
        }
      </Tbody>
    </Table>
  );
};

export default QuizQATable;
