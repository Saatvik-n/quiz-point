import React, {createContext} from "react"

type currentUserType = {
  username: string, 
  userID: string
}

type changeUserStateAction = {
  type: "changeUser", 
  payload: {
    username: string, 
    userID: string
  }
}
| {
  type: "clearUser"
}

export const initialUserState: currentUserType = {
  userID: "", 
  username: ""
}

export const changeUserStateReducer = (
  state: currentUserType, action: changeUserStateAction
) => {
  switch (action.type) {
    case "changeUser": {
      const newState = {...state}
      const payloadCopy = {...action.payload}
      newState.userID = payloadCopy.userID
      newState.username = payloadCopy.username

      return newState
    }
    case "clearUser": {
      const newState = {...state}
      newState.userID = ""
      newState.username = ""

      return newState
    }
  
    default:
      return state
  }
}

export interface CurrentUserContextProps {
  currentUserState: currentUserType, 
  currentUserDispatch: React.Dispatch<changeUserStateAction>
}

const CurrentUserContext = createContext<CurrentUserContextProps>({
  currentUserDispatch: () => {}, 
  currentUserState: initialUserState
})

export const CurrentUserContextProvider = CurrentUserContext.Provider
export const CurrentUserContextConsumer = CurrentUserContext.Consumer

export default CurrentUserContext