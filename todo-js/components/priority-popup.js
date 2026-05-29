import {renderPriority} from '../data/priority.js';


///priority///priorityBtn///priority///priorityBtn
///priority///priorityBtn///priority///priorityBtn
export let tempPriority = null;
export function setTempPriority(value) {
    tempPriority = value;
}

export function initPriorityComponent({initialValue = null, onSave}) {
    const priorityPopup = document.getElementById('priorityPopup');
    renderPriority(priorityPopup);
    const priorityTab = document.querySelectorAll('.priorityTab');
    const cancelPriority = document.getElementById('cancelPriority');
    const savePriority = document.getElementById('savePriority');

  
    let selectedPriority = initialValue;

    //OPEN POPUP
    priorityPopup.classList.remove('hidden');
    priorityPopup.classList.add('fixed');

    //CLOSE POPUP
    priorityPopup.addEventListener("click", (e) => {
    if (e.target === priorityPopup) {
      priorityPopup.classList.add("hidden");
    }
    });

     // RESET OLD LISTENERS
      savePriority.onclick = null;
      cancelPriority.onclick = null;

      priorityTab.forEach(tab => tab.onclick = null);

    // SELECT PRIORITY
    priorityTab.forEach((tab) => {
      tab.onclick = () => {
   
    priorityTab.forEach(t => {
      t.classList.remove('bg-primary');
      t.classList.add('bg-secondary/40');
    });

    tab.classList.remove('bg-secondary/40');
    tab.classList.add('bg-primary');

    selectedPriority = tab.dataset.value;
    };

    });


    // CANCEL
    cancelPriority.addEventListener('click', () => {
        priorityPopup.classList.add('hidden')
    })

    // SAVE
    savePriority.addEventListener('click', () => {
      priorityPopup.classList.add('hidden')
      priorityTab.forEach(t => {
        t.classList.remove('bg-primary');
        t.classList.add('bg-secondary/40');
      });
      setTempPriority(selectedPriority);
      if (onSave) {
        onSave(selectedPriority);
      }
    });
}