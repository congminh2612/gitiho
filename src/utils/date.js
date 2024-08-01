export function convertDateToYYYYMMDD(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng bắt đầu từ 0, nên cần cộng thêm 1
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
