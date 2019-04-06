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
  return Math.round(getRandomFloating(min, max));
};

export {createElement, getRandomFloating, getRandomInteger};
