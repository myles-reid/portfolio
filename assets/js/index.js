'use strict';

function select(selector, scope = document) {
  return scope.querySelector(selector);
}

function listen(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function classAdd(selector, name) {
  return selector.classList.add(name);
}

function classRemove(selector, name) { 
  return selector.classList.remove(name);
}

const body = select('#body')
const modeButton = select('#button');
const modeSymbol = select('#mode-symbol');
const bannerBlurb = select('.banner-blurb');
const words = select('.word-wrapper');
const phrase = select('.phrase')
const stickyButton = select('#button-sticky');
const stickySymbol = select('#sticky-symbol');



//Dark mode toggle function
function symbolSwapTop() {
 if (modeSymbol.classList.contains('fa-moon') && !modeSymbol.classList.contains('fa-sun')) {
  classRemove(modeSymbol, 'fa-moon');
  classAdd(modeSymbol, 'fa-sun');
 } else {
  classRemove(modeSymbol, 'fa-sun');
  classAdd(modeSymbol, 'fa-moon');
 }
};

function symbolSwapSticky() {
  if (stickySymbol.classList.contains('fa-moon') && !stickySymbol.classList.contains('fa-sun')) {
   classRemove(stickySymbol, 'fa-moon');
   classAdd(stickySymbol, 'fa-sun');
  } else {
   classRemove(stickySymbol, 'fa-sun');
   classAdd(stickySymbol, 'fa-moon');
  }
 };

listen('click', modeButton, function() {
  body.classList.toggle('dark-mode');
  symbolSwapTop();
  symbolSwapSticky();
});

listen('click', stickyButton, function() {
  body.classList.toggle('dark-mode');
  symbolSwapTop();
  symbolSwapSticky();
});


// text typing

let swapablePhrase = phrase.textContent;
const rotatingPhrases = [
  'a developer.', 'enthusiastic.', 'Myles Reid.', 'a student.'
];



function textTypingEffect(element, text, i = 0) {
  //reset
  if (i === 0) element.textContent = '';

  // add each letter one by one
  element.textContent += text[i]

  //stops the infinity loop once we have reached the end of the string
  if (i === text.length - 1) return;

  //times the input, so that we get a typing effect
  setTimeout(() => textTypingEffect(element, text, i + 1), 50);
}

function changePhrase(i) {
  const newPhrase = rotatingPhrases[i];
  textTypingEffect(phrase, newPhrase); 
}

function rotatePhrase() {
  let i = 0;
  setInterval(() => {
    changePhrase(i);
    i = (i + 1) % rotatingPhrases.length; 
  }, 3000);
}


listen('load', window, () => {
  rotatePhrase()
  textTypingEffect(phrase, swapablePhrase);
});


// display fixed button on scroll
listen('scroll', window, () => {
 if (document.documentElement.scrollTop > 50){
  classRemove(stickyButton, 'display-none')
  classAdd(stickyButton, 'flex');
 } else {
  classRemove(stickyButton, 'flex');
  classAdd(stickyButton, 'display-none');
 }
});

listen('scroll', window, () => {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
    classRemove(stickyButton, 'button-fixed-fixed')
    classAdd(stickyButton, 'button-sticky-bottom');
  } else {
    classRemove(stickyButton, 'button-sticky-bottom');
    classAdd(stickyButton, 'button-fixed-fixed');
  }
});


