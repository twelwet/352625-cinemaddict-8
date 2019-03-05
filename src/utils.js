// utils.js

const createFragment = (data, template) => {
  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    fragment.appendChild(template(item).content);
  });
  return fragment;
};

const render = (data, template, container) => {
  container.innerHTML = ``;
  container.appendChild(createFragment(data, template));
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

export {render, getRandomFloating, getRandomInteger};
