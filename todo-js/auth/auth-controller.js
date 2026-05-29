import { registerUser } from "./register-firebase.js";
import { loginUser, signInWithGoogle} from "./login-firebase.js";
import { resetPassword } from "./forgot-password.js";




const registrationSlide = document.getElementById('registrationSlide');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotForm = document.getElementById('forgotForm');
const verifySlide = document.getElementById('verifySlide');

//Register/Login Option
const registerOption = document.getElementById('register-btn');
registerOption.addEventListener('click', () => {
     registrationSlide.classList.add('hidden');
     loginForm.classList.add('hidden');
     registerForm.classList.remove('hidden');  
});
const loginOption = document.getElementById('login-btn');
loginOption.addEventListener('click', () => {
     registrationSlide.classList.add('hidden');
     loginForm.classList.remove('hidden');
     registerForm.classList.add('hidden');  
});
//Forgotten password logic
const resetLink = document.getElementById('resetLink');
resetLink.addEventListener('click', () => {
     registrationSlide.classList.add('hidden');
     loginForm.classList.add('hidden');
     registerForm.classList.add('hidden');  
     forgotForm.classList.remove('hidden');
});

//Both Buttons logic
const goToLogin = document.querySelectorAll(".goToLogin");
    goToLogin.forEach((goToLogins) => {
    goToLogins.addEventListener('click', () => {
    registrationSlide.classList.add('hidden');
    registerForm.classList.add('hidden');  
    loginForm.classList.remove('hidden');
});
});
const goToRegister = document.querySelector('.goToRegister');
goToRegister.addEventListener('click', () => {
     registrationSlide.classList.add('hidden');
     registerForm.classList.remove('hidden'); 
    forgotForm.classList.add('hidden');   
});

//back-registrationSlide button
const backArrow = document.querySelectorAll('.back-arrow');
backArrow.forEach((arrow) => {
    arrow.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');  
        registrationSlide.classList.remove('hidden');  
    });
});



/// INPUT PASSWORD REVIEW /// INPUT PASSWORD REVIEW
const togglePassword = (inputId, toggleId) => {
  const input = document.querySelector(inputId);
  const toggle = document.querySelector(toggleId);

  toggle.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      toggle.src = "/imagess/02-login-register/hide.png";
    } else {
      input.type = "password";
      toggle.src = "/imagess/02-login-register/view.png";
    }
  });
};

togglePassword('#registerPassword', '#toggleRegisterPassword');
togglePassword('#confirmPassword', '#toggleConfirmPassword');
togglePassword('#loginPassword', '#toggleLoginPassword');



//Error Handle //Error Handle//Error Handle
//Error Handle //Error Handle//Error Handle
const getErrorMessage = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email address";

    case "auth/user-not-found":
      return "No account found with this email";

    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password";

    case "auth/email-already-in-use":
      return "Email already registered";

    case "auth/weak-password":
      return "Password should be at least 6 characters";

    case "auth/network-request-failed":
      return "Network error. Check your internet";

    default:
      return "Something went wrong. Try again";
  }
};


const registerAlertMessage = document.getElementById('registerAlertMessage');
const confirmPasswordAlertMessage = document.getElementById('confirmPasswordAlertMessage');
///REGISTER LOGIC ///REGISTER LOGIC /// REGISTER LOGIC
///REGISTER LOGIC ///REGISTER LOGIC /// REGISTER LOGIC
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email =  document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (password !== confirmPassword) {
        confirmPasswordAlertMessage.innerHTML = 'Passwords do not match';
        return;
    }

    try {
        const userCredential = await registerUser(email, password);
        console.log('User created:', userCredential.user);

        registerAlertMessage.innerHTML = 'Account created successfully!';
        registerAlertMessage.classList.remove('text-red-600');
        registerAlertMessage.classList.add('text-green-600');
        setTimeout(() => {
          window.location.href = "/dashboard.html";
        }, 1000);
          
    } catch (error) {
         registerAlertMessage.innerHTML = getErrorMessage(error);
         registerAlertMessage.classList.remove('text-green-600');
         registerAlertMessage.classList.add('text-red-600');
    }
});




const loginAlertMessage = document.getElementById('loginAlertMessage');
///LOGIN LOGIC ///LOGIN LOGIC /// LOGIN LOGIC
///LOGIN LOGIC ///LOGIN LOGIC /// LOGIN LOGIC
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    console.log(email);
    const password = document.getElementById('loginPassword').value.trim();
    console.log(password);
    try {
        const userCredential = await loginUser(email, password);

        console.log("User logged in:", userCredential.user);
        loginAlertMessage.innerHTML = 'Login successful!';
        loginAlertMessage.classList.remove('text-red-600');
        loginAlertMessage.classList.add('text-green-600');
        setTimeout(() => {
          window.location.href = "/dashboard.html";
        }, 1000);
          

    } catch (error) {
        loginAlertMessage.innerHTML = getErrorMessage(error);
        loginAlertMessage.classList.remove('text-green-600');
        loginAlertMessage.classList.add('text-red-600');
        
    }
});



const messageAlert = document.getElementById('messageAlert');
///RESETPASSWORD  ///RESETPASSWORD LOGIC  /// 
///RESETPASSWORD ///RESETPASSWORD LOGIC  /// 
forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById('forgotEmail').value.trim();

    try {
        await resetPassword(email);
        messageAlert.innerHTML = "Password reset link sent to your email!";
        messageAlert.classList.remove('text-red-600');
        messageAlert.classList.add('text-green-600');
        

    } catch (error) {
        alert(error.message);
        messageAlert.innerHTML = getErrorMessage(error);
        messageAlert.classList.remove('text-green-600');
        messageAlert.classList.add('text-red-600');
        
    }
});




/// GOOGLE SIGN IN /// 
/// GOOGLE SIGN IN ///
const googleBtn = document.querySelectorAll('#googleBtn');

googleBtn.forEach((googleBtns) => {
    googleBtns.addEventListener("click", async () => {
    try {
        const result = await signInWithGoogle();

        console.log("Google user:", result.user);

        //alert("Signed in with Google!");
        setTimeout(() => {
          window.location.href = "/dashboard.html";
        }, 1000);

    } catch (error) {
       //alert(error.message);
    }
});
});