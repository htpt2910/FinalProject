const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

export function convertDaySetting(day: string | number | Date) {
  const newOrderedDate = new Date(day)
  /// chinhr utc tu dong locale theo area
  //TODO
  const weekday = weekdays[newOrderedDate.getDay()]
  const date = newOrderedDate.getUTCDate()
  const month = newOrderedDate.getUTCMonth()
  const year = newOrderedDate.getUTCFullYear()
  const second = newOrderedDate.getUTCSeconds()
  const minute = newOrderedDate.getUTCMinutes()
  var hour = newOrderedDate.getUTCHours() + 7
  let ampm
  if (hour >= 12) {
    hour = hour % 12
    ampm = "PM"
  } else ampm = "AM"
  return `${weekday} ${date}/${month}/${year} at ${hour}:${minute}:${second} ${ampm}`
}

export function convertDateType(text: string) {
  console.log(text.length)
  const year = text.substring(0, 4)
  const month = text.substring(4, 6)
  const day = text.substring(6, 8)
  const hour = text.substring(8, 10)
  const minute = text.substring(10, 12)
  const second = text.substring(12)

  return `${year}/${month}/${day} ${hour}:${minute}:${second}`
}
