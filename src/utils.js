// utils.js

const createElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template;
  return wrapper.firstChild;
};

const getRandomFloating = (min, max) => {
  return (min - 0.5 + Math.random() * (max - min + 1));
};

const getRandomInteger = (min, max) => {
  // Если объявляю `const rand = ...`, то консоль браузера ругается
  // `Uncaught TypeError: Assignment to constant variable.`
  let rand = getRandomFloating(min, max);
  rand = Math.round(rand);
  return rand;
};

export {createElement, getRandomFloating, getRandomInteger};
