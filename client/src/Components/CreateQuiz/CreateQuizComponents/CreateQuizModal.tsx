import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react"
export interface CreateQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalMessage: string;
}
 
const CreateQuizModal: React.FC<CreateQuizModalProps> = (props) => {

  const {isOpen, onClose,modalMessage } = props

  return (  
    <>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Error </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="20px" >
            {modalMessage}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose} > Close </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
 
export default CreateQuizModal;