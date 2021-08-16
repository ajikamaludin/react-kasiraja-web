import axios from 'axios'
import { API_URL } from './config'

const id = x => x
axios.defaults.baseURL = API_URL
axios.interceptors.response.use(id, error => {
  const { status, data: { message } } = error.response
  if (status === 401 && message === 'Unauthenticated.') {
    window.localStorage.clear()
    window.location.reload()
    return
  }
  // if expired access token lets refresh token
  if (status === 403) {
    window.alert('Anda tidak mempunyai akses untuk aksi ini')
  }

  throw error
})
