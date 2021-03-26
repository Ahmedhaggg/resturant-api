# resturant-api

api 
signup
url "http://localhost:3000/api/signup"
body : { firstName, lastName, email, password, confirmPassword, phoneNumber}
response : 
  error : 
    if status !== 201
      response = {message: ""}
    else 
      response = {message: ""}
        
 ##################
 signin
 url : "ttp://localhost:3000/api/signin"
 body: {email, password}
 response : 
  error : 
    if status !== 201
      response = {message: ""}
    else 
      response = {
        token: "token",
        _id: "userid",
        email: "useremail",
        profuleImage: ""
      }
