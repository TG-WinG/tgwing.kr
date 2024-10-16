export function dateFormat(dateString: string): string {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth() is zero-based, so we add 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0') // Ensures two digits for minutes

  return `${year}년 ${month}월 ${day}일    ${hours}:${minutes}`
}
