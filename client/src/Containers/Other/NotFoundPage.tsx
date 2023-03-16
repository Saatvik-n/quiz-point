import { Button } from '@chakra-ui/button';
import { Box, Text, VStack } from '@chakra-ui/layout';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export interface NotFoundPageProps {

}

const NotFoundPage: React.FC<NotFoundPageProps> = () => {

  const navigate = useNavigate()

  return (
    <>
      <Box h="7rem" > </Box>
      <VStack spacing={4} >
        <Text fontSize="4xl" > Page Not Found </Text>
        <Button onClick={() => {
          navigate('/')
        }} > Go home </Button>
      </VStack>
    </>
  );
}

export default NotFoundPage;