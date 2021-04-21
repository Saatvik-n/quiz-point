import { Button } from '@chakra-ui/button';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, HStack, Text } from '@chakra-ui/layout';
import * as React from 'react';
import UserQuizzes from '../../Components/UserHome/UserQuizzes';

export interface UserHomeProps {
  
}

 
const UserHome: React.FC<UserHomeProps> = () => {

  const sampleQuizNames = ["Quiz 1", "Quiz 2"]
  const sampleQuizModifiedDates = ["Jan 1, 2020", "Jan 2, 2020"]

  return (  
    <>
    <Box h="7rem" />
    <Container maxW="container.lg" marginTop={4}>
      <Text fontSize="4xl"  > Welcome User </Text>

      <Flex justifyContent="space-between" marginTop="1rem" >
        <Text fontSize="3xl" > Your Quizzes: </Text>
        <Button leftIcon={<AddIcon />} variant="outline" colorScheme="cyan" size="lg" >
          Create New Quiz
        </Button>
      </Flex>
      <UserQuizzes
      quizNames={sampleQuizNames}
      lastModifiedDates={sampleQuizModifiedDates}
      />
    </Container>
    </>
  );
}
 
export default UserHome;