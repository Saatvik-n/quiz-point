import { Image } from "@chakra-ui/image";
import { Flex, Box, Center, Text } from "@chakra-ui/layout";
import * as React from "react";

import shareImage from "../../svgs/Homepage/share.svg";

export interface Section2Props {}

const Section2: React.FC<Section2Props> = () => {
  return (
    <Flex justify="center" wrap="wrap" paddingTop="40px" paddingBottom="40px">
      <Box width="500px" marginRight="40px">
        <Box>
          {/* This is for the bold text at the top of column */}
          <Text fontSize="28px">
            <span
              style={{ fontSize: "32px", fontWeight: 600, marginRight: "10px" }}
            >
              Share
            </span>
            quizzes with others
          </Text>
        </Box>
        <Box>
          {/* This is for the explanatory text */}
          <Text fontSize="22px" marginBottom="24px">
            You can keeps quizzes private, or share any of them you create to
            anyone else in the world by giving them an access code.
          </Text>
          <Text fontSize="22px">
            Any changes made in the quiz will be visible to the person taking
            the quiz, even after you have made it public
          </Text>
        </Box>
      </Box>
      <Center marginLeft="40px">
        <Image
          src={shareImage}
          maxWidth={{ base: "350px", md: "400px", lg: "500px" }}
          maxHeight={{ base: "300px", md: "350px", lg: "425px" }}
        />
      </Center>
    </Flex>
  );
};

export default Section2;
