export const convertObjectToGetString = (
  obj: { [key: string]: number | string },
  prefix?: string
) => {
  const str = []

  Object.keys(obj).forEach((param) => {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(obj, param)) {
      const key = prefix ? `${prefix}[${param}]` : param
      const value = obj[param]
      let decodedValue

      if (value && typeof value === 'object') {
        decodedValue = convertObjectToGetString(value, key)
      } else {
        const decodedParamValue =
          value === undefined ? '' : encodeURIComponent(value)
        decodedValue = `${encodeURIComponent(key)}=${decodedParamValue}`
      }

      str.push(decodedValue)
    }
  })

  return str.join('&')
}
