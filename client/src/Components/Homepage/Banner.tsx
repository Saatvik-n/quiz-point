import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import * as React from "react";

import bannerImage from "../svgs/Homepage/banner.svg"

export interface BannerProps {
  onOpen: () => void;
}

const Banner: React.FC<BannerProps> = (props) => {
  return (
    <>
      <Box height="7rem"></Box>
      <Flex
        justify="center"
        flexDirection={{ base: "row-reverse", xl: "row" }}
        margin={10}

        wrap={{ base: "wrap-reverse", "2xl": "wrap" }}
      >
        <Box maxWidth={{ base: "100%", xl: "600px" }}
        marginRight={{base: "0em", xl:"3em"}}
        textAlign={{base: "center", xl: "inherit"}}
        paddingBottom={{base: "20px", xl:"40px"}} >
          <Text fontSize={{ base: "5xl", md:"5xl", xl: "6xl" }} fontWeight="600">
            Create, edit, share, and practice quizzess for free
          </Text>
          <Button 
          marginTop="20px"
          colorScheme="blue"
          size="lg"
          onClick={props.onOpen} > Get started </Button>
        </Box>
        <Box>
          <Image src={bannerImage} 
          maxWidth={{base: "400px", md: "400px", lg: "500px"}}
          maxHeight={{base: "200px", md: "200px", lg: "300px"}} />
        </Box>
      </Flex>
    </>
  );
};

export default Banner;
