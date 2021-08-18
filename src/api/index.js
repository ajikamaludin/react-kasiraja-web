import useSWR from "swr"

export function useProducts(user, { page = 1, q = '' }) {
  const { data, error } = useSWR([
    `/products?page=${page}&q=${q}`, user.accessToken
  ])

  return [
    data,
    error,
  ]
}

export function useCategories(user, { page = 1, q }) {
  const { data, error } = useSWR([
    `/categories?page=${page}&q=${q}`, user.accessToken
  ])

  return [
    data,
    error
  ]
}
