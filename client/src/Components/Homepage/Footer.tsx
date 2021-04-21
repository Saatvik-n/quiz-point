import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import * as React from "react";

import reactIcon from "../svgs/Homepage/icons/react.svg";
import nodeIcon from "../svgs/Homepage/icons/node.svg";
import chakraIcon from "../svgs/Homepage/icons/chakra.svg";
import githubIcon from "../svgs/Homepage/icons/github.svg";

export interface FooterProps {}

/**
 * Memo is used here, because it doesn't receieve any props
 */

const Footer: React.FC<FooterProps> = React.memo(() => {
  return (
    <Flex
      justifyContent="center"
      background="rgba(204, 204, 204, 0.4)"
      padding="20px 10px"
    >
      <Box marginRight="20px" >
        <Text>
          Made with:
          <Image src={reactIcon} display="inline" margin="0px 10px" />
          <Image src={nodeIcon} display="inline" margin="0px 10px" />
          <Image src={chakraIcon} display="inline" margin="0px 10px" />
        </Text>
      </Box>
      <Box>
        <Text>Code on:
        <Image src={githubIcon} display="inline" margin="0px 10px" />
        </Text>
      </Box>
    </Flex>
  );
});

export default Footer;
