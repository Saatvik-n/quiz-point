import {
  Box,
  Flex,
  useMediaQuery,
  Image,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../API/api";
import CurrentUserContext from "../../Contexts/GlobalContexts/UserContext";
import burgerIcon from "../svgs/Homepage/burger.svg";

export interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMobile] = useMediaQuery("(max-width: 1000px)"); // used to check if user is in a smaller device
  const [isClicked, setIsClicked] = useState(false);

  const history = useHistory();

  const { currentUserState, currentUserDispatch } = React.useContext(
    CurrentUserContext
  );

  const handleClick = () => {
    let curVal = isClicked;
    setIsClicked(!curVal);
  };

  const handleLogout = () => {
    api
      .get("/api/logout")
      .then((res) => {
        currentUserDispatch({
          type: "clearUser",
        });
        setIsClicked(false)
        history.push("/");
      })
      .catch((err) => {
        console.log("Problem logging out");
        console.log(err);
      });
    
  };

  const handleLogin = () => {
    setIsClicked(false)
    history.push("/login");
  };

  React.useEffect(() => {
    api.get(`/api/validate`)
    .then(res => {
      currentUserDispatch({
        type: "changeUser", 
        payload: {
          userID: res.data.userID, 
          name: res.data.username, 
          username: res.data.username
        }
      })
    })
    .catch(err => {
    })
  }, [])

  if (isMobile) {
    // This is only returned if device width <= 1000
    return (
      <>
        <Flex
          justifyContent="space-between"
          padding={4}
          paddingBottom={8}
          borderBottomColor="lightgray"
          borderBottomWidth="2px"
          position="fixed" // Always stays on top of the screen
          backgroundColor="white"
          width="100%"
          zIndex={5} // It is always in front of any other element
        >
          <Box>
            <Text fontSize="2xl"> Quiz Point</Text>
          </Box>

          <Image src={burgerIcon} onClick={handleClick} />
        </Flex>
        {isClicked ? ( // Display only if user has clicked the hamburger icon
          <VStack
            position="fixed"
            width="100%"
            marginTop="85px"
            spacing={5}
            zIndex={5}
            backgroundColor="white"
          >
            {/* Padding top is so that the menu can take up space  */}
            {/* Vertical stack for links */}
            <Box
              borderBottom="2px solid #cccccc"
              width="100%"
              textAlign="center"
              padding="10px 0px"
            >
              <Text as="a" href="/#/" onClick={() => setIsClicked(false)} >
                Home
              </Text>
            </Box>
            <Box
              borderBottom="2px solid #cccccc"
              width="100%"
              textAlign="center"
              paddingBottom={2}
            >
              <Text
                cursor="pointer"
                onClick={
                  currentUserState.userID !== "" ? handleLogout : handleLogin
                }
              >
                {currentUserState.userID !== "" ? "Log out" : "Sign In"}
              </Text>
            </Box>
          </VStack>
        ) : null}
      </>
    );
  }

  return (
    // Displayed when user's screen with is > 1000 px
    <Flex
      justifyContent="space-around"
      padding={4}
      paddingBottom={6}
      borderBottomColor="lightgray"
      borderBottomWidth="2px"
      position="fixed"
      top={0}
      w="100%"
      zIndex={5}
      backgroundColor="white"
      alignItems="center"
    >
      {/* 2 main sections - logo and links */}
      <Box>
        <Text fontSize="3xl"> Quiz Point</Text>
      </Box>
      <HStack spacing={6}>
        <Box>
          <Text fontSize="1xl" as={"a"} href="/#/">
            {" "}
            Home{" "}
          </Text>
        </Box>
        <Box>
          <Text
            cursor="pointer"
            onClick={
              currentUserState.userID !== "" ? handleLogout : handleLogin
            }
          >
            {currentUserState.userID !== "" ? "Log out" : "Sign In"}
          </Text>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Navbar;
