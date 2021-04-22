import { Box,  Text, VStack } from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import * as React from "react";

import { CheckCircleIcon, QuestionIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/button";

export interface FlashcardOptionProps {
  stringVal: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isCorrect: boolean;
  handleFlashcardButton: () => void;
  shownAns: boolean;
  handleFlashcardShow: () => void;
  answerText: string;
}

const FlashcardOption: React.FC<FlashcardOptionProps> = (props) => {
  const {
    stringVal,
    handleTextChange,
    isCorrect,
    handleFlashcardButton,
    shownAns,
    handleFlashcardShow,
    answerText
  } = props;

  return (
    <Box>
      <Textarea
        size="sm"
        isRequired
        fontSize="2xl"
        value={stringVal}
        onChange={(e) => handleTextChange(e)}
      />
      <VStack>
        <Text display={shownAns ? "none" : "inherit"} > Show answer </Text>
        <IconButton
          aria-label="Show flashcard answer"
          w={16}
          h={14}
          icon={<QuestionIcon w={8} h={8} />}
          display={shownAns ? "none" : "inherit"}
          onClick={handleFlashcardShow}
        />
        {shownAns ? (
          <>
            <Text>Mark if answer is correct</Text>
            <Textarea value={answerText} fontSize="2xl"
            disabled />
            <IconButton
              aria-label="Is correct?"
              colorScheme={isCorrect ? "green" : undefined}
              w={16}
              h={14}
              onClick={handleFlashcardButton}
              icon={<CheckCircleIcon w={8} h={8} />}
            />{" "}
          </>
        ) : null}
      </VStack>
    </Box>
  );
};

export default FlashcardOption;
