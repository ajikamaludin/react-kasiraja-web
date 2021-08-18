import axios from "axios";
import useSWR from "swr"
import qs from "query-string"

export function useProducts(user, params) {
  const { data, error } = useSWR([
    `/products?${qs.stringify(params)}`, user.accessToken
  ])

  return [
    data,
    error,
  ]
}

export function createProduct(payload, token) {
  return axios({
    method: 'POST',
    url: '/products',
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

export function getProduct(id, token){
  return axios({
    method: 'GET',
    url: `/products/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data.data)
  .catch(err => {
    throw err.response.data
  }) 
}

export function updateProduct(id, payload, token) {
  return axios({
    method: 'PUT',
    url: `/products/${id}`,
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

export function deleteProduct(id, token) {
  return axios({
    method: 'DELETE',
    url: `/products/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data)
  .catch(err => {
    throw err.response.data
  })
}