import {footerRender} from '../components/footer.js';
import "../profile/profile-pic.js";
import { auth } from "../firebase/firebase.js";
import {tasks} from "../dashboard/dashboard.js";
import {onAuthStateChanged,  signOut,  updatePassword} from "firebase/auth";


    //User Name// User Name
    const userName = document.getElementById("userName");

    onAuthStateChanged(auth, (user) => {
    if (user) {

        const savedName = localStorage.getItem("userName");

        if (savedName) {
        userName.textContent = savedName;
        } else {
        userName.textContent = user.email;
        }

    } else {
        window.location.href = "/index.html";
    }
    });



//Rendering Footer
const footer = document.getElementById('footer');
footer.innerHTML = footerRender({isProfile: true});
document.getElementById('addTaskBtn').classList.add('hidden');


///SETTING///SETTING///SETTING
//Change Name
const changeNameBtn = document.getElementById('changeNameBtn');
const changeNameCard = document.getElementById('changeNameCard');
const closeModal = document.getElementById('closeModal');
const saveName = document.getElementById('saveName');
const newNameInput = document.getElementById('newNameInput');

changeNameBtn.addEventListener('click', () => {
    changeNameCard.classList.remove('hidden');
    changeNameCard.classList.add('flex')
});

closeModal.addEventListener('click', () => {
    changeNameCard.classList.remove('flex');
    changeNameCard.classList.add('hidden')
});

saveName.addEventListener("click", () => {
  const newName = newNameInput.value.trim();

  if (!newName) return;

  // save to browser
  localStorage.setItem("userName", newName);

  // update UI immediately
  userName.textContent = newName;

  // close modal
  changeNameCard.classList.add("hidden");

  // clear input
  newNameInput.value = ";
});


//Error Handle //Error Handle //Error Handle
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


// DONE AND UNDONE TASKS
export   function renderDisplayTasks(value) {
    const leftTasks = value.filter(task => task.completed ===  false);
    const doneTasks = value.filter(task => task.completed === true);  
    
    const leftDisplayTask = document.querySelector('.leftDisplayTask');
    const doneDisplayTask = document.querySelector('.doneDisplayTask');

    leftDisplayTask.innerHTML = `${leftTasks.length} Tasks left`;
    doneDisplayTask.innerHTML = `${doneTasks.length} Tasks done`;

    console.log(leftDisplayTask )
}
renderDisplayTasks(tasks);

//Change Password
const changePasswordCard = document.getElementById('changePasswordCard');
const newPasswordInput = document.getElementById('newPasswordInput');
const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const cancelPassword = document.getElementById('cancelPassword');
const savePassword = document.getElementById('savePassword');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const errorMessage = document.getElementById('errorMessage');

changePasswordBtn.addEventListener('click', () => {
    changePasswordCard.classList.remove('hidden');
    changePasswordCard.classList.add('flex')
});

cancelPassword.addEventListener('click', () => {
    changePasswordCard.classList.remove('flex');
    changePasswordCard.classList.add('hidden')
});

savePassword.addEventListener('click', async () => {
    const newPassword = newPasswordInput.value.trim();

    if(newPassword.length < 6) {
        errorMessage.innerHTML = 'Password must be at least 6 characters';
        return;
    }

    const user = auth.currentUser;

    if(!user) {
        errorMessage.innerHTML = 'No user logged in';
        return;
    }

    try {
        await updatePassword(user, newPassword);
         errorMessage.innerHTML = 'Password updated successfully!';

        changePasswordCard.classList.add('hidden');
        newPasswordInput.value = '';
    } catch (error) {
        errorMessage.innerHTML = getErrorMessage(error);

        if (error.code === 'auth/requires-recent-login') {
            errorMessage.innerHTML = 'Please login again to change password.';
        } else {
            errorMessage.innerHTML = getErrorMessage(error);
        }
    }
});


/// INPUT PASSWORD REVIEW /// INPUT PASSWORD REVIEW
const togglePassword = (inputId, toggleId) => {
  const input = document.querySelector(inputId);
  const toggle = document.querySelector(toggleId);

  toggle.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      toggle.src = "images/02-login-register/hide.png";
    } else {
      input.type = "password";
      toggle.src = "images/02-login-register/view.png";
    }
  });
};

togglePassword('#newPasswordInput', '#toggleNewPassword');


//LOGOUT ///LOGOUT /// LOGOUT
//LOGOUT ///LOGOUT /// LOGOUT
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', async () => {
     try {
    await signOut(auth);
    // logs user out from Firebase

    window.location.href = "/index.html";
   //redirect to login page

  } catch (error) {
    console.error(error);
  }
});