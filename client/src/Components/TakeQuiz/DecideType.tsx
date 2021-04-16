// This component takes the quiz type as a prop, and returns the appropriate option type (checkbox, radio, or flash)
import * as React from "react";
import { questionTypes, singleOption } from "../../Types/QuizInterface";
import CheckboxOptions from "./OptionTypes/CheckboxOptions";
import FlashcardOption from "./OptionTypes/FlashcardOption";
import SingleOption from "./OptionTypes/SingleOption";

export interface DecideTypeProps {
  answerTexts: Array<singleOption>;
  quizType: questionTypes;
  currentArray?: Array<boolean>;
  handleClick: (n: number) => void;
  stringVal?: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  correctFlashAns: boolean;
  handleFlashcardButton: () => void;
  shownAns: boolean;
  handleFlashcardShow: () => void;
  answerText: string;
}

const DecideType: React.FC<DecideTypeProps> = (props) => {
  const {
    quizType,
    answerTexts,
    currentArray,
    handleClick,
    stringVal,
    handleTextChange,
    correctFlashAns,
    handleFlashcardButton,
    shownAns,
    handleFlashcardShow,
    answerText
  } = props;

  if (quizType === "single option") {
    return (
      <SingleOption
        handleClick={handleClick}
        checkedArray={currentArray!}
        answerTexts={answerTexts}
      />
    );
  }

  if (quizType === "multiple choice") {
    return (
      <CheckboxOptions
        handleClick={handleClick}
        checkedArray={currentArray!}
        answerTexts={answerTexts}
      />
    );
  }

  return (
    <FlashcardOption
      stringVal={stringVal!}
      handleTextChange={handleTextChange}
      isCorrect={correctFlashAns}
      handleFlashcardButton={handleFlashcardButton}
      shownAns={shownAns}
      handleFlashcardShow={handleFlashcardShow}
      answerText={answerText}
    />
  );
};

export default DecideType;
