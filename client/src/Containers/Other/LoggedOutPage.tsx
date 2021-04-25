import { Button } from '@chakra-ui/button';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
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
      <HStack spacing="20px" >
        <Button onClick={() => {
          history.push('/')
        }} 
        size="lg"
        > Go Home </Button>
        <Button onClick={() => {
          history.push('/login')
        }} 
        size="lg"
        > Sign In </Button>
      </HStack>
    </VStack>
    </>
  );
}
 
export default LoggedOutPage;