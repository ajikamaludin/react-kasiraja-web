import axios from "axios"
import useSWR from "swr"
import qs from "query-string"

export function useCustomers(user, params) {
  const { data, error } = useSWR([
    `/customers?${qs.stringify(params)}`, user.accessToken
  ])

  return [
    data,
    error
  ]
}

export function createCustomer(payload, token) {
  return axios({
    method: 'POST',
    url: '/customers',
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

export function getCustomer(id, token){
  return axios({
    method: 'GET',
    url: `/customers/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data.data)
  .catch(err => {
    throw err.response.data
  }) 
}

export function updateCustomer(id, payload, token) {
  return axios({
    method: 'PUT',
    url: `/customers/${id}`,
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

export function deleteCustomer(id, token) {
  return axios({
    method: 'DELETE',
    url: `/customers/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data)
  .catch(err => {
    throw err.response.data
  })
}