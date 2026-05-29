let renderIntroHTML = '';

function renderIntroPage() {
    renderIntroHTML += `
        <section id="Intro" class="flex flex-col justify-center items-center w-auto h-screen
        mx-auto p-5 bg-secondary">

        <!---------UpTodo App on open--------->
        <div class="flex flex-col justify-center items-center">
        <!----UpTodo Logo---->
        <img src="images/01-Intro/Vector.png" class="w-auto" alt="logo">
        <!--------App Name---------->
        <h1 class="text-tertiary font-bold text-[30px] mt-2">UpTodo</h1>
        </div>

        </section>
    


        <!----------SlideShow-------->
        <section id="slideCard" class="bg-secondary flex flex-col relative min-h-screen overflow-hidden hidden p-5">
        
            <button id="skipBtn"
            class="text-secondary-light py-3 px-3 rounded-md z-50 hover:bg-secondary-light hover:text-tertiary-gray hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer absolute top-6 left-6">
                SkIP
            </button>

        <!------SLides Wrapper----->
        <div id="slideWrapper" class="flex transition-transform duration-500 ease-in-out">

        <!------SlideShow One------->
            <div class="slide flex flex-col justify-center items-center p-4 min-w-full space-y-8 ">
            <!-----Image---->
            <div>
            <img src="images/01-Intro/Group 182.png" class="min-w-20 mt-20" alt="slide image">
            </div>

            <!-----Dots Highlight---->
            <div class="flex gap-2 mb-6 mt-5">
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
            </div>

            <!----TEXT---->
            <div class="flex flex-col justify-center items-center">
                <!----Title---->
            <h1 class="text-tertiary font-bold text-[30px] text-center">
                Manage your tasks</h1>

            <!-----Contexts---->
            <div class="w-[85%]">
            <p class="text-tertiary font-normal text-[14px] mt-2  text-center">You can easily manage all of your daily tasks in DoMe for free</p></div>
            </div>
         </div>

        <!------SlideShow Two------->
            <div class="slide flex flex-col min-w-full justify-center p-4 items-center space-y-8">
            <!-----Image---->
            <div>
            <img src="images/01-Intro/Frame 162.png" class="min-w-20 mt-20" alt="slide image">
                </div>

            <!-----Dots Highlight---->
            <div class="flex gap-2 mb-6 mt-5">
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
            </div>

            <!-----TEXT----->
            <div class="flex flex-col justify-center items-center">
            <!----Title---->
            <h1 class="text-tertiary font-bold text-[30px]  text-center">
                Create daily routine</h1>

            <!-----Contexts---->
            <div class="w-[85%]">
            <p class="text-tertiary font-normal text-[14px] mt-2 text-center">In Uptodo  you can create your personalized routine to stay productive</p>
            </div>
            </div>
      </div>

      
        <!------SlideShow Three------->
            <div class="slide flex flex-col min-w-full justify-center p-4 items-center space-y-8">
            <!-----Image---->
            <div>
            <img src="images/01-Intro/Frame 161.png" class="min-w-20 mt-20" alt="slide image">
                </div>

            <!-----Dots Highlight---->
            <div class="flex gap-2 mb-6 mt-5">
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
                <span class="dot w-5 h-1 bg-gray rounded-sm"></span>
            </div>

            <!----TEXT---->
            <div class="flex flex-col justify-center items-center">
            <!----Title---->
            <h1 class="text-tertiary font-bold text-[30px] text-center">
               Organize your tasks</h1>

            <!-----Contexts---->
            <div class="w-[85%]">
            <p class="text-tertiary font-normal text-[14px] mt-2 text-center">You can organize your daily tasks by adding your tasks into separate categories</p></div>
            </div>
            </div>
      </div>

        <!---------BOTTOM BUTTONS-------->
         <div class="absolute bottom-6 left-0 px-6 w-full flex justify-between">
        
            <!-----BACK BUTTON----->
            <button id="backBtn"
            class="text-secondary-light  hover:bg-secondary-light py-3 px-3 rounded-md hover:text-tertiary-gray hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer">
                BACK
            </button>
            <!-----NEXT BUTTON----->
            <button id="nextBtn"
                class="text-tertiary bg-primary  py-3 px-3 rounded-md  hover:bg-primary/50 hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer">
                NEXT
            </button>
            <!-----GET STARTED BUTTON----->
            <button id="startBtn"
                class="text-tertiary bg-primary hidden  hover:bg-primary/50 py-3 px-3 rounded-md hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer">
                GET STARTED
            </button>
        </div>
        </section>
    `;
    
    let introduction = document.querySelector('.introduction');
    introduction.innerHTML = renderIntroHTML;
}
renderIntroPage(); //Rendering Page 



const appIntro = document.getElementById('Intro');
const slideCard = document.getElementById('slideCard');
const slideWrapper = document.getElementById('slideWrapper');

const nextBtn = document.getElementById('nextBtn');
const backBtn = document.getElementById('backBtn');
const skipBtn = document.getElementById('skipBtn');
const startBtn = document.getElementById('startBtn');

const slide = document.querySelectorAll('.slide');




//The intro section first and adding slide 
setTimeout(() => {
    appIntro.classList.add('hidden'); //hides the app intro after 3sec
    slideCard.classList.remove('hidden'); //remove the hidden class after 3sec
    
    startAutoSlide();
}, 3000);



let currentSlide = 0;
let autoSlideInterval;

function updateSlide() {
    //slide animation
    slideWrapper.style.transform = `translateX(-${currentSlide * 100}%)`; 

    const currentDots = slide[currentSlide].querySelectorAll('.dot');
     // Update dots
        currentDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('bg-tertiary');
                dot.classList.remove('bg-gray');
            } else {
                dot.classList.remove('bg-tertiary');
                dot.classList.add('bg-gray')
            }
        });



    // Back Button
    if (currentSlide === 0) {
    backBtn.classList.add('opacity-0', 'pointer-events-none');
    } else {
    backBtn.classList.remove('opacity-0', 'pointer-events-none');
    }

    // Next / Get Started
    if (currentSlide === slide.length - 1) {
    nextBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    } else {
    nextBtn.classList.remove('hidden');
    startBtn.classList.add('hidden');
    }

}
updateSlide();

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {

        if (currentSlide < slide.length - 1) {
            currentSlide++;
            updateSlide();
        }else{
            clearInterval(autoSlideInterval); //Stop here
        }

        updateSlide();
    }, 5000)
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

skipBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    window.location.href ="/registration.html";
});


backBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide();
        resetAutoSlide();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSlide < slide.length - 1) {
        currentSlide++;
        updateSlide();
        resetAutoSlide()
    }
});

startBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    window.location.href ="/registration.html";
});

