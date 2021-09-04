type Params = {
  [key: string]: string
}

export const addParamsToString = (str: string, params?: Params) => {
  const re = /\[(\w+)\]?/g

  if (params && Object.keys(params)) {
    return str.replace(re, (a, b) => {
      if (params && params[b]) {
        return params[b]
      }

      return a
    })
  }

  return str
}

export type RouteData = {
  index?: string
  pathname: string
}

export type BaseRoute = {
  // index?: RouteData['index']
  getUrl(params?: Params): string
}

export const route = (pathname: string): BaseRoute => {
  return {
    // index: data.index,
    getUrl: (params) => {
      if (pathname) {
        return addParamsToString(pathname, params)
      }

      return ''
    },
  }
}
