// get-filter-template.js

const getFilterTemplate = (data) => {
  const template = document.createElement(`template`);
  template.innerHTML = `
  <a href="${data.link}" class="main-navigation__item
    ${data.active ? `main-navigation__item--active` : ``}
    ${data.isStats ? `main-navigation__item--additional` : ``}">
    ${data.name}
    <span ${data.isCount ? `class="main-navigation__item-count"` : ``}>${data.count}</span>
  </a>
  `;
  return template;
};

export default getFilterTemplate;
