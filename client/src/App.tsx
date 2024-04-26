import * as React from "react";

import { HashRouter, Routes, Route } from "react-router-dom";

import { ChakraProvider, theme } from "@chakra-ui/react";

import Homepage from "./Containers/Homepage/Homepage";
import Navbar from "./Components/Navbar/Navbar";
import UserSign from "./Containers/User/UserSign";
import TakeQuiz from "./Containers/TakeQuiz/TakeQuiz";
import CreateQuiz from "./Containers/CreateQuiz/CreateQuiz";
import UserHome from "./Containers/UserHome/UserHome";
import {
    changeUserStateReducer,
    CurrentUserContextProvider,
    initialUserState,
} from "./Contexts/GlobalContexts/UserContext";
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
                    <Routes>
                        <Route path="/login" element={<UserSign isLogin />} />
                        <Route
                            path="/register" element={<UserSign isLogin={false} />} />
                        <Route path="/createquiz" element={<CreateQuiz />} />
                        <Route
                            path="/samplequiz" element={<TakeQuiz isSample={true} />} />
                        <Route path="/editquiz/:id" element={<EditQuiz />} />
                        <Route path="/takequiz/:id" element={<TakeQuiz />} />
                        <Route path="/user" element={<UserHome />} />
                        <Route path="/loggedout" element={<LoggedOutPage />} />
                        <Route path="/" element={<Homepage />} />
                        <Route element={<NotFoundPage />} />
                    </Routes>
                </HashRouter>
            </CurrentUserContextProvider>
        </ChakraProvider>
    );
};
