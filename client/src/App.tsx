import * as React from "react";

import { HashRouter, Switch, Route } from "react-router-dom";

import { ChakraProvider, theme } from "@chakra-ui/react";
import Homepage from "./Containers/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import UserSign from "./Containers/User/UserSign";
import TakeQuiz from "./Containers/TakeQuiz/TakeQuiz";
import CreateQuiz from "./Containers/CreateQuiz/CreateQuiz";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <HashRouter>
      <Switch>
        <Route path="/login" exact render={() => <UserSign isLogin />} />
        <Route path="/register" exact render={() => <UserSign isLogin={false} />} />
        <Route path="/createquiz" exact component={CreateQuiz} />
        <Route path="/takequiz" exact component={TakeQuiz} />
        <Route path="/" exact component={Homepage} />
      </Switch>
    </HashRouter>
  </ChakraProvider>
);
