- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test , /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde ( ^ vs ~ )

- Initialize the git repository
- .gitignore
- create a remote repo on github
- Play with routes and route extensions /,/test,/hello,/xyz
- Ordering of routes is important
- Install Postman and make collection Workspace > test API call
- Write Logic to handle GET,POST,DELETE,PUT,PATCH
- Explore routing and use of ?, + , (), \* in the routes
- Use of regex in routes /a/ , /.\*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

- Multiple route Handling (play with the code)
- next() method
- next() function and errors along with res.send()
- app.use("/route", rh1, [rh2, rh3], rh4, rh5, rh6)
- What is middleware ? Why do we need it?
- How Express js handles requests behind the scenes?
- Difference between app.use() and app.all().
- Write a dummy auth middleware for user and admin 
- Error handling using wildcard app.use("/user",(err,req,res,next)=>{})


 - Create a free cluster on MongoDB official website (Mongo Atlas)
 - Install mongoose library
 - Connect your application to the Database "Connection-url"/devTinder
 - Call the connectDB function and connect to database before starting application on 7777
 - Create a userSchema & user Model
 - Create POST /sigup API to add data to database
 - Push some documents using API calls from postman
 - Error Handling using try , catch

 - Js object vs JSON (difference)
 - Add the express.json middleware to your app
 - Make your signup API Dynamic to receive data from the end user
 - User.findOne() with duplicate emailId and see which obj returns.
 - Get User by emailId
- Api - Feed Api -> GET /feed - get all the users from the database
- Api - Get user by Id Api -> GET /user - get all the users from the database by id
- Api - CRUD user Api
- Put vs Patch Api
- Explore the Mongoose documentation for Models
- Update user with EmailId
- Explore more about Mongoose Model findbyIdandupdate options

 - Explore schematype options from the documention
 - add required, unique, lowercase, min, minLength, trim
 - Add default
 - Create a custom validate function for gender
 - Improve the DB schema - PUT all appropiate validations on each field in Schema
 - Add timestamps to the userSchema
 - Add API level validation on Patch request & Signup post api
 - DATA Sanitizing - Add API validation for each field
 - Install validator
 - Explore validator library funcation and Use vlidator funcs for password, email, photoURL
 - NEVER TRUST req.body

 - Validate Data in Signup API
 - install bcrypt package
 - create a passwodhash using bcrypt.hash and save the users with encrypted password
 - Create Login Api
 - Compare passwords and throw errors if email or password is invalid
 - Install cookie-parser
 - Just send a dummy cookie to user
 - Create GET profile and check if you get the cookie back
 - Install jsonwebtoken
 - In Login Api, after email and password validation create a jwt token and send it to the user
 - Write the user Auth Middleware
 - Create an expiry date for cookie and jwt token
 - create UserSchema method to getJWT
 - create userSchema method for password Validation

 - Explore Tinder Apis
 - Create a list of All Apis you can think of in DEVTINDER
 - Group multiple routes under respective routers
 - Read Documentation from Express.router
 - Create Routes folder for authRouter,profileRouter and requestRouter
 - Create authRouter,profileRouter and requestRouter
 - Import These Routers in app.js
 - Create Post /logout Api
 - Create Patch /profile/edit
 - Create Patch /profile/password - forgot password Api
 - Make sure you validate the data in every POST PATCH data
 

 



