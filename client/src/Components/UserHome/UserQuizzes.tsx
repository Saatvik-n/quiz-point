import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { CSSObject } from "@chakra-ui/styled-system";
import { css } from "@emotion/react";
import * as React from "react";

export interface UserQuizzesProps {
  quizNames: string[];
  lastModifiedDates: string[];
}

const UserQuizzes: React.FC<UserQuizzesProps> = (props) => {
  const { quizNames, lastModifiedDates } = props;

  const cssStyle:CSSObject = {
    backgroundColor: "rgba(0, 131, 122, 0.1)"
  }

  return (
    <>
      <Box marginTop="1rem">
        <Flex
          justifyContent="space-between"
          paddingBottom="10px"
          cursor="pointer"
          borderBottom="1px solid rgba(130,130,130,0.77)"
          _hover={cssStyle}
        >
          <Text> Quiz Name </Text>
          <Text> Last Modified Date </Text>
        </Flex>
      </Box>
    </>
  );
};

export default UserQuizzes;
