import { Image } from "@chakra-ui/react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import * as React from "react";

import reactIcon from "../svgs/Homepage/icons/react.svg";
import nodeIcon from "../svgs/Homepage/icons/node.svg";
import chakraIcon from "../svgs/Homepage/icons/chakra.svg";
import githubIcon from "../svgs/Homepage/icons/github.svg";

export interface FooterProps { }

/**
 * Memo is used here, because it doesn't receieve any props
 */

const Footer: React.FC<FooterProps> = React.memo(() => {
  return (
    <Flex
      justifyContent="center"
      background="rgba(204, 204, 204, 0.4)"
      padding="20px 10px"
      wrap="wrap"
    >
      <Box marginRight="20px" marginBottom={{ base: "10px", sm: "0px" }} >
        <Text>
          Made with:
          <Link href="https://reactjs.org/" isExternal >
            <Image src={reactIcon} display="inline" margin="0px 10px" />
          </Link>
          <Link href="https://nodejs.org/en/" isExternal >
            <Image src={nodeIcon} display="inline" margin="0px 10px" />
          </Link>
          <Link href="https://chakra-ui.com/" isExternal >
            <Image src={chakraIcon} display="inline" margin="0px 10px" />
          </Link>
        </Text>
      </Box>
      <Box>
        <Text>Code on:
          <Link href="https://github.com/Saatvik-n/quiz-point" isExternal >
            <Image src={githubIcon} display="inline" margin="0px 10px" />
          </Link>
        </Text>
      </Box>
    </Flex>
  );
});

export default Footer;
