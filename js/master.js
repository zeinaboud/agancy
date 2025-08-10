/*start setting box*/
//check if there is local storage option--color 
let maincolors = localStorage.getItem("color-option");

if(maincolors !== null){
    document.documentElement.style.setProperty("--main-color",localStorage.getItem("color-option"));

    //check for active class
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
    
    //add active class 0n element with data-color === local storage item
        if(element.dataset.color ===maincolors){
            //add active class
            element.classList.add("active");
        }
});
}

//toggle spin class on icon
document.querySelector(".toggle-setting .fa-gear").onclick = function(){
   //toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");
    //toggle class open 
    document.querySelector(".setting-box ").classList.toggle("open");
};

//switch colors
const colorsli = document.querySelectorAll(".colors-list li");
//loop on all list items
colorsli.forEach(li => {
    //click on every list items
    li.addEventListener("click",(e) =>{
        //console.log(e.target.dataset.color);

        // set color on root
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
        
        //set color on local storage
        localStorage.setItem("color-option" , e.target.dataset.color);

        handleactive(e);
    })
});

//random background

//random background option
let backgroundoption;

//variable to control the enterval
let backgroundinterval;

//check if there is local storage random background item
let backgroundstorageitem = localStorage.getItem("background-option");

if(backgroundstorageitem !== null){
    console.log(backgroundstorageitem);
    console.log(typeof(backgroundstorageitem));

    if(backgroundstorageitem==true){
        backgroundoption = true;
    }else{
        backgroundoption = false;
    }
}
//remove active class from all span
document.querySelectorAll(".random-background span").forEach(element => {
    element.classList.remove("active");
});
if(backgroundstorageitem === 'true'){
    document.querySelector(".random-background  .yes").classList.add("active");
}
else{
    document.querySelector(".random-background  .no").classList.add("active");
}


//switch random background option
const randombackgroundelement = document.querySelectorAll(".random-background span");
//loop on all spans
randombackgroundelement.forEach(span => {
    //click on every span
    span.addEventListener("click",(e) =>{
        //console.log(e.target.dataset.color);

        handleactive(e);
        //play random background or not
        if(e.target.dataset.backgrounnd === 'yes'){
            backgroundoption = true;
            randomizeimg();
            localStorage.setItem("background-option", true);
        }
        else{
        backgroundoption = false;
        console.log(backgroundoption);
        clearInterval(backgroundinterval);
        localStorage.setItem("background-option", false);
    }

    });
});
/*start setting box*/
//select landinfg page element'
let page = document.querySelector(".landing-page");
//select array of images
let imgArray=["landing2.jfif","landing3.jfif","landing4.jfif","landing5.jfif"];

//function to randomize imgs
function randomizeimg(){
    if(backgroundoption === true){
        backgroundinterval= setInterval(()=>{
            //get random number
            let randomnumber= Math.floor(Math.random() * imgArray.length);
            //change bacground image url
            page.style.backgroundImage='url("img/'+imgArray[randomnumber] +'")';
        },3000);
    }
}
randomizeimg();

//select skill selector
let ourskills=document.querySelector(".skills");
window.onscroll = function(){
    //skill offset top
    let skillofsettop = ourskills.offsetTop;
    //Outer height skill
    let skillouterheight = ourskills.offsetHeight;
    //widow height
    let windowheight = this.innerHeight;
    //window scroll top
    let windowscrolltop = this.pageYOffset;
    if(windowscrolltop > (skillofsettop + skillouterheight - windowheight)){
        let allskills= document.querySelectorAll(".skills .skill-progress span");
        allskills.forEach(skill => {
            skill.style.width= skill.dataset.progress;
        })
    }
    
}
//create popup with the image
let ourgallery = document.querySelectorAll(".gallary img");

