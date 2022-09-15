import numeral from "numeral"

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? "$ 0,0" : "$ 0,0.00")
}

export function fPercent(number) {
  return numeral(number / 100).format("0.00%")
}

export function fNumber(number, formatString) {
  return numeral(number).format(formatString)
}

export function fShortenNumber(number) {
  const a = Number(number).toFixed(0)
  return numeral(a).format("0a")
}

export function fKNumber(number, fractionDigits = 0) {
  if (!number) return
  if (!Number.isInteger(number) || number === 0) return number
  const units = ["k", "M", "B"]
  const numberLength = number.toString().length
  const floor = Math.floor(Math.abs(number).toString().length / 3)
  let exponent = floor
  let index = floor > 3 ? 2 : floor - 1
  if (numberLength === 9) index = 1
  if (floor > 3 || numberLength === 9) {
    exponent = floor - 1
  }

  let value = +(number / Math.pow(1000, exponent))
  const result = fractionDigits > 0 ? value.toFixed(fractionDigits) : value
  return result + units[index]
}
