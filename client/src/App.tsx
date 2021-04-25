import * as React from "react";

import { HashRouter, Switch, Route } from "react-router-dom";

import { ChakraProvider, theme } from "@chakra-ui/react";

import axios from "axios";

import Homepage from "./Containers/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import UserSign from "./Containers/User/UserSign";
import TakeQuiz from "./Containers/TakeQuiz/TakeQuiz";
import CreateQuiz from "./Containers/CreateQuiz/CreateQuiz";
import UserHome from "./Containers/UserHome/UserHome";
import { SampleQuiz } from "./Data/SampleQuiz";
import {
  changeUserStateReducer,
  CurrentUserContextProvider,
  initialUserState,
} from "./Contexts/GlobalContexts/UserContext";
import api from "./API/api";
import EditQuiz from "./Containers/EditQuiz/EditQuiz";
import NotFoundPage from "./Containers/Other/NotFoundPage";
import LoggedOutPage from "./Containers/Other/LoggedOutPage";

export const App = () => {
  const [currentUserState, currentUserDispatch] = React.useReducer(
    changeUserStateReducer,
    initialUserState
  );

  const currentUserValues = {
    currentUserState, 
    currentUserDispatch
  }

  return (
    <ChakraProvider theme={theme}>
      <CurrentUserContextProvider value={currentUserValues} >
      <HashRouter>
      <Navbar />
        <Switch>
          <Route path="/login" exact render={() => <UserSign isLogin />} />
          <Route
            path="/register"
            exact
            render={() => <UserSign isLogin={false} />}
          />
          <Route path="/createquiz" exact component={CreateQuiz} />
          <Route
            path="/samplequiz"
            exact
            render={() => <TakeQuiz isSample={true} />}
          />
          <Route path="/editquiz/:id" exact component={EditQuiz} />
          <Route path="/takequiz/:id" exact component={TakeQuiz} />
          <Route path="/user" exact component={UserHome} />
          <Route path="/loggedout" exact component={LoggedOutPage} />
          <Route path="/" exact component={Homepage} />
          <Route component={NotFoundPage} />
        </Switch>
      </HashRouter>

      </CurrentUserContextProvider>
    </ChakraProvider>
  );
};
