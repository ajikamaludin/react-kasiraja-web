import axios from 'axios'
import { API_URL } from './config'

axios.defaults.baseURL = API_URL
const axiosApiInstance = axios.create();

const refreshAccessToken = (refreshToken) => {
  return axios({
    method: "PUT",
    url: '/authentications',
    data: { refreshToken }
  }).then(res => res.data)
}

axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { status, data: { message } } = error.response
    if (status === 401 && message === 'Unauthenticated.') {
      window.localStorage.clear()
      window.location.reload()
      return
    }

    if(status === 401 && message === "Token maximum age exceeded") {
      const originalRequest = error.config;
      originalRequest._retry = true;

      const user = JSON.parse(window.localStorage.getItem('KASIRAJA_USER'))
      const res = await refreshAccessToken(user.refreshToken);

      window.localStorage.setItem(
        'KASIRAJA_USER',
        JSON.stringify({
          ...user, 
          accessToken: res.data.accessToken
        })
      )
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
      return axiosApiInstance(originalRequest);
    }

    if (status === 403) {
      window.alert('Anda tidak mempunyai akses untuk aksi ini')
    }

    throw error
})
