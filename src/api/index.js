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

export function useCategories(user, params) {
  const { data, error } = useSWR([
    `/categories?${qs.stringify(params)}`, user.accessToken
  ])

  return [
    data,
    error
  ]
}
