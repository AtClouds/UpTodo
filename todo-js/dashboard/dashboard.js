import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import "../profile/profile-pic.js";
import {footerRender} from '../components/footer.js';
import {initCategoryComponent, tempCategory, setTempCategory, categories} from '../components/category-popup.js';
import {initPriorityComponent, tempPriority, setTempPriority} from '../components/priority-popup.js';
import {initDateTimeComponent, tempDateTime, setTempDateTime} from '../components/date-time-popup.js';
import { log } from "firebase/firestore/pipelines";


onAuthStateChanged(auth, (user) => {
  if (!user) {
    // ❌ Not logged in → send back
    window.location.href = "/index.html";
  }
});

export let tasks = [];

//LOADS FROM STORAGE
function loadTasksFromStorage() {
  console.log('Loading from storage')
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

/// LOADS STORED TASKS
loadTasksFromStorage();

//SAVE TO LOCAL STORAGE
function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}



//Rendering Footer
const footer = document.getElementById('footer');
footer.innerHTML = footerRender({isProfile: false});

//Profile Nav Logic
document.addEventListener('click', (e) => {
  if(e.target.id === 'profileNav') {
    window.location.href = '/profile.html';
  }
});


// User Name // User Name 

onAuthStateChanged(auth, (user) => {
  const dashboardUserName = document.getElementById("dashboardUserName");
  if (!dashboardUserName) return;
  if (user) {

    const savedName = localStorage.getItem("userName");

    if (savedName) {
      dashboardUserName.textContent = savedName;
    } else {
      dashboardUserName.textContent = user.email;
    }

  }
});


// SEARCH BAR LOGIC 

function initSearchBar() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchValue));
    renderTasks(filteredTasks);
})
}
initSearchBar();


///ADD TASK LOGIC ///ADD TASK LOGIC ///ADD TASK LOGIC ///ADD TASK LOGIC ///ADD TASK LOGIC ///ADD TASK LOGIC///ADD TASK LOGIC ///ADD TASK LOGIC ///ADD TASK LOGIC
///ADD TASK LOGIC ///ADD TASK LOGIC ///ADD TASK LOGIC
const addTaskBtn = document.getElementById('addTaskBtn');
const closeTask = document.getElementById('closeTask');
const taskModal = document.getElementById('taskModal')
const taskList = document.getElementById('taskList');
const dashboard = document.getElementById('dashboard');
const completedTasks = document.getElementById('completedTasks');
const todayTasksRender = document.getElementById('todayTasksRender');
const completedTaskRender = document.getElementById('completedTaskRender');
const descriptionBtn = document.getElementById('descriptionBtn');
const taskTitle = document.getElementById('taskTitle');
const addInfo = document.getElementById('addInfo');
const previewContainer = document.getElementById('previewContainer');
const saveTask = document.getElementById('saveTask');

//TEMP STORAGE /// TEMPORARY STORAGE 
let tempTitle = '';
let tempDescription = '';
let currentTask = null;
export function setTasks(value) {
  tasks = value;
}



// OPEN ADD MODAL
addTaskBtn.addEventListener('click', () => {
    taskModal.classList.remove("hidden");
    taskModal.classList.add("flex");

    resetModal();

    setTimeout(() => {
    document.getElementById("taskTitle").focus();
    }, 100);
});
// CLOSE ADD MODAL
if (closeTask) {
    closeTask.addEventListener('click', () => {
    taskModal.classList.add("hidden");
    resetModal();
    });
}


 //CLOSE ADD MODAL
 if(taskModal) {
     taskModal.addEventListener("click", (e) => {
    if (e.target === taskModal) {
      taskModal.classList.add("hidden");
    }
    });
 }
   



// DESCRIPTION CLICK
if (descriptionBtn) {
      descriptionBtn.addEventListener('click', () => { 
      addInfo.classList.remove('hidden'); 
      });

}

