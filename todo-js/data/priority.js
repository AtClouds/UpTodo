export function renderPriority(priorityPopup) {
    //const priorityPopup = document.getElementById('priorityPopup');
    priorityPopup.innerHTML = `
                            <div class="bg-secondary-light w-full max-w-md p-5 items-center justify-center rounded-sm shadow-lg max-h-[90vh] overflow-y-auto">
                        <!----Title---->
                        <h1 class="text-tertiary text-[18px] text-center font-normal">Task Priority</h1>
                        <!-----Border line-->
                        <div class="w-full h-[1px] bg-tertiary-gray my-3"></div>

                        <!---Priority List---->
                        <div class="w-full grid grid-cols-4 gap-3">

                            <!---Priority 1--->
                            <div  data-value="1"  class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all  cursor-pointer ">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                            </svg>
                                <p class="text-tertiary text-[14px] font-normal">1</p>
                            </div>

                             <!---Priority 2--->
                            <div data-value="2" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">2</p>
                            </div>

                             <!---Priority 3--->
                            <div data-value="3" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">3</p>
                            </div>

                             <!---Priority 4--->
                            <div  data-value="4" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">4</p>
                            </div>

                             <!---Priority 5--->
                            <div data-value="5" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">5</p>
                            </div>

                             <!---Priority 6--->
                            <div value="6" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">6</p>
                            </div>

                             <!---Priority 7--->
                            <div data-value="7" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">7</p>
                            </div>

                             <!---Priority 8--->
                            <div data-value="8" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">8</p>
                            </div>

                             <!---Priority 9--->
                            <div data-value="9" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">9</p>
                            </div>

                             <!---Priority 10--->
                            <div data-value="10" class="priorityTab bg-secondary/40 flex flex-col rounded-sm p-4 justify-center items-center hover:bg-primary/30 transition-all ease-in-out cursor-pointer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15002 22.75C4.74002 22.75 4.40002 22.41 4.40002 22V2C4.40002 1.59 4.74002 1.25 5.15002 1.25C5.56002 1.25 5.90002 1.59 5.90002 2V22C5.90002 22.41 5.56002 22.75 5.15002 22.75Z" fill="white" fill-opacity="0.87"/>
                                <path d="M16.35 16.75H5.15002C4.74002 16.75 4.40002 16.41 4.40002 16C4.40002 15.59 4.74002 15.25 5.15002 15.25H16.35C17.44 15.25 17.95 14.96 18.05 14.71C18.15 14.46 18 13.9 17.22 13.13L16.02 11.93C15.53 11.5 15.23 10.85 15.2 10.13C15.17 9.37 15.47 8.62 16.02 8.07L17.22 6.87C17.96 6.13 18.19 5.53 18.08 5.27C17.97 5.01 17.4 4.75 16.35 4.75H5.15002C4.73002 4.75 4.40002 4.41 4.40002 4C4.40002 3.59 4.74002 3.25 5.15002 3.25H16.35C18.54 3.25 19.24 4.16 19.47 4.7C19.69 5.24 19.84 6.38 18.28 7.94L17.08 9.14C16.83 9.39 16.69 9.74 16.7 10.09C16.71 10.39 16.83 10.66 17.04 10.85L18.28 12.08C19.81 13.61 19.66 14.75 19.44 15.3C19.21 15.83 18.5 16.75 16.35 16.75Z" fill="white" fill-opacity="0.87"/>
                                </svg>
                                <p class="text-tertiary text-[14px] font-normal">10</p>
                            </div>
                        </div>

                        <!----Buttons----->
                        <div class="flex w-full items-center justify-between mt-5">     
                                <button  id="cancelPriority" class="w-1/2 text-tertiary text-[18px]  py-4 px-8 rounded-md bg-secondary-light hover:bg-secondary transition-all ease-in-out duration-300 cursor-pointer">Cancel</button>
                            
                                <button  id="savePriority" class="w-1/2 text-tertiary text-[18px]  py-4 px-8 rounded-md bg-primary hover:bg-primary/20 transition-all ease-in-out duration-300 cursor-pointer">Save</button>                            
                        </div>
                    </div>
    `;
}