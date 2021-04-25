import * as React from "react";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Switch,
  InputGroup,
  Input,
  InputRightElement,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Text,
  Spinner,
  Center,
  IconButton,
  Flex,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import api from "../../API/api";
import { DeleteIcon } from "@chakra-ui/icons";

export interface UserHomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizName: string;
  isPublic: boolean;
  quizID: string;
  takequiz: () => void;
  deleteQuiz: () => void;
  isDisabled: boolean;
  editQuiz: () => void;
  changePublicStatus: () => void;
}

interface quizDetailsType {
  singleQuestionNo: number;
  multipleQuestionNo: number;
  flashcardNo: number;
}

const UserHomeModal: React.FC<UserHomeModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    quizName,
    quizID,
    changePublicStatus,
    takequiz,
    deleteQuiz,
    isDisabled,
    editQuiz,
    isPublic,
  } = props;

  const [loading, setLoading] = useState(true);
  const [quizStats, setQuizState] = useState<quizDetailsType>();

  const [isWideEnough] = useMediaQuery("(min-width: 700px)");

  const toast = useToast();

  React.useEffect(() => {
    console.log("Quiz ID is", quizID);

    api
      .get(`/api/quiz/quizDetails/${quizID}`)
      .then((res) => {
        console.log("Trying to fetch quiz details");
        setQuizState(res.data.numbers);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching quiz numbers");
        console.log(err);
      });
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="900px">
          <ModalHeader> {quizName} Details </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="space-between">
              <Text fontSize="2xl" fontWeight={{ base: "normal", md: "bold" }}>
                Quiz Information
              </Text>
              {isWideEnough === true ? (
                <Button
                  rightIcon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={deleteQuiz}
                >
                  Delete Quiz{" "}
                </Button>
              ) : (
                <IconButton aria-label="delete quiz" icon={<DeleteIcon />} onClick={deleteQuiz} />
              )}
            </Flex>
            {loading === true ? (
              <Center>
                <Spinner size="lg" />
              </Center>
            ) : (
              <Table maxW="80%">
                <Thead>
                  <Tr>
                    <Th> Question Type </Th>
                    <Th> Number of questions </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td> Single Option </Td>
                    <Td> {quizStats?.singleQuestionNo} </Td>
                  </Tr>
                  <Tr>
                    <Td> Multiple Option </Td>
                    <Td> {quizStats?.multipleQuestionNo} </Td>
                  </Tr>
                  <Tr>
                    <Td> Flashcard </Td>
                    <Td> {quizStats?.flashcardNo} </Td>
                  </Tr>
                </Tbody>
              </Table>
            )}
            <Box marginTop="20px">
              <span> Make quiz public? </span>{" "}
              <Switch
                onChange={changePublicStatus}
                isChecked={isPublic}
                isDisabled={isDisabled}
                marginLeft="10px"
              />
            </Box>
            <Box>
              {isPublic === true ? (
                <InputGroup>
                  <Input disabled value={quizID} />
                  <InputRightElement>
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Quiz ID copied",
                          status: "success",
                          duration: 1000,
                          isClosable: true,
                        });
                        navigator.clipboard.writeText(quizID);
                      }}
                    >
                      Copy
                    </Button>
                  </InputRightElement>
                </InputGroup>
              ) : null}
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button colorScheme="yellow" size="lg" onClick={editQuiz}>
              Edit quiz
            </Button>
            <Button colorScheme="green" size="lg" onClick={takequiz}>
              Take quiz
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserHomeModal;
