import React from 'react';
import { useParams } from 'react-router-dom';
import CreateQuiz from '../CreateQuiz/CreateQuiz';


export interface EditQuizProps {

}

type editQuizParams = {
  id: string
}

const EditQuiz: React.FC<EditQuizProps> = () => {

  const { id } = useParams<editQuizParams>()

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