
export function  footerRender({ isProfile = false } = {}) {
           return `
      <!------Home----->
            <img src="./images/03-index-screen-home/home-2.png" id="homeNav" class="w-auto hover:scale-150 transition-all ease-in-out duration-300 cursor-pointer" alt="">
      <!------Calender----->
            <img src="./images/03-index-screen-home/calendar.png" class="w-auto hover:scale-150 transition-all ease-in-out duration-300 cursor-pointer" alt="">
      <!------Add Icon----->
          <div class="absolute left-1/2 -translate-x-1/2 -top-6 z-10">
            <button id="addTaskBtn" class="bg-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-150 transition-all ease-in-out duration-300 cursor-pointer">
                <img src="./images/03-index-screen-home/add.png"  class="w-10" alt="">
            </button>
        </div>
        <!------Focus----->
            <img src="./images/03-index-screen-home/clock.png" class="w-auto hover:scale-150 transition-all ease-in-out duration-300 cursor-pointer" alt="">
        <!------User----->
            <img src="./images/03-index-screen-home/user.png" id="profileNav"  class="w-auto hover:scale-150 transition-all ease-in-out duration-300 cursor-pointer" alt="">
  `;


}


document.addEventListener('click', (e) => {
    //Home Nav Logic
  if(e.target.id === 'homeNav') {
    window.location.href = '/dashboard.html';  
  }
  //Profile Nav Logic
  if(e.target.id === 'profileNav') {
    window.location.href = '/profile.html';
  }
});