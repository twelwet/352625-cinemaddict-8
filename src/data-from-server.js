// data-from-server.js

import API from './api.js';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=${Math.random()}`;
const END_POINT = `https://es8-demo-srv.appspot.com/moowle/`;

const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});

export default api;
