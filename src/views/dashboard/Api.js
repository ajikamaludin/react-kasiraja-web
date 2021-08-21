import axios from 'axios';

export function getSummary(token) {
  return axios({
    method: 'GET',
    url: `/dashboard`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response;
    });
}