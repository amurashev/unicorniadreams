export const convertObjectToGetString = (obj: object, prefix?: string) => {
  const str = []
  let param

  for (param in obj) {
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
  }

  return str.join('&')
}
