import axios from "axios"
import useSWR from 'swr'
import "../axiosSetup"
import { useAuth } from "../context/AppContext"
import { formatDate } from "../utils"

const fetcher = (url, token) => axios({
  method: "GET",
  url: url,
  headers: {
    'Authorization': `Bearer ${token}`
  }
}).then(res => { 
  return res.data.data
})

export function useProducts({startDate, endDate}) {
  const { user } = useAuth()
  const { data, error } = useSWR([
    `/products?startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}`, user.accessToken
  ], fetcher)

  return [
    data,
    error,
  ]
}

export function useProduct(id) {

}