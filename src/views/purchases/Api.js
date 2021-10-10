import axios from "axios"
import useSWR from "swr"
import qs from "query-string"

export function usePurchases(user, params) {
  const { data, error } = useSWR([
    `/purchases?${qs.stringify(params)}`, user.accessToken
  ])

  return [
    data,
    error
  ]
}

export function createPurchase(payload, token) {
  return axios({
    method: 'POST',
    url: '/purchases',
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

export function getPurchase(id, token){
  return axios({
    method: 'GET',
    url: `/purchases/${id}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.data.data)
  .catch(err => {
    throw err.response.data
  }) 
}