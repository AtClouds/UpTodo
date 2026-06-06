import {getCategories, deleteCategory, } from '../data/categories.js';
import {icons} from '../data/icons.js';

///Category Pop-Up ///Category Pop-Up ///Category Pop-Up
///Category Pop-Up ///Category Pop-Up ///Category Pop-Up
export let tempCategory = null;
export function setTempCategory(value) {
    tempCategory = value;
}



const locationPopup = document.getElementById('locationPopup');
    const categoryContainer = document.getElementById('categoryContainer');
    const saveCategoryBtn = document.getElementById('saveCategoryBtn');
    const createNewModal = document.getElementById('createNewModal');
    const openIconPicker = document.getElementById('openIconPicker');
    const iconGrid = document.getElementById('iconGrid');
    const iconGridDisplay = document.getElementById('iconGridDisplay');
    const colorItem = document.querySelectorAll('.color-item');
    const cancelCreateBtn = document.getElementById('cancelCreateBtn');
    const saveCreateBtn = document.getElementById('saveCreateBtn');
    const categoryNameInput = document.getElementById('categoryNameInput');

    let selectedCategory = null;
    let selectedIcon = '';
    let selectedColor = null;

        /// CATEGORY RENDERING
      function renderCategories() {
      const categories = getCategories();
      categoryContainer.innerHTML = '';

      categories.forEach(cat => {
      const div = document.createElement('div');
      
      div.className = "category-wrapper text-center space-y-3 group relative";
      div.dataset.id = cat.id;
      div.innerHTML = `
      <div>
      <div class="h-25 rounded-md flex flex-col items-center justify-center text-white cursor-pointer hover:bg-primary/80 transition "
      style="background-color: ${cat.color}">
        ${cat.icon}

      <!-- DELETE BUTTON -->
      <button class="delete-btn hidden group-hover:block  cursor-pointer absolute top-0 right-0 text-tertiary text-[18px] mt-1 mr-2  rounded">
       ✕
      </button>
      </div>
      <span class="text-[18px] text-white">${cat.name}</span>
       </div>
      `;
      ///CLICK LOGIC
      div.addEventListener('click', () => {
          selectedCategory = cat.id;
      });

      categoryContainer.appendChild(div);
      });

  
      const addBtn = document.createElement('div');
      addBtn.className = "flex flex-col items-center cursor-pointer";

      addBtn.innerHTML = `
      <div class="text-center space-y-3">
      <div class="h-25 rounded-md flex flex-col items-center justify-center text-white cursor-pointer bg-[#80FFD1] transition"
      style="background-color: #80FFD1">
        <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.9375 17.4375H13.5625V29.0625C13.5625 30.131 14.4315 31 15.5 31C16.5685 31 17.4375 30.131 17.4375 29.0625V17.4375H29.0625C30.131 17.4375 31 16.5685 31 15.5C31 14.4315 30.131 13.5625 29.0625 13.5625H17.4375V1.9375C17.4375 0.86896 16.5685 0 15.5 0C14.4315 0 13.5625 0.86896 13.5625 1.9375V13.5625H1.9375C0.86896 13.5625 0 14.4315 0 15.5C0 16.5685 0.86896 17.4375 1.9375 17.4375Z" fill="#00A369"/>
        </svg>
        </div>
        <span class="text-[18px] text-white">Create New</span>
        </div>
      `;

      categoryContainer.appendChild(addBtn);


      ///OPen the Create New Modal
      addBtn.addEventListener('click', () => {
        createNewModal.classList.remove('hidden');
        createNewModal.classList.add('fixed');
        });
  

      // Delate button 
      categoryContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.delete-btn');
      if (!btn) return;

      e.stopPropagation();

      const categoryCard = btn.closest('.category-wrapper');
      const id = Number(categoryCard.dataset.id);

      deleteCategory(id);
      getCategories();
      renderCategories();
    });
      }

          //RESET 
    function reset() {
         selectedIcon = '';
         selectedColor = null;
    }

export function initCategoryEvent() {
    //CLOSE POPUP
    locationPopup.addEventListener("click", (e) => {
    if (e.target === locationPopup) {
      locationPopup.classList.add("hidden");
    }
    });

    // open icon library
    openIconPicker.addEventListener('click', () => {
    iconGrid.classList.remove('hidden');  
    });
    // Cancel create new category
    cancelCreateBtn.addEventListener('click', () => {
      createNewModal.classList.add('hidden')
    });

     /// Create Choose icon from library
    icons.forEach(item => {
      const div = document.createElement('div');

    div.innerHTML = item.svg;

    div.className = `
      icon-item
      flex items-center justify-center
      h-12 w-12 rounded-lg 
      cursor-pointer transition-all duration-200 hover:scale-110 
    `;

    div.addEventListener('click', () => {
      //remove highlight from all
      document.querySelectorAll(".icon-item").forEach(el => {
      el.classList.remove("scale-130");
      });

      //add highlight to selected
      div.classList.add("scale-130");

      selectedIcon = item.svg;
      iconGrid.classList.add('hidden');

      console.log('Selected icon:', selectedIcon);
    });
      iconGridDisplay.appendChild(div);
    });


    /// Choose new color 
    colorItem.forEach(item => {
    item.addEventListener('click', () => {
      
      //remove highlight from all
      document.querySelectorAll('.check').forEach(c => {
      c.classList.add('hidden');
    });
      // highlight selected
      const check = item.querySelector('.check');
      if (check) {
      check.classList.remove('hidden');
      }


    //save selected color
      selectedColor = item.dataset.color;
    })
    });


   
    ///Save create category 
    saveCreateBtn.onclick = () => {
    let name = categoryNameInput.value.trim();
    if (!name) return;
    
   let freshCategories = getCategories();
   let newCategory = {
      id: Date.now(),
      name: name,
      icon: selectedIcon,
      color: selectedColor
    };

    freshCategories.push(newCategory);
    localStorage.setItem("categories", JSON.stringify(freshCategories));
    renderCategories();
    categoryNameInput.value = '';
    createNewModal.classList.add('hidden');
     reset();
    }
}


export function initCategoryComponent({initialValue = null, onSave}) {
    selectedCategory = initialValue;
    saveCategoryBtn.onclick = null;

    // OPEN POPUP
    locationPopup.classList.remove('hidden');
    locationPopup.classList.add('fixed');
    renderCategories();

    

    // save category
    saveCategoryBtn.onclick = () => {
      if(!selectedCategory) return;
      locationPopup.classList.add("hidden");
      setTempCategory(selectedCategory);
      if (onSave) {
        onSave(selectedCategory);
      }
    }

}