ourgallery.forEach( img =>{
    img.addEventListener('click' , (e) =>{
        //create overlay element
        let overlay = document.createElement("div");
        //add class to overlay div
        overlay.className = 'popup-overlay';
        //apend overlay to body
        document.body.appendChild(overlay);


        //create the popup
        let popupbox = document.createElement("div");
        
        //add  class to the popup 
        popupbox.className = 'popup-box';

        //if alt is exist or not
        if(img.alt !== null){
            //create heading
            let imgheading =  document.createElement("h2");

            //craete text for heading
            let imgtext = document.createTextNode(img.alt);

            //append the text to heading
            imgheading.appendChild(imgtext);

            //append the heading to the poppup box
            popupbox.appendChild(imgheading);
        }

        //create the image
        let popupimage = document.createElement("img");
        
        //set image src
        popupimage.src = img.src;

        //add img to popup box
        popupbox.appendChild(popupimage);

        //apend popupbox to body
        document.body.appendChild(popupbox);

        //create close span
        let closebutton = document.createElement("span");

        //create the close button text
        let closeButtonText = document.createTextNode("X");

        //append text to closebutton
        closebutton.appendChild(closeButtonText);

        //add class to closebutton
        closebutton.className = 'close-button';

        //add close button to the popup
        popupbox.appendChild(closebutton);
    
    });
}
);
//close popup
document.addEventListener("click", function(e){
if(e.target.className== 'close-button'){
    //remove the current popup
    e.target.parentNode.remove();
    //remove overlay
    document.querySelector(".popup-overlay").remove();
}
});


//select all bullets
const allbullets =  document.querySelectorAll(".nav-bullet .bullet");
allbullets.forEach (bullet =>{
    bullet.addEventListener("click", (e)=>{
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//select all links in navbar
const alllinks =  document.querySelectorAll(".header .links a");

function scrolltosomewhere(elements){
    elements.forEach(element =>{
        element.addEventListener("click" , (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior:'smooth'
            });
        });
    });
}
scrolltosomewhere(alllinks);


//add function to handle active
function handleactive(event){
    //remove active class from children
    event.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });

    //add active class on self
    event.target.classList.add("active");
}

//show bullet
let bulletspan = document.querySelectorAll(" .bullet-option span");
let bulletcontainer = document.querySelector(".nav-bullet");
//if local storage exist
let bulletlocalitem  = localStorage.getItem("bullet-option");
if(bulletlocalitem !== null){
    bulletspan.forEach(span =>{
        span.classList.remove("active");
    });
    if(bulletlocalitem === 'block'){
        document.querySelector(".bullet-option .yes").classList.add("active");
    }
    else{
        document.querySelector(".bullet-option .no").classList.add("active");
    }
}

//add bullet or not and add local storage
bulletspan.forEach(span =>{
    span.addEventListener("click", (e)=>{
        if(span.dataset.display === 'show'){
            bulletcontainer.style.display='block';
            localStorage.setItem("bullet-option",'block');
        }
        else{
            bulletcontainer.style.display='none';
            localStorage.setItem("bullet-option",'none');
        }
        handleactive(e);
    });
});

//reset im setting box
document.querySelector(".reset-option").onclick = function(){
    //remove from localstorage
    localStorage.removeItem("color-option");
    localStorage.removeItem("background-option");
    localStorage.removeItem("bullet-option");
    // reload page
    window.location.reload();
}

//toggle menue
let togglebtn = document.querySelector(".toggle-menue");
let tlinks = document.querySelector(".links");

togglebtn.onclick = function(){
    togglebtn.classList.toggle("menue-active");
    tlinks.classList.toggle("open");

};

//click anywhere outside menue amd toggle button
document.addEventListener("click",(e)=>{
    if(e.target !== togglebtn && e.target !== tlinks){
        //check if menue is open
        if(tlinks.classList.contains("open")){
            togglebtn.classList.toggle("menue-active");
            tlinks.classList.toggle("open");
        }
    }
})

//stop propagation on menue
tlinks.onclick = function(e){
    e.stopPropagation();
}