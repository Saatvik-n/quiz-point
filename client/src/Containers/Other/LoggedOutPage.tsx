import { Button } from '@chakra-ui/button';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export interface LoggedOutPageProps {

}

const LoggedOutPage: React.FC<LoggedOutPageProps> = () => {

  const navigate = useNavigate()

  return (
    <>
      <Box h="7rem"></Box>
      <VStack spacing="20px" >
        <Text fontSize="3xl" > You have been logged out </Text>
        <Text fontSize="4xl"> Do not use this site on Incognito Mode </Text>
        <HStack spacing="20px" >
          <Button onClick={() => {
            navigate('/')
          }}
            size="lg"
          > Go Home </Button>
          <Button onClick={() => {
            navigate('/login')
          }}
            size="lg"
          > Sign In </Button>
        </HStack>
      </VStack>
    </>
  );
}

export default LoggedOutPage;