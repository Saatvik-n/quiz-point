import { Button } from '@chakra-ui/button';
import { Box, Center, Text, VStack } from '@chakra-ui/layout';
import * as React from 'react';
import { useHistory } from 'react-router';

export interface NotFoundPageProps {
  
}
 
const NotFoundPage: React.FC<NotFoundPageProps> = () => {

  const history = useHistory()

  return (  
    <>
      <Box h="7rem" > </Box>
      <VStack spacing={4} >
        <Text fontSize="4xl" > Page Not Found </Text>
        <Button onClick={() => {
          history.push('/')
        }} > Go home </Button>
      </VStack>
    </>
  );
}
 
export default NotFoundPage;