function resistRender(para) {
  para.addEventListener('click', () => { 
  addInfo.classList.add('hidden'); 
});
}






//ADD TASK ON "ENTER" KEY
function saveTitle() {
    const value = taskTitle.value.trim();
    if (value === '') return;

    tempTitle = value;

    renderPreview();
    taskTitle.value = ";
}
if (taskTitle) {
    taskTitle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveTitle();
    }
    });
}


//ADD DESCRIPTION ON "ENTER" KEY 
if (addInfo) {
    addInfo.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    const value = addInfo.value.trim();
    if (value === '') return;

    tempDescription = value;

    renderPreview();
    addInfo.value = ";
  }
});
}


//RENDER BOTH TOGETHER
function renderPreview() {
  previewContainer.innerHTML = '';

  const div = document.createElement('div');
  div.className = 'p-3 ';

  div.innerHTML = `
    <h3 class="mt-2 font-medium text-[20px] text-tertiary/50">${tempTitle}</h3>
     ${tempDescription ? `<p class="font-normal text-[16px] text-tertiary/50">${tempDescription}</p>` : "}
  `;

  previewContainer.appendChild(div);  
}




/// Components initialization /// Components initialization
/// Components initialization /// Components initialization
/// Components initialization /// Components initialization

// PRIORITY INITIALIZATION
document.addEventListener('click', (e) => {
    if(e.target.closest("#priorityBtn")) {
        initPriorityComponent({
        initialValue: tempPriority,
        onSave: (value) => {
          setTempPriority(value);
        }
    });
    }
});

// CATEGORY INITIALIZATION
document.addEventListener('click', (e) => {
    if(e.target.closest("#locationBtn")) {
        initCategoryComponent({
        initialValue: tempCategory,
        onSave: (value) => {
          setTempCategory(value);
        }
    });
    }
});

// DATETIME INITIALIZATION
document.addEventListener('click', (e) => {
    if(e.target.closest("#date-time-btn")) {
        initDateTimeComponent({
        initialValue: tempDateTime,
        onSave: (value) => {
          setTempDateTime(value);
        }
    });
    }
});




//Resist logic
function resetModal() {
  taskTitle.value = ";
  addInfo.value = ";
  setTempPriority(null);
  tempTitle = '';
  tempDescription = '';
  setTempCategory(null);
  setTempDateTime(null);

  
  previewContainer.innerHTML = ";
  // hide description 
  addInfo.classList.add('hidden'); 
}


//SEND BUTTON ///SEND BUTTON
///SEND BUTTON ///SEND BUTTON
if (saveTask) {
    saveTask.addEventListener('click', () => {
  if (!tempTitle) {
    previewContainer.innerHTML = 'Task title empty, add tasks!'
     return;
  }

  
  
  const newTask = {
    id: Date.now(),
    title: tempTitle,
    description: tempDescription,
    priority: tempPriority,
    category: tempCategory,
    dateTime: tempDateTime,
    completed: false
  };
  
  tasks.push(newTask);
  
  saveTasksToStorage();
  renderTasks();
  resetModal();
  renderDashboard();
  taskModal.classList.add("hidden");
  
});

}



/// RENDER TASK LIST /// RENDER TASK LIST /// RENDER TASK LIST /// RENDER TASK LIST //
/// RENDER TASK LIST /// RENDER TASK LIST /// RENDER TASK LIST /// RENDER TASK LIST //

function renderDashboard() {
  const placeholder = document.getElementById('placeholder');
  if (!placeholder) return;
  if (tasks.length === 0) {
    placeholder.classList.remove('hidden')
    dashboard.classList.add('hidden')
  } else if (tasks.length > 0) {
    placeholder.classList.add('hidden')
    dashboard.classList.remove('hidden')
  }
}
renderDashboard();



