export const TYPE_REAL_TIME = 1
export const TYPE_FUTURES = 2

export const TYPE_NAMES = {
  [TYPE_REAL_TIME]: 'Реалтайм',
  [TYPE_FUTURES]: 'Фьючерс',
}

export const getTypeName = (type) => TYPE_NAMES[type]
