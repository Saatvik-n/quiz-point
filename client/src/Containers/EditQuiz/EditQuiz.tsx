import React from 'react';
import { useParams } from 'react-router';
import CreateQuiz from '../CreateQuiz/CreateQuiz';


export interface EditQuizProps {

}
 
const EditQuiz: React.FC<EditQuizProps> = () => {

  // @ts-ignore
  const {id} = useParams()

  return (  
    <> 
      <CreateQuiz
      isEdit={true}
      quizID={id}
      />
    </>
  );
}
 
export default EditQuiz;