// active navlinks
let section = document.querySelectorAll('section')
let navlinks = document.querySelectorAll('header nav a')
window.onscroll = () => {
  section.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 35;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id')
    if (top > offset && top < offset + height) {
      navlinks.forEach(link => {
        link.classList.remove('active')
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
      })
    }
  })
}

// auto text
let autotextEl=document.querySelector('#auto-text')
let careers=['Youtuber','Developer','Freelancer','Instructor']

let careerIndex=0;
let characterIndex=0;
updateText();
function updateText(){
  characterIndex++;
  autotextEl.innerHTML=`<span><h1 style="display: inline;color:white;">I am</h1></span> <h1 style="display: inline;color:rgb(16, 174, 236)">${careers[careerIndex].slice(0,1) === "I" ? "an" :"a"} ${careers[careerIndex].slice(0,characterIndex)}</h1>`;

  if(characterIndex === careers[careerIndex].length){
    careerIndex++;
    characterIndex=0;

  }
  if(careerIndex === careers.length){
    careerIndex=0;
  }
  setTimeout(updateText, 300);
}

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.content-boxes .box1');
  const loadMoreButton = document.getElementById('load-more');

  let visibleItems = 3; // Initial visible items
  const itemsPerClick = 3; // Number of items to load per click

  // Show initial items
  for (let i = 0; i < visibleItems; i++) {
    if (items[i]) {
      items[i].classList.add('visible');
    }
  }

  loadMoreButton.addEventListener('click', () => {
    let newlyVisible = 0;

    for (let i = visibleItems; i < visibleItems + itemsPerClick; i++) {
      if (items[i]) {
        items[i].classList.add('visible');
        newlyVisible++;
      }
    }

    visibleItems += newlyVisible;

    // Hide the button if no more items are left
    if (visibleItems >= items.length) {
      loadMoreButton.style.display = 'none';
    }
  });
});


const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick=()=>{
  menuIcon.classList.toggle('bx-x')
  navbar.classList.toggle('active');
}
