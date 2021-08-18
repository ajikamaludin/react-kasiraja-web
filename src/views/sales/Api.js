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