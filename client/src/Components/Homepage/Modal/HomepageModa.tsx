import { Button } from '@chakra-ui/button';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import * as React from 'react';

export interface HomepageModalProps {
  isOpen: boolean;
  onClose: () => void;
}
 
const HomepageModal: React.FC<HomepageModalProps> = (props) => {
  return (  
    <Modal isOpen={props.isOpen} onClose={props.onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Choose an option </ModalHeader>
        <ModalBody>
          <Button margin="10px 0px" > Sign in / Sign Up </Button>
          <br/>
          <Button margin="10px 0px" > Take quiz with quiz ID </Button>
          <br/>
          <Button margin="10px 0px" > Take Sample Quiz </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
 
export default HomepageModal;