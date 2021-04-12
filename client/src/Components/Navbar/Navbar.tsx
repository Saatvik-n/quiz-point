import { Box, Flex, useMediaQuery, Image, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { useState } from "react";

export interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  const [isMobile] = useMediaQuery("(max-width: 1000px)"); // used to check if user is in a smaller device
  const [isClicked, setIsClicked] = useState(false);

  const links = [
    "Services",
    "Products",
    "Technology",
    "About",
    "Client",
    "Partner",
  ];

  const handleClick = () => {
    let curVal = isClicked;
    setIsClicked(!curVal);
  };

  if (isMobile) {                       // This is only returned if device width <= 1000
    return (
      <>
        <Flex
          justifyContent="space-between"
          padding={4}
          paddingBottom={8}
          borderBottomColor="lightgray"
          borderBottomWidth="2px"
          position="fixed"              // Always stays on top of the screen
          backgroundColor="white"
          width="100%"                  
          zIndex={5}                    // It is always in front of any other element 
        >
          <Box>
            <Image src={logo} />        {/* DSI logo */}
          </Box>

          <Image src={burgerIcon}
          onClick={handleClick} />
        </Flex>
        {isClicked ? (                  // Display only if user has clicked the hamburger icon
          <VStack paddingTop="90px" spacing={0}>      {/* Vertical stack for links */}
            {links.map((linkName, id) => {
              return (
                <Box
                  key={id}
                  backgroundColor="#F6F6F6"
                  w="100%"
                  textAlign="center"
                  paddingTop={4} paddingBottom={4}
                  borderBottomColor="lightgray"
                  borderBottomWidth="1px"
                >
                  <Text margin={0}  fontSize="lg">
                    {linkName}
                  </Text>
                </Box>
              );
            })}
          </VStack>
        ) : null}
      </>
    );
  }

  return (      // Displayed when user's screen with is > 1000 px
    <Flex
      justifyContent="space-around"
      padding={4}
      paddingBottom={8}
      borderBottomColor="lightgray"
      borderBottomWidth="2px"
      position="fixed"
      top={0}
      w="100%"
      zIndex={5}
      backgroundColor="white"
    >
      {
        /*
        3 main sections - Logo, Links, Icons
        */
      }
      <HStack>
        <Box>
          <Image src={logo} />
        </Box>
      </HStack>
      <HStack spacing={50}>
        {links.map((linkName, id) => {
          return (
            <Box key={id}>
              <Text paddingTop={4} fontSize="md">
                {linkName}{" "}
              </Text>
            </Box>
          );
        })}
      </HStack>
      <HStack spacing={6} >
        <Image src={homeIcon}
        cursor="pointer" />
        <Image src={mailIcon}
        cursor="pointer" />
        <Image src={shuffleIcon}
        cursor="pointer" />
      </HStack>
    </Flex>
  );
}
 
export default Navbar;