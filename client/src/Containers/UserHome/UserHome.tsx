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
import CurrentUserContext from "../../Contexts/GlobalContexts/UserContext";
import { getQuizInfo } from "../../Util/QuizUtilFunctions";

export interface UserHomeProps {}

const UserHome: React.FC<UserHomeProps> = () => {
  const [userQuizNames, setUserQuizNames] = useState<string[]>();
  const [userQuizIDs, setUserQuizIDs] = useState<string[]>();

  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [selectedQuizID, setSelectedQuizID] = useState("");

  const [showQuizID, setShowQuizID] = useState(false);

  const [loading, setLoading] = useState(true);

  const { currentUserState, currentUserDispatch } = React.useContext(
    CurrentUserContext
  );

  const { onClose, onOpen, isOpen } = useDisclosure();

  const history = useHistory();

  const handleQuizClick = () => {
    onOpen();
  };

  const changeShowStatus = () => {
    setShowQuizID((old) => !old);
    console.log("New quiz id status is");
    console.log(showQuizID);
  };

  const selectQuiz = (index: number) => {
    setSelectedQuiz(userQuizNames![index]);
    setSelectedQuizID(userQuizIDs![index]);
    console.log("Selected quiz is");
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

  useEffect(() => {
    api
      .get("/api/validate")
      .then((res) => {
        console.log(res.data);
        return api
          .get(`/api/user/${res.data.userID}`)
          .then((res) => {
            const quizResultObject = getQuizInfo(res.data.quizzes);

            setUserQuizIDs(quizResultObject.quizIDs);
            setUserQuizNames(quizResultObject.quizNames);

            console.log("Quiz names are");
            console.log(userQuizNames);
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error in fetching quizzes");
          });
      })
      .catch((err) => {
        history.push("/");
      });
  }, []);

  return (
    <>
      <Box h="7rem" />
      {isOpen === true ? (
        <UserHomeModal
          onClose={onClose}
          isOpen={isOpen}
          quizName={selectedQuiz}
          quizID={selectedQuizID}
          showQuizID={showQuizID}
          changeShowStatus={changeShowStatus}
          takequiz={takeQuiz}
        />
      ) : null}
      <Container maxW="container.lg" marginTop={4}>
        <Text fontSize="4xl"> Welcome User </Text>
        <Flex justifyContent="space-between" marginTop="1rem">
          <Text fontSize="3xl"> Your Quizzes: </Text>
          <HStack>
            <Button
              rightIcon={<ArrowRightIcon />}
              size="lg"
              colorScheme="blue"
              variant="outline"
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
