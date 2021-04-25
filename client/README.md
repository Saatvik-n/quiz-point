# Quiz point 

## Todos 

Create a user context for the whole program, and change the navbar based on that

1. Allow user to register, login, create, save quizzes - basically test the API 
2. Allow users to make the quiz public, and allow them to take any other quiz they want, 
and allow randoms to take that quiz 
3. After these are done, make suitable error messages, UI improvements (like spinners, disabling input), etc.
4. Make the website responsive 

## Progress on todos 

List 1 - done 
List 2 - done 
List 3 - Responsive parts - done 

### Immediate todos 


## Later 

* Don't allow user to go to protected routes
* Document everything

Possible solutions to 1:
* To protect takequiz:  first check if it's public. If not, then check that the quiz ID that's passed belongs to the current user (get this via JWT)
* To protect edit quiz: same thing, but don't check if it's public

### Bugs 

* Problem with delete icon while creating quiz - done

### Optimizations  

You can deploy it after finishing till here

Implment all these later, after all the app's functionalities are finished

* Try to clean up use of duplicate functions, like `changeOptionText`
* See effects of `React.memo` on components 
* When user logs in, his list of quizzes should be cached, so that they load faster

