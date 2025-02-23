# Devtinder APIs
## authRouter
- POST /auth/signup
- POST /auth/login
- POST /auth/logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter
- GET /user/request/received 
- GET /user/connections
-Get /user/feed - gets the profiles of the users on platform

Status - ignored,interested,accepted,rejected

