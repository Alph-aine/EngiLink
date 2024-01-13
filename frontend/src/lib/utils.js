export function formatTimeAgo(dateString) {
  const parsedDate = new Date(dateString);  // Parse the input string into a Date object
  const now = new Date();  // Get the current time

  const differenceInMilliseconds = now - parsedDate;

  const minutes = Math.floor(differenceInMilliseconds / 60000);
  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    // If within the last 24 hours, use "X hours ago" format
    return `${hours} hours ago`;
  } else {
    // Otherwise, use a more general format (e.g., "January 6, 2024")
    return parsedDate.toLocaleDateString();
  }
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