function renderTasks(taskList = tasks) {
      const todayTasks = document.getElementById('todayTasks');
      if(!todayTasks) return;

      todayTasksRender.innerHTML = ";
      completedTaskRender.innerHTML = ";

      taskList.forEach((task) => {
      const div = document.createElement('div');
      div.className = 'w-full bg-secondary-light rounded-md p-4 flex justify-between items-center gap-3 relative hover:animate-bounce-hover  transition-all ease-in-out duration-300 cursor-pointer';
      
      const category = categories.find(cat => cat.id === task.category);

 
    div.innerHTML += `

       <!----Checked Button----->
      <div class="check-btn w-5 h-5 rounded-full border-2 border-tertiary cursor-pointer" data-id="${task.id}"></div>

      <div class="flex flex-col">
       <!----Title----->
      <h3 class="mt-2 font-medium text-[20px] text-tertiary/50">${task.title}</h3>

      <!----Date and Time----->
       ${task.dateTime ? `<p class="font-normal text-[16px] text-tertiary/50">${task.dateTime}</p>` : "}
      </div>

      <!----Description----
      <div>${task.description ? `<p class="font-normal text-[16px] text-tertiary/50">${task.description}</p>` : "}</div>----->
      
      
      <div class="flex gap-2 mt-5">
        <!----Category----->      
        ${category ? `
          <div class="flex items-center justify-center gap-2">
            <div class="w-full h-auto rounded py-2 px-3 flex justify-between gap-1" style="background-color: ${category.color}">
            <div class="[&>svg]:w-5 [&>svg]:h-5">${category.icon}</div>
            <span class="text-[14px] text-tertiary">${category.name}</span>
            </div> 
          </div>` : "}
        
        <!----Priority----->
          ${task.priority ? `<div class="text-sm text-tertiary/50 flex justify-between items-center gap-1 py-2 px-2 border border-primary rounded-md ">
          <svg class="w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
            <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
          </svg>
          ${task.priority}</div>` : "}
          
        </div>
       
    `;
     
    const checkBtn = div.querySelector('.check-btn');

    if (task.completed === true) {
      completedTaskRender.appendChild(div);
      checkBtn.classList.toggle('bg-tertiary')
    } else {
      todayTasksRender.appendChild(div);
    }
    
      checkBtn.addEventListener('click', (e) => {
         e.stopPropagation();
         task.completed = !task.completed;
        console.log(task.completed) 
        saveTasksToStorage();
        renderTasks();
      });

    /// SEE MORE  /// SEE MORE  /// SEE MORE 
      const seeMore = document.querySelector('.seeMore');

         /// open More Tasks details
         div.addEventListener('click', () => {
          currentTask = task;
          seeMore.classList.remove('hidden');
          renderDetails();
         });
         
         /// SEE MORE  /// SEE MORE  /// SEE MORE  /// SEE MORE    
         
         /// CLOSE DEE MORE DETAILS
          /// Cancel more tasks details
         const taskDisplay = document.getElementById('taskDisplay');
         const seeMoreCancelBtn = document.querySelector('.seeMoreCancelBtn');
         seeMoreCancelBtn.addEventListener('click', () => {
            seeMore.classList.add('hidden');
            renderDetails();
         })
      
       
         /// Details modal page
      function renderDetails() {
        const category = categories.find(cat => cat.id === currentTask.category);
         taskDisplay.innerHTML = `
            <!---------Task  Title and Description----------->
            <div class="flex gap-3 justify-between items-center">
              <div class="flex flex-col space-y-1">
              <h3 id="editedTitle" class="mt-2 font-medium text-[24px] text-tertiary">${currentTask.title}</h3>
              ${currentTask.description ? `<p class="font-normal text-[18px] text-tertiary/70">${currentTask.description}</p>` : "}
              </div>
              <div>
                  <svg class="hover:scale-120 transition-all ease-in-out duration-300 cursor-pointer" id="titleDescriptionBtn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.53999 19.52C4.92999 19.52 4.35999 19.31 3.94999 18.92C3.42999 18.43 3.17999 17.69 3.26999 16.89L3.63999 13.65C3.70999 13.04 4.07999 12.23 4.50999 11.79L12.72 3.1C14.77 0.930003 16.91 0.870003 19.08 2.92C21.25 4.97 21.31 7.11 19.26 9.28L11.05 17.97C10.63 18.42 9.84999 18.84 9.23999 18.94L6.01999 19.49C5.84999 19.5 5.69999 19.52 5.53999 19.52ZM15.93 2.91C15.16 2.91 14.49 3.39 13.81 4.11L5.59999 12.81C5.39999 13.02 5.16999 13.52 5.12999 13.81L4.75999 17.05C4.71999 17.38 4.79999 17.65 4.97999 17.82C5.15999 17.99 5.42999 18.05 5.75999 18L8.97999 17.45C9.26999 17.4 9.74999 17.14 9.94999 16.93L18.16 8.24C19.4 6.92 19.85 5.7 18.04 4C17.24 3.23 16.55 2.91 15.93 2.91Z" fill="white" fill-opacity="0.87"/>
                  <path d="M17.3399 10.95C17.3199 10.95 17.2899 10.95 17.2699 10.95C14.1499 10.64 11.6399 8.27 11.1599 5.17C11.0999 4.76 11.3799 4.38 11.7899 4.31C12.1999 4.25 12.5799 4.53 12.6499 4.94C13.0299 7.36 14.9899 9.22 17.4299 9.46C17.8399 9.5 18.1399 9.87 18.0999 10.28C18.0499 10.66 17.7199 10.95 17.3399 10.95Z" fill="white" fill-opacity="0.87"/>
                  <path d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z" fill="white" fill-opacity="0.87"/>
                  </svg>
              </div>
            </div>



            <!------Task Time------>
            <div class="flex justify-between items-center">
              <div class="gap-3 flex items-center">
                  <svg class="hover:scale-120 transition-all ease-in-out duration-300 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22.75C6.76 22.75 2.5 18.49 2.5 13.25C2.5 8.01 6.76 3.75 12 3.75C17.24 3.75 21.5 8.01 21.5 13.25C21.5 18.49 17.24 22.75 12 22.75ZM12 5.25C7.59 5.25 4 8.84 4 13.25C4 17.66 7.59 21.25 12 21.25C16.41 21.25 20 17.66 20 13.25C20 8.84 16.41 5.25 12 5.25Z" fill="white" fill-opacity="0.87"/>
                  <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V8C11.25 7.59 11.59 7.25 12 7.25C12.41 7.25 12.75 7.59 12.75 8V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="white" fill-opacity="0.87"/>
                  <path d="M15 2.75H9C8.59 2.75 8.25 2.41 8.25 2C8.25 1.59 8.59 1.25 9 1.25H15C15.41 1.25 15.75 1.59 15.75 2C15.75 2.41 15.41 2.75 15 2.75Z" fill="white" fill-opacity="0.87"/>
                  </svg>
                  <div class="text-[14px] text-tertiary font-normal">Task Time:</div>
              </div>
              
              <div>
                   ${currentTask.dateTime ? `<p class="editDateTimeBtn font-normal text-[16px] text-tertiary bg-tertiary/30 hover:bg-secondary-light transition-all ease-in-out duration-300 cursor-pointer rounded-md py-2 px-4">${currentTask.dateTime}</p>` : "}
              </div>
            </div>

            <!------Task Category------->
            <div class="flex justify-between items-center">
              <div class="gap-3 flex items-center">
                  <svg class="hover:scale-120 transition-all ease-in-out duration-300 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0701 21.98C10.6601 21.98 9.24009 21.44 8.17009 20.37L3.64009 15.84C2.54009 14.74 1.96009 13.22 2.03009 11.67L2.27009 6.67C2.38009 4.28 4.27009 2.39 6.67009 2.27L11.6701 2.03C13.2201 1.97 14.7401 2.54 15.8401 3.64L20.3701 8.17C22.5201 10.32 22.5201 13.83 20.3701 15.98L15.9801 20.37C14.9001 21.44 13.4901 21.98 12.0701 21.98ZM4.70009 14.77L9.23009 19.3C9.99009 20.06 11.0001 20.48 12.0701 20.48C13.1401 20.48 14.1501 20.06 14.9101 19.3L19.3001 14.91C20.0601 14.15 20.4801 13.14 20.4801 12.07C20.4801 11 20.0601 9.99 19.3001 9.23L14.7701 4.7C13.9701 3.9 12.8601 3.47 11.7401 3.53L6.74009 3.77C5.11009 3.84 3.84009 5.11 3.76009 6.73L3.52009 11.73C3.47009 12.86 3.90009 13.97 4.70009 14.77Z" fill="white" fill-opacity="0.87"/>
                  <path d="M9.5 12.75C7.71 12.75 6.25 11.29 6.25 9.5C6.25 7.71 7.71 6.25 9.5 6.25C11.29 6.25 12.75 7.71 12.75 9.5C12.75 11.29 11.29 12.75 9.5 12.75ZM9.5 7.75C8.54 7.75 7.75 8.54 7.75 9.5C7.75 10.46 8.54 11.25 9.5 11.25C10.46 11.25 11.25 10.46 11.25 9.5C11.25 8.54 10.46 7.75 9.5 7.75Z" fill="white" fill-opacity="0.87"/>
                  </svg>

                  <div class="text-[14px] text-tertiary font-normal">Task Category:</div>
                </div>
              
                <div>
                  ${currentTask.category ?`
                  <div class="editCategoryIcon flex items-center justify-center gap-2 bg-tertiary/30 rounded-md py-2 px-4 hover:bg-secondary-light transition-all ease-in-out duration-300 cursor-pointer">
                  <div class="w-full h-auto rounded  flex justify-between gap-1">
                  <div class="[&>svg]:w-5 [&>svg]:h-5">${category.icon}</div>
                  <span class="text-[14px] text-tertiary">${category.name}</span>
                  </div> 
                  </div>
                  ` : "}
                </div> </div>
              
                

                <!------Task Priority------>
                  <div class="flex justify-between items-center">
                  <div class="gap-3 flex items-center">
                  <svg class="hover:scale-120 transition-all ease-in-out duration-300 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.1499 22.75C4.7399 22.75 4.3999 22.41 4.3999 22V2C4.3999 1.59 4.7399 1.25 5.1499 1.25C5.5599 1.25 5.8999 1.59 5.8999 2V22C5.8999 22.41 5.5599 22.75 5.1499 22.75Z" fill="white" fill-opacity="0.87"/>
                  <path d="M16.3499 16.75H5.1499C4.7399 16.75 4.3999 16.41 4.3999 16C4.3999 15.59 4.7399 15.25 5.1499 15.25H16.3499C17.4399 15.25 17.9499 14.96 18.0499 14.71C18.1499 14.46 17.9999 13.9 17.2199 13.13L16.0199 11.93C15.5299 11.5 15.2299 10.85 15.1999 10.13C15.1699 9.37 15.4699 8.62 16.0199 8.07L17.2199 6.87C17.9599 6.13 18.1899 5.53 18.0799 5.27C17.9699 5.01 17.3999 4.75 16.3499 4.75H5.1499C4.7299 4.75 4.3999 4.41 4.3999 4C4.3999 3.59 4.7399 3.25 5.1499 3.25H16.3499C18.5399 3.25 19.2399 4.16 19.4699 4.7C19.6899 5.24 19.8399 6.38 18.2799 7.94L17.0799 9.14C16.8299 9.39 16.6899 9.74 16.6999 10.09C16.7099 10.39 16.8299 10.66 17.0399 10.85L18.2799 12.08C19.8099 13.61 19.6599 14.75 19.4399 15.3C19.2099 15.83 18.4999 16.75 16.3499 16.75Z" fill="white" fill-opacity="0.87"/>
                  </svg>

                  <div class="text-[14px] text-tertiary font-normal">Task Priority:</div>
              </div>
              
              <div>
                  ${currentTask.priority ? `<div class="editPriorityIcon hover:bg-secondary-light transition-all ease-in-out duration-300 cursor-pointer  text-sm text-tertiary flex justify-between items-center gap-2 bg-tertiary/30 rounded-md py-2 px-4">
                  <svg class=" w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                    <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                      </svg>
                  ${currentTask.priority}</div>` : "}
                  </div>
                </div>

              <!--------DELATE BUTTON--------->
              <div class="delateTaskBtn flex items-center gap-3">
              <svg class="hover:scale-120 transition-all ease-in-out duration-300 cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.9999 6.73001C20.9799 6.73001 20.9499 6.73001 20.9199 6.73001C15.6299 6.20001 10.3499 6.00001 5.11992 6.53001L3.07992 6.73001C2.65992 6.77001 2.28992 6.47001 2.24992 6.05001C2.20992 5.63001 2.50992 5.27001 2.91992 5.23001L4.95992 5.03001C10.2799 4.49001 15.6699 4.70001 21.0699 5.23001C21.4799 5.27001 21.7799 5.64001 21.7399 6.05001C21.7099 6.44001 21.3799 6.73001 20.9999 6.73001Z" fill="#FF4949"/>
              <path d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z" fill="#FF4949"/>
              <path d="M15.2099 22.75H8.7899C5.2999 22.75 5.1599 20.82 5.0499 19.26L4.3999 9.19C4.3699 8.78 4.6899 8.42 5.0999 8.39C5.5199 8.37 5.8699 8.68 5.8999 9.09L6.5499 19.16C6.6599 20.68 6.6999 21.25 8.7899 21.25H15.2099C17.3099 21.25 17.3499 20.68 17.4499 19.16L18.0999 9.09C18.1299 8.68 18.4899 8.37 18.8999 8.39C19.3099 8.42 19.6299 8.77 19.5999 9.19L18.9499 19.26C18.8399 20.82 18.6999 22.75 15.2099 22.75Z" fill="#FF4949"/>
              <path d="M13.6601 17.25H10.3301C9.92008 17.25 9.58008 16.91 9.58008 16.5C9.58008 16.09 9.92008 15.75 10.3301 15.75H13.6601C14.0701 15.75 14.4101 16.09 14.4101 16.5C14.4101 16.91 14.0701 17.25 13.6601 17.25Z" fill="#FF4949"/>
              <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="#FF4949"/>
              </svg>

                <div class="text-[#FF4949] text-[14px] font-normal">Delete Task</div>   
            </div>
            `;

         
          ///TITTLE AND DESCRIPTION LOGIC
          const titleDescriptionBtn = document.getElementById('titleDescriptionBtn');
          const openTitleEdit = document.getElementById('openTitleEdit');
          const editTitleInput = document.getElementById('editTitleInput');
            titleDescriptionBtn.addEventListener('click', () => {
              openTitleEdit.classList.remove('hidden');
              renderEditTittle();
            });
        
            }
       
      
      

          function renderEditTittle() {
              editTitleInput.innerHTML = `
              <!------Tittle------->
              <input 
              type="text"
              id="editTaskTitle"
              placeholder="${currentTask.title}"
              class="py-2 px-4 bg-secondary-light w-full text-tertiary/50 border-tertiary/50 text-[16px] rounded-sm border-2"
              />
              <!------Additional Input------>
              <button id="descriptionBtnEdit" 
              class="mt-2 text-tertiary/50 text-[18px] mb-1"
              >${currentTask.description}</button>
              <input type="text"
              id="editAddInfo"
              placeholder="${currentTask.description}"
              class="hidden mt-2 py-2 px-4 bg-secondary-light w-full text-tertiary/50 border-tertiary/50 text-[16px] rounded-sm border-2"
              />
            `;
            const descriptionBtnEdit = document.getElementById('descriptionBtnEdit');
            const editAddInfo = document.getElementById('editAddInfo');

            descriptionBtnEdit.addEventListener('click', () => {
              console.log('What??')
                editAddInfo.classList.remove('hidden');
                descriptionBtnEdit.classList.add('hidden')
            });
          }

        /// EDITING LOGIC /// EDITING LOGIC /// EDITING LOGIC 
        /// EDITING LOGIC /// EDITING LOGIC /// EDITING LOGIC 
        /// EDITING LOGIC /// EDITING LOGIC /// EDITING LOGIC 
        const editedTitle = document.getElementById('editedTitle')
       //Temp editing storage
        let editTempTitle = '';
        let editTempDescription = '';


        //More details cancel logic
        const cancelEditTitle = document.getElementById('cancelEditTitle');
        cancelEditTitle.addEventListener('click', () => {
            openTitleEdit.classList.add('hidden');
        });

        ///Save Title logic ///Save Title logic ///Save Title logic
        function editTitle() {
           const value = editTaskTitle.value.trim();
           if (value === '') return;
            
           editTempTitle = value;
           currentTask.title = editTempTitle;
        }

         /// Save description logic/// Save description logic
            function editDescription() {
              const value = editAddInfo.value.trim();
              if (value === '') return;
                
               editTempDescription = value;
              currentTask.description = editTempDescription;
            }

        /// Save Title and Description Edit
        const saveEditTitle = document.getElementById('saveEditTitle');
        saveEditTitle.addEventListener('click', () => {
            editTitle();
            editDescription();
            openTitleEdit.classList.add('hidden');  
            renderDetails();        
        });


      // Components initialization /// Components initialization
      // Components initialization /// Components initialization
      // Components initialization /// Components initialization
      
      // PRIORITY INITIALIZATION
      document.addEventListener('click', (e) => {
            if (e.target.closest(".editPriorityIcon")) {
                initPriorityComponent({
                initialValue: currentTask.priority,
                onSave: (value) => {
                  currentTask.priority = value;
                  renderDetails();  
                }
              });
            }
        }); 
        
        //CATEGORY INITIALIZATION
        document.addEventListener('click', (e) => {
            if(e.target.closest(".editCategoryIcon")) {
                initCategoryComponent({
                initialValue: currentTask.category,
                onSave: (value) => {
                  currentTask.category = value;
                  
                  renderDetails();
                }
            });
            }
        });
        

        // DATETIME INITIALIZATION
        document.addEventListener('click', (e) => {
            if(e.target.closest(".editDateTimeBtn")) {
                initDateTimeComponent({
                initialValue: currentTask.dateTime,
                onSave: (value) => {
                  currentTask.dateTime = value;

                  renderDetails();
                }
            });
            }
        });
  
      

      /// DELATE TASKS /// DELATE TASKS/// DELATE TASKS
      /// DELATE TASKS /// DELATE TASKS /// DELATE TASKS
     document.addEventListener('click', (e) => {
            if(e.target.closest(".delateTaskBtn")) {
                console.log(currentTask.id);
                console.log(tasks);
                tasks = tasks.filter(task => task.id !== currentTask.id);
                seeMore.classList.add('hidden');
                saveTasksToStorage();
                renderTasks();
            }
        });
      /// SAVE EDITED CHANGES /// SAVE EDITED CHANGES /// SAVE EDITED CHANGES 
      const saveEditTask = document.getElementById('saveEditTask');

      saveEditTask.addEventListener('click', () => {
        renderTasks();
        renderDashboard();
        saveTasksToStorage();
        seeMore.classList.add('hidden');
      });

  });
}
renderTasks();
    
 




    

  








