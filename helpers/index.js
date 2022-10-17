export class StringHelper {
  static getStringObjProps({
    obj = {},
    propsList,
    separator = ',',
    defaultValue = null,
    startPad = null,
  } = {}) {
    if (!obj) {
      return defaultValue
    }

    const trimSeparator = separator.trim()

    let resultString = propsList.reduce((string, propItem) => {
      if (propItem in obj) {
        string += `${obj[propItem]}${trimSeparator}`
      }

      return string
    }, '')

    if (resultString.endsWith(separator)) {
      resultString = resultString.substring(0, resultString.length - 1)
    }

    if (startPad) {
      resultString = resultString.padStart(
        resultString.length + startPad.length,
        startPad
      )
    }

    return resultString.trim()
  }

  static generate(length) {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  static onlyNumbers(value) {
    return typeof value === 'string' ? value.replace(/\D+/g, '') : null
  }
}

export const imageUrlOrNotFound = (image) => {
  return image?.url || require('@/assets/img/no-image.jpg')
}

export const compareNumbers = (a, b) => {
  return a - b
}

/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['коментарий', 'коментария', 'комментариев']
 * @param {Boolean} withCount add count to the response
 * @return {String}        Count + plural form for word
 */
export const pluralize = (count, words, withCount = true) => {
  const cases = [2, 0, 1, 1, 1, 2]
  const word =
    words[
      count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
    ]

  return withCount ? `${count} ${word}` : word
}

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
