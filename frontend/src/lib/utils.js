export function formatTimeAgo(dateString) {
  const parsedDate = new Date(dateString)
  const now = new Date()

  const differenceInMilliseconds = now - parsedDate

  const seconds = Math.floor(differenceInMilliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(weeks / 4) // Assuming 4 weeks per month

  if (seconds < 60) return `${seconds} seconds ago`
  else if (minutes < 60) return `${minutes} minutes ago`
  else if (hours < 24) return `${hours} hours ago`
  else if (days < 7) return `${days} days ago`
  else if (weeks < 4) return `${weeks} weeks ago`
  else return `${months} months ago`
}

export function formatMoney(number, dp = 0) {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: dp,
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}

export const formDataToJSON = (formData) => {
  const obj = {}
  for (const [key, value] of formData.entries()) {
    obj[key] = value
  }
  return obj
}
