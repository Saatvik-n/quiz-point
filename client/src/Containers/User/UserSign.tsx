import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Container } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../API/api";
import LoginFormComponent from "../../Components/User/LoginFormComponent";
import RegisterFormComponent from "../../Components/User/RegisterFormComponent";
import CurrentUserContext from "../../Contexts/GlobalContexts/UserContext";

export interface UserSignProps {
  isLogin: boolean;
}

const UserSign: React.FC<UserSignProps> = (props) => {
  const { isLogin } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const [errorMessage, setErrorMessage] = useState("")

  const { currentUserDispatch } = useContext(CurrentUserContext)

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
  };

  const loginUser = () => {
    console.log("Login user called");
    setIsLoading(true)

    api.post("/api/login", {
      username: username,
      password: password
    })
      .then(res => {
        currentUserDispatch({
          type: "changeUser",
          payload: {
            userID: res.data.userID,
            username: res.data.username,
            name: res.data.name
          }
        })
        navigate('/user')
      })
      .catch(err => {
        console.log("Error logging in user");
        setErrorMessage(err.response.data.error.message)
        setIsLoading(false)
        onOpen()
      })
  }

  const registerUser = () => {
    console.log("Register user called");
    setIsLoading(true)

    api.post("/api/register", {
      username: username,
      password: password,
      name: name
    })
      .then(res => {
        navigate('/login')
        setUsername("")
        setPassword("")
        setName("")
        setIsLoading(false)
      })
      .catch(err => {
        console.log("Error registering user");
        setErrorMessage(err.response.data.error.message)
        setIsLoading(false)
        onOpen()
      })
  }

  const ModalComponent = () => (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Error </ModalHeader>
        <ModalBody>
          {errorMessage}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose} > Close </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )

  if (isLogin) {
    return (
      <>
        <ModalComponent />
        <Container>
          <Box height="7rem"></Box>
          <LoginFormComponent
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            onLoginClick={loginUser}
            isLoading={isLoading}
          />
        </Container>
      </>
    );
  }

  return (
    <>
      <ModalComponent />
      <Container>
        <Box height="7rem"></Box>
        <RegisterFormComponent
          name={name}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleNameChange={handleNameChange}
          onRegisterClick={registerUser}
          isLoading={isLoading}
        />
      </Container>
    </>
  );
};

export default UserSign;
