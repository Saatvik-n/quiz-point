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
} from "@chakra-ui/react";
import api from "../../API/api";
import { DeleteIcon } from "@chakra-ui/icons";

export interface UserHomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizName: string;
  showQuizID: boolean;
  quizID: string;
  changeShowStatus: () => void;
  takequiz: () => void;
}

interface quizDetailsType  {
  singleQuestionNo: number, 
  multipleQuestionNo: number, 
  flashcardNo: number
}

const UserHomeModal: React.FC<UserHomeModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    quizName,
    quizID,
    showQuizID,
    changeShowStatus,
    takequiz
  } = props;

  const [loading, setLoading] = useState(true);
  const [quizStats, setQuizState] = useState<quizDetailsType>();

  React.useEffect(() => {
    console.log("Quiz ID is", quizID);
    
    api.get(`/api/quiz/quizDetails/${quizID}`)
    .then(res => {
      console.log("Trying to fetch quiz details");
      setQuizState(res.data.numbers)      
      setLoading(false)
    })
    .catch(err => {
      console.log("Error fetching quiz numbers");
      console.log(err);
    })
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="900px">
          <ModalHeader> {quizName} Details </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="space-between" >
            <Text fontSize="2xl" fontWeight="bold">
              Quiz Information
            </Text>
            <Button rightIcon={<DeleteIcon />} colorScheme="red" > Delete Quiz </Button>
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
              <Switch onChange={changeShowStatus} marginLeft="10px" />
            </Box>
            <Box>
              {showQuizID === true ? (
                <InputGroup>
                  <Input disabled value={quizID} />
                  <InputRightElement>
                    <Button h="1.75rem" size="sm">
                      Copy
                    </Button>
                  </InputRightElement>
                </InputGroup>
              ) : null}
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Button colorScheme="yellow" size="lg" >Edit quiz</Button>
            <Button colorScheme="green" size="lg" onClick={takequiz} >Take quiz</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserHomeModal;
