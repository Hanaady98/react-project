import Swal from "sweetalert2";

//increment failed attempts - incrementFailedAttempts

const incrementFailedAttempts = () => {
    const attempts = localStorage.getItem("failedattempts");
    let currentCount = attempts === null ? 0 : Number(attempts);
    currentCount += 1;
    localStorage.setItem("failedattempts", currentCount.toString());
};

/* Retrieve the current count of failed attempts.
If there’s no count, set it to 0.
Increment the count.
Store the updated count back into localStorage.(also need to convert it back to string cos localStorage can accept strings only) */

/*-------------------------------------------------------------------------------------------------------------*/

//checks failed attempts - checkFailedAttempts

const checkFailedAttempts = () => {
    const attempts = localStorage.getItem("failedattempts");
    let failedAttemptsCount = attempts === null ? 0 : Number(attempts);

    return failedAttemptsCount >= 3; //that way the function returns true if it reached 3 or more and it will return false if it didn't
};

/* it will determine if the user has reached the maximum number of failed login attempts. */

/*-------------------------------------------------------------------------------------------------------------*/

//set lockout time - setLockoutTime

const setLockoutTime = () => {
    const currentDate = new Date();
    localStorage.setItem("lockoutTime", currentDate.getTime().toString());
    Swal.fire({
        title: "you have been locked out for 24 hours!",
        icon: "error",
        timerProgressBar: true,
        timer: 2000,
        toast: true,
        showCloseButton: true
    });
};

/*  Once a user hits the maximum failed attempts,
this function will store the current time (when the lockout starts) in localStorage.
we’ll later compare this time to see if 24 hours have passed. */

/*-------------------------------------------------------------------------------------------------------------*/

/* Check Lockout Status */

const checkLockoutStatus = () => {
    const storedLockoutTime = localStorage.getItem("lockoutTime");
    let lockoutTimestamp = storedLockoutTime === null ? 0 : Number(storedLockoutTime);
    const lockoutDurationMilliseconds = 24 * 60 * 60 * 1000;
    const lockoutExpiryTime = lockoutTimestamp + lockoutDurationMilliseconds;
    const newDate = Date.now();
    let failedattempts = lockoutExpiryTime >= newDate;
    return failedattempts;
};

//checks whether the user is still locked out based on the timestamp saved in localStorage.

/*-------------------------------------------------------------------------------------------------------------*/

/* Clear Failed Attempts */

const resetFailedAttempts = () => {
    const storedAttempts = localStorage.getItem("failedattempts");
    Number(storedAttempts) ? localStorage.removeItem("failedattempts") : localStorage.setItem("failedattempts", "0");
    Swal.fire({
        title: "failed attempts have been reset!",
        icon: "success",
        timerProgressBar: true,
        timer: 2000,
        background: '#6d6d6d',
        color: '#ffffff',
        showConfirmButton: false,
        showCloseButton: true,
    });
};

/* resets the count of failed attempts back to zero. */

/*------------------------------------------------------*/

export { incrementFailedAttempts, checkFailedAttempts, setLockoutTime, checkLockoutStatus, resetFailedAttempts };