import { useDisclosure } from "@chakra-ui/hooks";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Banner from "../../Components/Homepage/Banner";
import Footer from "../../Components/Homepage/Footer";
import HomepageModal from "../../Components/Homepage/Modal/HomepageModal";
import Section1 from "../../Components/Homepage/Sections/Section1";
import Section2 from "../../Components/Homepage/Sections/Section2";
import CurrentUserContext from "../../Contexts/GlobalContexts/UserContext";
import api from "../../API/api";

export interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const [quizID, setQuizID] = useState(""); // By default, this is empty, since we don't know whether the user will choose to go to a quiz

  const [isError, setIsError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { currentUserState } = useContext(CurrentUserContext);

  const handleQuizIDChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuizID = e.target.value;
    setQuizID(newQuizID);
  };

  const quizRedirect = () => {
    api.get(`/api/quiz/checkvalid/${quizID}`).then((res) => {
      history.push(`/takequiz/${quizID}`);
    })
    .catch(err => {
      setIsError(true)
      setErrorMessage(err.response.data.error.message)
    })
  };

  const signIn = () => {
    history.push("/login");
  };

  const takeSampleQuiz = () => {
    history.push("/samplequiz");
  };

  useEffect(() => {
    if (currentUserState.userID !== "") {
      history.push("/user");
    }
  }, []);

  return (
    <>
      <HomepageModal
        isOpen={isOpen}
        onClose={onClose}
        isError={isError}
        errorMessage={errorMessage}
        sign={signIn}
        quizID={quizID}
        quizRedirect={quizRedirect}
        handleQuizIDChange={handleQuizIDChange}
        takeSampleQuiz={takeSampleQuiz}
      />
      <Banner onOpen={onOpen} />
      <Section1 />
      <Section2 />
      <Footer />
    </>
  );
};

export default Homepage;
