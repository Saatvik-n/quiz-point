import React, {createContext} from "react"

type currentUserType = {
  username: string, 
  userID: string, 
  name: string
}

type changeUserStateAction = {
  type: "changeUser", 
  payload: {
    username: string, 
    userID: string, 
    name: string
  }
}
| {
  type: "clearUser"
}

export const initialUserState: currentUserType = {
  userID: "", 
  username: "", 
  name: ""
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
      newState.name = payloadCopy.name

      return newState
    }
    case "clearUser": {
      const newState = {...state}
      newState.userID = ""
      newState.username = ""
      newState.name = ""

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