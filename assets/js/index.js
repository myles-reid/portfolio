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



//Dark mode toggle function
function symbolSwap() {
 if (modeSymbol.classList.contains('fa-moon') && !modeSymbol.classList.contains('fa-sun')) {
  classRemove(modeSymbol, 'fa-moon');
  classAdd(modeSymbol, 'fa-sun');
 } else {
  classRemove(modeSymbol, 'fa-sun');
  classAdd(modeSymbol, 'fa-moon');
 }
};

listen('click', modeButton, function() {
  body.classList.toggle('dark-mode');
  symbolSwap();
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


// move mode toggle on scroll

listen('scroll', window, () => {
 if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
  classAdd(modeButton, 'button-move');
 } else {
  classRemove(modeButton, 'button-move');
 }
});
