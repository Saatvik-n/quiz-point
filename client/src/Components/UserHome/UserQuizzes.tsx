import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import { CSSObject } from "@chakra-ui/styled-system";
import * as React from "react";

export interface UserQuizzesProps {
  quizNames: string[];
  showModal: () => void;
  selectQuiz: (i:number) => void;
}

const UserQuizzes: React.FC<UserQuizzesProps> = (props) => {
  const { quizNames,  showModal, selectQuiz } = props;

  const cssStyle: CSSObject = {
    backgroundColor: "rgba(13, 11, 11, 0.07)",
  };

  if (quizNames.length === 0) {
    return (
      <Center marginTop="24px" >
        <Text fontSize="2xl" > You have not created any quizzes </Text>
      </Center>
    )
  }

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
            </Flex>
          );
        })}
      </Box>
    </>
  );
};

export default UserQuizzes;
