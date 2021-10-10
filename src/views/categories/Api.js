import axios from "axios"
import useSWR from "swr"
import qs from "query-string"

export function useCategories(user, params) {
  const { data, error } = useSWR([
    `/categories?${qs.stringify(params)}`, user.accessToken
  ])

  return [
    data,
    error
  ]
}

export function createCategory(payload, token) {
  return axios({
    method: 'POST',
    url: '/categories',
    data: payload,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data)
  .catch(err => {
    throw err.response.data
  })
}

export function getCategory(id, token){
  return axios({
    method: 'GET',
    url: `/categories/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data.data)
  .catch(err => {
    throw err.response.data
  }) 
}

export function updateCategory(id, payload, token) {
  return axios({
    method: 'PUT',
    url: `/categories/${id}`,
    data: payload,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data)
  .catch(err => {
    throw err.response.data
  })
}

export function deleteCategory(id, token) {
  return axios({
    method: 'DELETE',
    url: `/categories/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data)
  .catch(err => {
    throw err.response.data
  })
}