/* STEPS FOR BLOCKING A USER AFTER 3 FAILED ATTEMPTS */

// ONE : need to provide a token --> it's saved in localStorage under the name token

//TWO : need to make an http request --> login request, if the login fails i need to increment the failed attemps counts

/* need to save in localStorage :
-failed attemps count
-block start time */

/*------------------Steps-------------------*/

/* -1- Login Flow:
User enters email and password.
You send an HTTP request to your server with those details to check if they are correct.
If correct, server sends a token and user gets logged in.
If incorrect, you increment the failed attempts count. */

/* -2- Tracking Failed Attempts:
If the user enters wrong credentials, you increment the failed attempts stored in localStorage.
If they reach 3 failed attempts, store the current time as the "block start time" in localStorage. */

/* -3-Blocking the User:
When the user tries to log in again, check if they’ve reached the 3-attempt limit.
If they have, compare the current time with the block start time. If 24 hours haven’t passed, block them from trying again.
If 24 hours have passed, reset the failed attempts count and let them try logging in again. */

/* Key Points:
localStorage is where you save the failed attempt count and the time the block started.
HTTP Request is used to check the user’s login credentials with the server.
Token is only used after a successful login to keep the user authenticated, so it’s not part of tracking failed attempts. */



