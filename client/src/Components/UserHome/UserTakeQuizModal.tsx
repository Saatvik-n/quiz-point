import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../../API/api';

export interface UserTakeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}
 
const UserTakeQuizModal: React.FC<UserTakeQuizModalProps> = (props) => {

  const {isOpen, onClose} = props

  const [quizID, setQuizID] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const history = useHistory()

  const takeQuiz = () => {
    api.get(`/api/quiz/checkvalid/${quizID}`)
    .then(res => {
      history.push(`/takequiz/${quizID}`)
    })
    .catch(err => {
      console.log(err);
      setErrorMessage(err.response.data.error.message)
    })
  }

  return (  
    <>
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Enter Quiz ID </ModalHeader>
        <ModalBody>
          <Input type="text" value={quizID} onChange={(e) => setQuizID(e.target.value)} />
          <Button marginTop="15px" onClick={takeQuiz} > Take Quiz </Button>
        </ModalBody>
        <ModalFooter justifyContent="left" > 
        {errorMessage}
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
}
 
export default UserTakeQuizModal;