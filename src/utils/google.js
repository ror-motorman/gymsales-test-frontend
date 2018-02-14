import axios from 'axios';

function buildUrl(path = '/') {
  return `${process.env.REACT_APP_API_HOST}google${path}`;
}

export function places(params) {
  return axios.get(buildUrl('/places/spots'), { params }).then(response => response.data);
}
