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

const getRandomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};


export {render, getRandomInteger};
