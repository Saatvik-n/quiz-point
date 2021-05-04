import axios from "axios"

export default axios.create({
  baseURL: "https://quizpoint1.herokuapp.com", 
  headers: {
    "Content-Type": "application/json"
  }, 
  withCredentials: true
})