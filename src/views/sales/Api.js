import axios from "axios"
import useSWR from "swr"
import qs from "query-string"

export function useSales(user, params) {
  const { data, error } = useSWR([
    `/sales?${qs.stringify(params)}`, user.accessToken
  ])

  return [
    data,
    error
  ]
}

export function createSale(payload, token) {
  return axios({
    method: 'POST',
    url: '/sales',
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

export function getSale(id, token){
  return axios({
    method: 'GET',
    url: `/sales/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data.data)
  .catch(err => {
    throw err.response.data
  }) 
}