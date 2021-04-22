import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";

export interface HomepageModalProps {
  isOpen: boolean;
  onClose: () => void;
  sign: () => void;
  quizID: string;
  quizRedirect: () => void;
  handleQuizIDChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  takeSampleQuiz: () => void;
}

const HomepageModal: React.FC<HomepageModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    sign,
    quizID,
    quizRedirect,
    handleQuizIDChange,
    takeSampleQuiz
  } = props;

  const [chooseQuiz, setChooseQuiz] = useState(false); // This determines whether the modal should display the input for user to enter quiz id

  /*
On closing the modl, we do 2 things:
* Set chooseQuiz back to false - because the default state won't be false, since this component technically won't be unmounted at all
* Close the modal - onClose()
*/
  const handleClose = () => {
    setChooseQuiz(false);
    onClose();
  };



  if (chooseQuiz) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Enter a quiz ID </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              value={quizID}
              onChange={(e) => handleQuizIDChange(e)}
            />
            <Button margin="10px 0px"> Go to Quiz </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Choose an option </ModalHeader>
        <ModalBody>
          <Button margin="10px 0px" onClick={sign}>
            {" "}
            Sign in / Sign Up{" "}
          </Button>
          <br />
          <Button margin="10px 0px" onClick={() => setChooseQuiz(true)}>
            {" "}
            Take quiz with quiz ID{" "}
          </Button>
          <br />
          <Button margin="10px 0px" onClick={takeSampleQuiz} > Take Sample Quiz </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default HomepageModal;
