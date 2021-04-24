import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Box, Center, Container, Flex, HStack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import React, {useEffect} from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import api from "../../API/api";
import UserHomeModal from "../../Components/UserHome/UserHomeModal";
import UserQuizzes from "../../Components/UserHome/UserQuizzes";
import UserTakeQuizModal from "../../Components/UserHome/UserTakeQuizModal";
import CurrentUserContext from "../../Contexts/GlobalContexts/UserContext";
import { getQuizInfo } from "../../Util/QuizUtilFunctions";

export interface UserHomeProps {}

const UserHome: React.FC<UserHomeProps> = () => {
  const [userQuizNames, setUserQuizNames] = useState<string[]>();
  const [userQuizIDs, setUserQuizIDs] = useState<string[]>();
  const [publicQuizzes, setPublicQuizzes] = useState<boolean[]>()
  const [disabledQuizzes, setDisabledQuizzes] = useState<boolean[]>()

  const [name, setName] = useState("")

  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedQuizID, setSelectedQuizID] = useState("");

  const [loading, setLoading] = useState(true);

  const { onClose, onOpen, isOpen } = useDisclosure();

  const [takeQuizModalOpen, setTakeQuizModalOpen] = useState(false)

  const { currentUserState, currentUserDispatch } = React.useContext(
    CurrentUserContext
  );


  const history = useHistory();

  const handleQuizClick = () => {
    onOpen();
  };

  const handleTakeQuizClick = () => {
    setTakeQuizModalOpen(old => !old)
  }

  const selectQuiz = (index: number) => {
    setSelectedQuiz(userQuizNames![index]);
    setSelectedQuizID(userQuizIDs![index]);
  };

  const createQuiz = () => {
    history.push("/createquiz");
  };

  const takeQuiz = () => {
    if (selectedQuizID === "") {
      return 
    }
    history.push({
      pathname: `/takequiz/${selectedQuizID}`, 
      state: {
        quizID: selectedQuizID
      }
    })
  }

  const deleteQuiz = () => {
    if (selectedQuizID === "") {
      return 
    }
    api.delete(`/api/quiz/${selectedQuizID}`)
    .then(res => {
      window.location.reload()
    })
    .catch(err => {
      console.log("Error in deleting quiz");
    })
  }

  const editQuiz = () => {
    if (selectedQuizID === "") {
      return 
    }
    history.push(`/editquiz/${selectedQuizID}`)
  }

  const changePublicStatus = () => {
    const index = userQuizIDs!.indexOf(selectedQuizID)
    console.log("Selected quiz ID is", selectedQuizID);
    

    // Set the value at this index to disabled, set the isPublic to true, and PATCH it later
    let disabledCopy = [...disabledQuizzes!]
    disabledCopy[index] = !(disabledQuizzes![index])
    console.log("Disabled copy is");
    console.log(disabledCopy);
    
    
    setDisabledQuizzes(disabledCopy)

    let publicCopy = [...publicQuizzes!]
    publicCopy[index] = !(publicQuizzes![index])
    setPublicQuizzes(publicCopy)

    api.patch(`/api/quiz/togglepub/${selectedQuizID}`)
    .then(res => {
    })
    .catch(err => {
      console.log("Error when trying to PATCH")
    })
  }

  

  /**
   * 1st - check if the user's JWT token has expired, if it has then redirect them to home 
   * after clearing the user context 
   * 2nd - load the list of user's quizzes
   */
  useEffect(() => {
    api
      .get("/api/validate")
      .then((res) => {
        setName(res.data.name)
        return api
          .get(`/api/user/${res.data.userID}`)
          .then((res) => {
            console.log("Data when reloading page is");
            
            console.log(res.data);
            
            const quizResultObject = getQuizInfo(res.data.quizzes);
            const falseArray = new Array(res.data.quizzes.length).fill(false)
            setUserQuizIDs(quizResultObject.quizIDs);
            setUserQuizNames(quizResultObject.quizNames);
            setPublicQuizzes(quizResultObject.isPublicList)
            setDisabledQuizzes(falseArray)
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error in fetching quizzes");
          });
      })
      .catch((err) => {
        currentUserDispatch({
          type: "clearUser"
        })
        history.push("/");
      });
  }, []);

  return (
    <>
      <Box h="7rem" />
      {
        takeQuizModalOpen === true ? (
          <UserTakeQuizModal
          isOpen={takeQuizModalOpen}
          onClose={handleTakeQuizClick}
          />
        ) : null
      }
      {isOpen === true ? (
        <UserHomeModal
          onClose={onClose}
          isOpen={isOpen}
          quizName={selectedQuiz}
          quizID={selectedQuizID}
          isPublic={publicQuizzes![userQuizIDs!.indexOf(selectedQuizID)]}
          changePublicStatus={changePublicStatus}
          takequiz={takeQuiz}
          deleteQuiz={deleteQuiz}
          editQuiz={editQuiz}
          isDisabled={disabledQuizzes![userQuizIDs!.indexOf(selectedQuizID)]}
        />
      ) : null}
      <Container maxW="container.lg" marginTop={4}>
        <Text fontSize="4xl"> Welcome {name} </Text>
        <Flex justifyContent="space-between" marginTop="1rem">
          <Text fontSize="3xl"> Your Quizzes: </Text>
          <HStack>
            <Button
              rightIcon={<ArrowRightIcon />}
              size="lg"
              colorScheme="blue"
              variant="outline"
              onClick={handleTakeQuizClick}
            >
              Take a quiz
            </Button>
            <Button
              rightIcon={<AddIcon />}
              variant="outline"
              colorScheme="cyan"
              size="lg"
              onClick={createQuiz}
            >
              Create New Quiz
            </Button>
          </HStack>
        </Flex>
        {loading === true ? (
          <Center>
            <Spinner size="lg" textAlign="center" />
          </Center>
        ) : (
          <UserQuizzes
            showModal={handleQuizClick}
            quizNames={userQuizNames!}
            selectQuiz={selectQuiz}
          />
        )}
      </Container>
    </>
  );
};

export default UserHome;
