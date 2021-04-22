import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Text, VStack } from '@chakra-ui/layout';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface LoginFormComponentProps {
  username: string;
  password: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoginClick: () => void
}
 
const LoginFormComponent: React.FC<LoginFormComponentProps> = (props) => {

  const {username, password, handleUsernameChange, handlePasswordChange, onLoginClick} = props

  return (  
    <VStack spacing={5}
    boxShadow="0px 0px 2px 1px #AAAAAA"
    padding="20px" >
      <Text fontSize="3xl"
       >
        Login
      </Text>
    <FormControl>
      <FormLabel>
        Username
      </FormLabel>
      <Input type="text"
      value={username}
      onChange={(e) => handleUsernameChange(e)} />
    </FormControl>
    <FormControl>
      <FormLabel>
        Password
      </FormLabel>
      <Input type="password"
      value={password}
      onChange={(e) => handlePasswordChange(e)}
      />
    </FormControl>
    <Button width="150px"
    colorScheme="green"
    onClick={onLoginClick}
    > Log In </Button>
    <Text>
      Not registered? <Link to="/register" style={{color:"blue"}} > Sign up here </Link>
    </Text>
    </VStack>
  );
}
 
export default LoginFormComponent;