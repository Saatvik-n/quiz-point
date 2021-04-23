import { Box, Container } from "@chakra-ui/layout";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
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

  const history = useHistory()

  const { currentUserDispatch} = useContext(CurrentUserContext)

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
    
    api.post("/api/login", {
      username: username, 
      password: password
    })
    .then(res => {
      console.log(res.data);
      currentUserDispatch({
        type: "changeUser", 
        payload: {
          userID: res.data.userID, 
          username: res.data.username, 
          name: res.data.name
        }
      })
      history.push('/user')
    })
    .catch(err => {
      console.log(err);
    })
  }

  const registerUser = () => {
    console.log("Register user called");
    
    api.post("/api/register", {
      username: username, 
      password: password, 
      name: name
    })
    .then(res => {
      history.push('/login')
      setUsername("")
      setPassword("")
      setName("")
    })
    .catch(err => {
      console.log("Error registering user");
      console.log(err);
    })
  }

  if (isLogin) {
    return (
      <Container>
        <Box height="7rem"></Box>
        <LoginFormComponent
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          onLoginClick={loginUser}
        />
      </Container>
    );
  }

  return (
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
      />
    </Container>
  );
};

export default UserSign;
