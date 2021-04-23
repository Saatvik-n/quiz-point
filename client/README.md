# Quiz point 

## Todos 

Create a user context for the whole program, and change the navbar based on that

1. Allow user to register, login, create, save quizzes - basically test the API 
2. After these are done, make suitable error messages, UI improvements, etc.
3. Make the website responsive 

### Immediate todos 

* Make a logout API endpoint
* Use the `validate` method on every initial `useEffect` for each container.
The `validate` should validate the JWT, and decrypt it, and return the `userid, username, name`  
everytime
* Create quiz, and save it for user 
* Load user's quizzes
* Take quiz, delete quiz works when selecting a quiz 


### Later 

* Make page responsive 

### Optimizations  

Document everything

* Try to clean up use of duplicate functions, like `changeOptionText`
* See effects of `React.memo` on components 
* When user logs in, his list of quizzes should be cached, so that they load faster

