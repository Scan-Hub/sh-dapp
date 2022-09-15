import format from "date-fns/format"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import fromUnixTime from "date-fns/fromUnixTime"
import vi from "date-fns/locale/vi"
// ----------------------------------------------------------------------

export function fDate(date, formatString = "do MMMM yyyy") {
  if (!date) return ""
  let temptDate = Date.parse(date)
  if (!temptDate) {
    temptDate = date.replace(/ /g, "T")
  }

  return format(new Date(temptDate), formatString)
}

export function fDateTime(date) {
  if (!date) return ""
  let temptDate = Date.parse(date)
  if (!temptDate) {
    temptDate = date.replace(/ /g, "T")
  }

  return format(new Date(temptDate), "dd/MM/yyyy HH:mm")
}

export function fUnix(string) {
  if (!string) return ""

  return fromUnixTime(string)
}

export function fDateTimeSuffix(date) {
  if (!date) return ""
  let temptDate = Date.parse(date)
  if (!temptDate) {
    temptDate = date.replace(/ /g, "T")
  }

  return format(new Date(temptDate), "dd/MM/yyyy HH:mm:ss", {
    addSuffix: true
  })
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: vi
  })
}
