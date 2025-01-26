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


