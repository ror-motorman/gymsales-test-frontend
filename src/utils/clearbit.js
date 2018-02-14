import axios from 'axios';

function buildUrl(path = '/') {
  return `${process.env.REACT_APP_API_HOST}clearbit${path}`;
}

export function find(params) {
  return axios.get(buildUrl('/people/find'), { params }).then(response => response.data);
}
