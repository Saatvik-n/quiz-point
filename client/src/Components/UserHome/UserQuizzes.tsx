import { Box, Flex, Text } from "@chakra-ui/layout";
import { CSSObject } from "@chakra-ui/styled-system";
import * as React from "react";

export interface UserQuizzesProps {
  quizNames: string[];
  lastModifiedDates: string[];
  showModal: () => void;
  selectQuiz: (i:number) => void;
}

const UserQuizzes: React.FC<UserQuizzesProps> = (props) => {
  const { quizNames, lastModifiedDates, showModal, selectQuiz } = props;

  const cssStyle: CSSObject = {
    backgroundColor: "rgba(13, 11, 11, 0.07)",
  };

  return (
    <>
      <Box marginTop="1rem">
        {quizNames.map((quizName, index) => {
          return (
            <Flex
            key={quizName}
              justifyContent="space-between"
              paddingBottom="10px"
              cursor="pointer"
              borderBottom="1px solid rgba(130,130,130,0.77)"
              _hover={cssStyle}
              padding="10px"
              onClick={() => {
                selectQuiz(index)
                showModal()
              }}
            >
              <Text> {quizName} </Text>
              <Text> {lastModifiedDates[index]} </Text>
            </Flex>
          );
        })}
      </Box>
    </>
  );
};

export default UserQuizzes;
