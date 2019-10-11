import dayjs from 'dayjs'

const dateFormat = "YYYY-MM-DD"
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss"

// 日期控件返回值
export function getDatePickerValue(e) {
  let date = e.detail.value
  return dayjs(date).format(dateFormat)
}

export const today = dayjs().format(dateFormat)
export const getNow = function () {
    return dayjs().format(dateTimeFormat)
}
export const yesterday = dayjs().subtract(1, 'day').format(dateFormat)

export function addDays(days, d = today) {
  if (days >= 0) {
    d = dayjs(d).add(days, 'day')
  } else {
    d = dayjs(d).subtract(-days, 'day')
  }
  return d.format(dateFormat)
}
