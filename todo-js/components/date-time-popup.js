import {months} from '../data/calender.js';

export let tempDateTime = null;
export function setTempDateTime(value) {
    tempDateTime = value;
}
/// CALENDER/TIME LOGIC /// CALENDER/TIME LOGIC
/// CALENDER/TIME LOGIC /// CALENDER/TIME LOGIC
export function initDateTimeComponent({initialValue = null, onSave}) {
    const dateTimeBtn = document.getElementById('date-time-btn');
    const dateTimeOpen = document.getElementById('date-time-open');
    const daysContainer = document.getElementById('daysContainer');
    const chooseTimeBtn = document.getElementById('chooseTimeBtn');
    const calenderCloseBtn = document.getElementById('calenderCloseBtn');
    const nextMonth = document.getElementById('nextMonth');
    const prevMonth = document.getElementById('prevMonth');
    const monthDisplay = document.getElementById('monthDisplay');
    const yearDisplay = document.getElementById('yearDisplay');
    const timeBtn = document.getElementById('timeBtn');
    const timeOutPut = document.getElementById('timeOutPut');
    const hourDisplay = document.getElementById('hourDisplay');
    const hourBtn = document.getElementById('hourBtn');
    const increase = document.getElementById('increase');
    const decrease = document.getElementById('decrease');
    const saveHourBtn = document.getElementById('saveHourBtn');
    const minuteDisplay = document.getElementById('minuteDisplay');
    const minuteBtn = document.getElementById('minuteBtn');
    const increaseMin = document.getElementById('increaseMin');
    const decreaseMin = document.getElementById('decreaseMin');
    const saveMinBtn = document.getElementById('saveMinBtn');
    const periodDisplay = document.getElementById('periodDisplay');
    const timeCloseBtn = document.getElementById('timeCloseBtn');
    const saveDateTimeBtn = document.getElementById('saveDateTimeBtn');

    let selectedDay = null;
    let selectedTime = null;
    let selectedElement = null;
    let selectedMonth = 'April';
    let selectedYear = '2026';
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let tempDate = null;
    let tempTime = null;

    let selectedDateTime = initialValue;

    // OPEN CALENDER
    dateTimeOpen.classList.remove('hidden');
    dateTimeOpen.classList.add('fixed');
    renderCalender();

    //Close pop-up
    dateTimeOpen.addEventListener("click", (e) => {
    if (e.target === dateTimeOpen) {
      dateTimeOpen.classList.add("hidden");
      resetModal();
      }
    });

    // RENDER DAYS
    function renderCalender() {
    daysContainer.innerHTML = '';

    //Create Empty space
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      const emptyDiv = document.createElement('div');
      daysContainer.appendChild(emptyDiv);
    }

  
    ///Month display
    monthDisplay.textContent = `${months[currentMonth]}`;
    ///Year display
    yearDisplay.textContent = `${currentYear}`;

    //Create days in a month
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let m = 1; m <= totalDays; m++) {
      const div = document.createElement('div');

      div.className = 'flex justify-center items-center text-tertiary bg-secondary px-5 py-2 rounded-md cursor-pointer ';  


    if (m === new Date().getDate()){
      div.classList.remove('bg-secondary')
      div.classList.add('secondary-light')
    }

    div.textContent = m;     
    daysContainer.appendChild(div);

    const dayValue = m;



    div.addEventListener('click', () => {
      selectedDay = dayValue;


      //remove highlight 
      if (selectedElement) {
        selectedElement.classList.remove('bg-primary');
        selectedElement.classList.add('bg-secondary');
      }
      //add highlight
      div.classList.remove('bg-secondary');
      div.classList.add('bg-primary');
      selectedElement = div;  
    });
    }}


    //NEXT BUTTON /// NEXT BUTTON
    nextMonth.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
      }
      renderCalender();
    });

    /// PREVIOUS BUTTON /// PREVIOUS BUTTON
    prevMonth.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        renderCalender();
    });

    //SAVE DATE/ CHOOSE TIME BUTTON
    chooseTimeBtn.addEventListener('click', () => {
      console.log('Choose me')
        /// SAVE DATE
        if(!selectedDay) return;

        if (selectedDay === new Date().getDate()) {
          tempDate = 'Today At';
        } else(
          tempDate = `${selectedDay} ${selectedMonth}, ${selectedYear}`
        )

        /// OPEN TIME  
        timeBtn.classList.remove('hidden')
        timeBtn.classList.add('fixed');
    })




    /// TIME LOGIC /// TIME LOGIC /// TIME LOGIC /// TIME LOGIC
    /// TIME LOGIC /// TIME LOGIC /// TIME LOGIC /// TIME LOGIC
    ///HOUR ///HOUR
    let selectedHour = new Date().getHours();
    // convert 24hr → 12hr
    if (selectedHour > 12) {
      selectedHour -= 12;
    }
    if (selectedHour === 0) {
      selectedHour = 12;
    }
    /// Render Hour
    function renderHour() {
      hourDisplay.textContent = selectedHour;
    }
    renderHour();


    
    //Increase button
    increase.addEventListener('click', () => {
      selectedHour++;

      if (selectedHour > 12) {
        selectedHour = 1;
      }

      renderHour();
    }); 

    //Decrease button
    decrease.addEventListener('click', () => {
    selectedHour--;

    if (selectedHour < 1) {
      selectedHour = 12;
    }

    renderHour();
    }); 

    //open select
    hourDisplay.addEventListener('click', () => {
        hourBtn.classList.remove('hidden');
        console.log('Open up son')
    });

    /// close Hour Button UI
    saveHourBtn.addEventListener('click', () => {
       hourBtn.classList.add('hidden'); 
    });

    
    /// MINUTES /// MINUTES
    let selectedMinute = new Date().getMinutes();

    // Render minutes
    function renderMinutes() {
      minuteDisplay.textContent = selectedMinute;
    }
    renderMinutes();

    // Increase Minute
    increaseMin.addEventListener('click', () => {
      selectedMinute++;

      if (selectedMinute > 60) {
        selectedMinute = 0;
      }

      renderMinutes();
    });

    // Decrease Minute
    decreaseMin.addEventListener('click', () => {
      selectedMinute--;

      if(selectedMinute < 1) {
        selectedMinute = 0;
      }

      renderMinutes();
    });
    // Open selector
    minuteDisplay.addEventListener('click', () => {
      minuteBtn.classList.remove('hidden');
    });
    // save/close minute
    saveMinBtn.addEventListener('click', () => {
      minuteBtn.classList.add('hidden');
    })

    /// PERIOD ///PERIOD
   let selectedPeriod = new Date().getHours() >= 12 ? "PM" : "AM";
    
    function renderPeriod() {
      periodDisplay.textContent = selectedPeriod;
    }
    renderPeriod();

    periodDisplay.addEventListener('click', () => {
    selectedPeriod = selectedPeriod === "AM" ? "PM" : "AM";
    renderPeriod();
    });


    /// CLOSE BUTTON
    calenderCloseBtn.addEventListener('click', () => {
        dateTimeOpen.classList.add('hidden');
    });
    /// BACK TO CALENDER BUTTON
    timeCloseBtn.addEventListener('click', () => {
        timeBtn.classList.add('hidden')
        dateTimeOpen.classList.remove('hidden');
    })
    ///SAVE BOTH DATE AND TIME 
    saveDateTimeBtn.addEventListener('click', () => {
      tempTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
      selectedDateTime = `${tempDate} ${tempTime}`;
      //close calender and time
      timeBtn.classList.add('hidden')
      dateTimeOpen.classList.add('hidden');
      setTempDateTime(selectedDateTime);  
      if (onSave) {
        onSave(selectedDateTime);
      }
    });    
}
