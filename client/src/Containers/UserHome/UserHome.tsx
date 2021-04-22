import { Button } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { AddIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, HStack, Text } from '@chakra-ui/layout';
import * as React from 'react';
import { useState } from "react";
import { useHistory } from 'react-router';
import api from '../../API/api';
import UserHomeModal from '../../Components/UserHome/UserHomeModal';
import UserQuizzes from '../../Components/UserHome/UserQuizzes';

export interface UserHomeProps {
  
}

 
const UserHome: React.FC<UserHomeProps> = () => {

  const sampleQuizNames = ["Quiz 1", "Quiz 2"]
  const sampleQuizModifiedDates = ["Jan 1, 2020", "Jan 2, 2020"]

  const [selectedQuiz, setSelectedQuiz] = useState("")
  const [selectedQuizID, setSelectedQuizID] = useState("")

  const [showQuizID, setShowQuizID] = useState(false)

  const {onClose, onOpen, isOpen} = useDisclosure()

  const history = useHistory()

  const handleQuizClick = () => {
    onOpen()
  }

  const changeShowStatus = () => {
    setShowQuizID(old => !old)
    console.log("New quiz id status is");
    console.log(showQuizID);
    
    
  }

  const selectQuiz = (index: number) => {
    setSelectedQuiz(sampleQuizNames[index])
    setSelectedQuizID("Random ID")
    console.log("Selected quiz is");
    
  } 

  React.useEffect(()=> {
    api.get('/api/validate')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
      history.push('/')
      
    })
  }, [])

  return (  
    <>
    <Box h="7rem" />
    <UserHomeModal  onClose={onClose} isOpen={isOpen} quizName={selectedQuiz} quizID={selectedQuizID}
    showQuizID={showQuizID} changeShowStatus={changeShowStatus} />
    <Container maxW="container.lg" marginTop={4}>
      <Text fontSize="4xl"  > Welcome User </Text>

      <Flex justifyContent="space-between" marginTop="1rem" >
        <Text fontSize="3xl" > Your Quizzes: </Text>
        <HStack>
        <Button rightIcon={<ArrowRightIcon />} size="lg" colorScheme="blue" variant="outline" >
          Take a quiz 
        </Button>
        <Button leftIcon={<AddIcon />} variant="outline" colorScheme="cyan" size="lg" >
          Create New Quiz
        </Button>
        </HStack>

      </Flex>
      <UserQuizzes
      showModal={handleQuizClick}
      quizNames={sampleQuizNames}
      lastModifiedDates={sampleQuizModifiedDates}
      selectQuiz={selectQuiz}
      />
    </Container>
    </>
  );
}
 
export default UserHome;