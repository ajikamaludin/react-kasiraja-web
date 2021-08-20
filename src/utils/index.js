export const formatDate = (date) => {
  return date.toLocaleDateString()
}
export function formatIDR(amount) {
  const idFormatter = new Intl.NumberFormat('id-ID')
  return idFormatter.format(amount)
}

export function genInvId() {
  const currentDate = new Date()
  const invoicePrefix = `INV/${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`
  return invoicePrefix
};