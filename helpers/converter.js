export const priceFormatter = (price, withCurrency = true) => {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'decimal',
    trailingZeroDisplay: 'stripIfInteger', // Working only with new V8 version
    minimumFractionDigits: 1,
  })

  let result = formatter
    .format(price)
    .replace(/\D0(?=\D*$)/, '')
    .replace(',', '.')

  if (withCurrency) {
    result += ' ₽'
  }

  return result
}
