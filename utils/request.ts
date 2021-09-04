const request = async (url: string, options?: any) => {
  const response = await fetch(url, options)

  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }

  const errorMessage = await response.text()

  const error = new Error(errorMessage)
  // TODO: skip for now
  // error.response = response
  throw error
}

export default request
