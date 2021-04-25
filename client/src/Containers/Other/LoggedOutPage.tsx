import { Button } from '@chakra-ui/button';
import { Box, Text, VStack } from '@chakra-ui/layout';
import * as React from 'react';
import { useHistory } from 'react-router';

export interface LoggedOutPageProps {
  
}
 
const LoggedOutPage: React.FC<LoggedOutPageProps> = () => {

  const history = useHistory()

  return (  
    <>
    <Box h="7rem"></Box>
    <VStack spacing="20px" >
      <Text fontSize="3xl" > You have been logged out </Text>
      <Box>
        <Button onClick={() => {
          history.push('/')
        }} > Go Home </Button>
        <Button onClick={() => {
          history.push('/login')
        }} > Sign In </Button>
      </Box>
    </VStack>
    </>
  );
}
 
export default LoggedOutPage;