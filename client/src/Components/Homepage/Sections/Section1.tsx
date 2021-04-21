import { Image } from "@chakra-ui/image";
import { Box, Center, Flex, Text } from "@chakra-ui/layout";
import * as React from "react";

import boardImage from "../../svgs/Homepage/board.svg";

export interface Section1Props {}

/**
 * Memo is used here, because it doesn't receieve any props
 */

const Section1: React.FC<Section1Props> = React.memo(() => {
  return (
    <Flex
      justify="center"
      wrap="wrap"
      background="rgba(204, 204, 204, 0.4)"
      paddingTop="40px"
      paddingBottom="40px"
    >
      <Center marginRight="40px">
        <Image
          src={boardImage}
          maxWidth={{ base: "350px", md: "400px", "lg": "500px" }}
          maxHeight={{ base: "175px", md: "200px", lg: "350px" }}
        />
      </Center>

      <Box width="500px" marginLeft="40px">
        <Box>
          {/* This is for the bold text at the top of column */}
          <Text fontSize="28px">
            <span
              style={{ fontSize: "32px", fontWeight: 600, marginRight: "10px" }}
            >
              Create
            </span>
            as many quizzes as you like
          </Text>
        </Box>
        <Box>
          {/* This is for the explanatory text */}
          <Text fontSize="22px" marginBottom="24px" >
            You can create multiple types of quizzes, and save all of them on
            the <span style={{ fontWeight: 600 }}>cloud</span> and access them
            at any time.
          </Text>
          <Text fontSize="22px" >
            You can <span style={{ fontWeight: 600 }}>edit </span>quizzes to fix them, and 
            <span style={{ fontWeight: 600 }}> delete </span>unnecessary quizzes
          </Text>
        </Box>
      </Box>
    </Flex>
  );
});

export default Section1;
