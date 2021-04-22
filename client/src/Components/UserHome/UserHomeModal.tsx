import * as React from "react";
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
  InputRightElement
} from "@chakra-ui/react";

export interface UserHomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizName: string;
  showQuizID: boolean;
  quizID: string;
  changeShowStatus: () => void;
}

const UserHomeModal: React.FC<UserHomeModalProps> = (props) => {
  const { isOpen, onClose, quizName, quizID, showQuizID, changeShowStatus } = props;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="600px">
          <ModalHeader> {quizName} Details </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Table here with information about quiz question details
            <Box marginTop="20px">
              <span> Make quiz public? </span> <Switch onChange
              ={changeShowStatus} marginLeft="10px" />
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
          <ModalFooter justifyContent="space-between" >
              <Button colorScheme="green" >
                Take quiz 
              </Button>
              <Button colorScheme="yellow" >
                Edit Quiz 
              </Button>
            <Button colorScheme="red" >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserHomeModal;
