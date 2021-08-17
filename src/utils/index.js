export const formatDate = (date) => {
  return date.toLocaleDateString()
}
export function formatIDR(amount) {
  const idFormatter = new Intl.NumberFormat('id-ID')
  return idFormatter.format(amount)
}
