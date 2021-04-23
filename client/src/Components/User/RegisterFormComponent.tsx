import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Text, VStack } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

import * as React from "react";

export interface RegisterFormComponentProps {
  username: string;
  name: string;
  password: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRegisterClick: () => void
}

const RegisterFormComponent: React.FC<RegisterFormComponentProps> = (props) => {

  const {username, password, name, handleNameChange, handleUsernameChange, handlePasswordChange, onRegisterClick} = props


  return (
    <VStack spacing={5} boxShadow="0px 0px 2px 1px #AAAAAA" padding="20px">
      <Text fontSize="3xl">Register</Text>

      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input type="text" value={username}
      onChange={(e) => handleUsernameChange(e)}
         />
      </FormControl>
      <FormControl>
        <FormLabel> Name </FormLabel>
        <Input type="text"
        value={name}
        onChange={(e) => handleNameChange(e)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password}
      onChange={(e) => handlePasswordChange(e)} />
      </FormControl>

      <Button width="150px" colorScheme="green" onClick={onRegisterClick} >
        Register
      </Button>
      <Text>
        Already registered? &nbsp; 
        <Link to="/login" style={{ color: "blue" }}>
        Login in here
        </Link>
      </Text>
    </VStack>
  );
};

export default RegisterFormComponent;
