const errorDisplay = document.getElementById(`errorDisplay`);
console.log(errorDisplay);
errorMessage = [];


//General Requirements: Whenever any of these validation requirements fail, an appropriate error should be communicated to the user (in most cases, the actual requirement listed below serves as a good error message), and focus should return to the input element that the error originates from. If any requirements fail, the form should not submit.
function displayError(){
    errorDisplay.textContent = errorMessage;
    errorDisplay.style.display = 'block';
    console.log(errorMessage);
    setTimeout (function() {
        errorDisplay.style.display = 'none';
        errorMessage = [];
    }, 5000);
}


// //Part 3: Registration Form Validation Requirements
// For the Registration Form section of the page, implement the following validation requirements:
const registrationForm = document.getElementById(`registration`);
const registerName = registrationForm.elements[`username`];
const registerEmail = registrationForm.elements[`email`];
const registerPassword = registrationForm.elements[`password`];
const registerPassword2 = registrationForm.elements[`passwordCheck`];
// console.log(registrationForm);
// console.log(registerName);


const users = [];


registrationForm.addEventListener(`submit`, (el) =>{  
    el.preventDefault();
    const usernameValue = registerName.value.toLowerCase().trim();
    const emailValue = registerEmail.value.toLowerCase().trim();
    const passwordValue = registerPassword.value.trim();
    const user = {
        name: usernameValue,
        email: emailValue,
        password: passwordValue
    };

    //check if username is taken
    if(UsernameTaken(usernameValue)){
        alert(`that username is already taken`);
        return;
    }
    if(validateForm()){
        console.log(validateForm());
        localStorage.setItem(`user`, JSON.stringify(user));
        console.log(user);
        users.push(user);

        alert(`Registration Complete!`)

        // Reset the form to clear all fields
        registrationForm.reset();
    }
    console.log(users);
});

// Registration Form - Username Validation:
// The username cannot be blank. In HTML added required attribute.
// The username must be at least four characters long. minlength="4"


function validateForm() {
    const usernameValue = registerName.value.trim();
    const emailValue = registerEmail.value.trim();
    const passwordValue = registerPassword.value.trim();
    // The username cannot contain any special characters or whitespace.
    if(!(usernameValue.match(/^[a-zA-Z0-9]+$/))){
        registerName.focus();
        errorMessage.push(`The username cannot contain any special characters or whitespace.`);
        displayError(); 
        return false;
    }

    // The username must contain at least two unique characters.
    const uniqueChars = new Set(usernameValue);
    if (uniqueChars.size <2){
        registerName.focus();
        errorMessage.push(`The username must contain at least two unique characters.`);
        displayError();
        return false;
    }

// Registration Form - Email Validation:
// The email must be a valid email address. Changed type from text to email
// The email must not be from the domain "example.com."


    if(emailValue.match(/\w+\@example.com$/)){
        errorMessage.push(`The email must not be from the domain "example.com."`);
        displayError();
        return false;
    }

// Registration Form - Password Validation:
    
    const passwordCheck = registerPassword2.value.trim();
    // Passwords must be at least 12 characters long. added minlength

    // Passwords must have at least one uppercase and one lowercase letter.
    if(!passwordValue.match(/^(?=.*[A-Z])(?=.*[a-z])/)){
        errorMessage.push(`Passwords must have at least one uppercase and one lowercase letter.`);
        displayError();
        return false;
    }

    // Passwords must contain at least one number.
    if(!passwordValue.match(/[0-9]+/)){
        errorMessage.push(`Passwords must contain at least one number.`);
        displayError();
        return false;
    }
    // Passwords must contain at least one special character.
    const specailChar = /.*[!@#$%^&*()_+{}\[\]:;<>,.?/\\~-].*/;
    if(!passwordValue.match(specailChar)){
        errorMessage.push(`Passwords must contain at least one special character.`);
        displayError();
        return false;
    }

    // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    const regex = /password/i;
   
    if(passwordValue.match(regex)){
        errorMessage.push(`Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).`);
        displayError();
        return false;
    }

    // Passwords cannot contain the username.
    const userRegex = new RegExp(`^(?:.*?${usernameValue}).*$`);
    if(passwordValue.match(userRegex)){
        errorMessage.push(`Passwords cannot contain the username.`);
        displayError();
        return false;
    }

    // Both passwords must match.
    if(passwordValue !== passwordCheck){
        errorMessage.push(`Both passwords must match`);
        displayError();
        return false;
    }
    // If all validations pass, return true
    return true;
}

// Registration Form - Terms and Conditions:
// The terms and conditions must be accepted. added requried attribute.

// Registration Form - Form Submission:
// Usually, we would send this information to an external API for processing. In our case, we are going to process and store the data locally for practice purposes.
// If all validation is successful, store the username, email, and password using localStorage.
// If you are unfamiliar with localStorage, that is okay! Reference the documentation's "Description" and "Examples" sections to learn how to implement it. If you run into issues speak with a peer or one of your instructors.
// Consider how you want to store the user data, keeping in mind that there will be quite a few users registering for the site. Perhaps you want to store it with an array of user objects; or maybe an object whose keys are the usernames themselves.




// Valid usernames should be converted to all lowercase before being stored.
// Valid emails should be converted to all lowercase before being stored.
// Clear all form fields after successful submission and show a success message.

// Registration Form - Username Validation (Part Two):
// Now that we are storing usernames, create an additional validation rule for them...
// Usernames must be unique ("that username is already taken" error). Remember that usernames are being stored all lowercase, so "learner" and "Learner" are not unique.
function UsernameTaken(name) {
    return users.some(row => row.name == name.toLowerCase());
}

// Part 4: Login Form Validation Requirements
// For the Login Form section of the page, implement the following validation requirements:

const loginForm = document.getElementById(`login`);
const loginName = loginForm.elements[`username`];
const loginPassword = loginForm.elements[`password`]

console.log(loginName.parentElement);
console.log(loginName);

// Login Form - Form Submission:
loginForm.addEventListener(`submit`, (el) =>{
    el.preventDefault();

    // If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies).
    // If all validation is successful, clear all form fields and show a success message.
    const checkBox = loginForm.elements[`persist`];
    if(loginValidation() && checkBox.checked){
        alert(`Login successful and keep me logged in`);
        loginForm.reset();
    }else if(loginValidation()){
        alert(`Login successful!`)
        loginForm.reset();
    }else{
        alert(`wrong user information`)
    }})
// Login Form - Username Validation:
// The username cannot be blank. added required.
// The username must exist (within localStorage). Remember that usernames are stored in all lowercase, but the username field accepts (and should not invalidate) mixed-case input.
// Login Form - Password Validation:
// The password cannot be blank.
// The password must be correct (validate against localStorage).

function loginValidation(){
    const loginNameValue = loginName.value.toLowerCase();
    const loginPasswordValue = loginPassword.value;
    for (let i = 0; i<users.length; i++){
        if(loginNameValue == users[i].name && loginPasswordValue == users[i].password){
            return true;
        }
    }
    return false;
}



// Part 5: Completion
// Test your validation thoroughly! Try to break things!
// Remember that each successful registration should be stored; therefore you should be able to login with a variety of account credentials.
// When you are done testing your own code, swap sandboxes with a partner and test theirs!
// When each of you are finished testing, share your results.
// Discuss with your partner the differences and similarities between your two approaches. Remember that there is rarely a strictly "correct" or "incorrect" way to solve a problem in development, but there are (almost always) more efficient approaches!
// Remember to submit the link to your finished sandbox using the submission instructions included at the beginning of this document.