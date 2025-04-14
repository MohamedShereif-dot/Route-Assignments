var Name = document.getElementById('name');
var Email = document.getElementById('email');
var Password = document.getElementById('password');
var check = document.getElementById('check');
var FormBTN = document.getElementById('FormBTN');
var reverseBTN = document.querySelector('h3 a');

var users = JSON.parse(localStorage.getItem('Sign')) || [];

nameReg=/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
emailReg=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
passwordReg=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

document.getElementById("formData").addEventListener("submit", function(e) {
    e.preventDefault();
});

document.addEventListener('DOMContentLoaded', function() {
    FormBTN.onclick = submit;
});

function submit() {
    var info = {
        "name": Name.value,
        "email": Email.value,
        "password": Password.value
    };

    if (Name.value === '' || Email.value === '' || Password.value === '') {
        showError("All fields are required");
        return;
    }

    if (searchEmail()) {
        showError("Email already exists");
        return;
    }

    if(nameReg.test(Name.value) == false){
        showError(`
                Please enter a valid full name with:

                - First letter capitalized for each name

                - Only letters, spaces, hyphens (-), apostrophes ('), and periods (.)

                - No numbers or special characters
            `);
            return;
    }

    if(emailReg.test(Email.value) == false){
        showError(`
                Please enter a valid email address in the format: "username@domain.com"
                The email should contain:

               -  A username (letters, numbers, dots, or hyphens)

                - The @ symbol

                - A domain name (like gmail, yahoo, etc.)

                - A top-level domain (.com, .net, .org, etc.)
            `);
            return;
    }


    if(passwordReg.test(Password.value) == false){
        showError(`
                 Your password must contain:
                    ✓ At least 8 characters
                    ✓ At least one uppercase letter (A-Z)
                    ✓ At least one lowercase letter (a-z)
                    ✓ At least one number (0-9)

                    Strong password example: SecurePass123
            `);
            return;
    }

    users.push(info);
    localStorage.setItem("Sign", JSON.stringify(users));
    showSuccess("Registration successful!");
    clear();
}

function login() {
    const user = users.find(user => 
        user.email === Email.value && user.password === Password.value
    );
    const userEmail = users.find(user => 
        user.email === Email.value
    );
    

    if (!userEmail) {
        showError("Email not found. Please sign up first.");
        return;
    }

    if (!user) {
        showError("Incorrect password. Please try again.");
        return;
    }

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'welcome.html';
    } 
    
}

function Signin(e) {
    e.preventDefault();
    clear();
    Name.classList.toggle('d-none');
    check.classList.add('d-none');
    
    FormBTN.innerHTML = FormBTN.innerHTML === "Sign Up" ? "Sign In" : "Sign Up";
    reverseBTN.textContent = reverseBTN.textContent === "SignIn" ? "SignUp" : "SignIn";
    FormBTN.onclick = FormBTN.innerHTML === "Sign Up" ? submit : login;
}

function searchEmail() {
    return users.some(user => user.email === Email.value);
}

function searchPassword() {
    return users.some(user => user.password === Password.value);
}

function clear() {
    Name.value = '';
    Email.value = '';
    Password.value = '';
}

function showError(message) {
    check.innerHTML = message;
    check.classList.remove('d-none');
    check.classList.add('text-danger');
    check.classList.remove('text-success');
}

function showSuccess(message) {
    check.innerHTML = message;
    check.classList.remove('d-none');
    check.classList.add('text-success');
    check.classList.remove('text-danger');
}