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
 url : "http://localhost:3000/api/signin"
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
#############
add product
url : http://localhost:3000/api/products/add
method: "POST",
body: {
          name ,descripition, category, sizes, toppings, defaultTopping , specialsAdditions 
  if (pizza) {
    body: {name ,descripition, category, sizes, toppings, defaultTopping , specialsAdditions }
  }
  if (drink) {
    body: {name ,descripition, category, sizes }
    
  }
  if (salads) {
    body: {name ,descripition, category, sizes, toppings }
  }
  if (starters) {
    body: {name ,descripition, category, sizes }
  }
  if (pasta) {
    body: {name ,descripition, category, price }
  }
  if (desert) {
    body: {name ,descripition, category, price }
  }
}

sizes: [
  {
      size: "ex: meduim",
      price: ex: 20
    }
    ]

    toppings:  [
            {
                topping: String,
                sizes: [
                    {
                        size: String,
                        price: Number
                    }
                ]
            }
    <!--  -->
    defaultTopping: []
    
    <!--  -->
    specialsAdditions: 
            {
                addition: String,
                sizes: [
                    {
                        size: String,
                        price: Number
                    }
                ]
            }
        
    <!--  -->
    pieces:  [
            {
                pieces: String,
                price: Number
            }
        ]

reponse: 
if (400) {
  {error: checkErrResult};
  or
  {message : "should select correct category"});
  or
  {message : "should select file"})
} 
else (200) {
  {message: "success to add product}
}

################
to show all products for admin
url : http://localhost:3000/api/products/add
method: "GET"
response: 
if (500)
{message: "something went wrong"}
if (200) but no products added before
{message: "There are no products"}
if (200) but no products added before
{products: {
  name: "",
  category: "",
  descripition: ""
product.show = {
  method: "GET",
  url: ""
}
product.image 
}
