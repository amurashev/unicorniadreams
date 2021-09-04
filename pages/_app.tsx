import { useEffect } from 'react'

import CONFIG from '../data/config.json'

import '../styles/global.scss'

declare global {
  interface Window {
    dataLayer: IArguments[]
    __INITIAL_STATE__: any
  }
}

export default function App({ Component, pageProps }) {
  /* eslint-disable react-hooks/exhaustive-deps, no-underscore-dangle, */
  useEffect(() => {
    window.dataLayer = window.dataLayer || []

    function gtag() {
      /* eslint-disable-next-line prefer-rest-params */
      window.dataLayer.push(arguments)
    }
    // @ts-ignore
    gtag('js', new Date())
    // @ts-ignore
    gtag('config', CONFIG.googleAnalytics.key)

    // TODO: DEV MODE
    if (true) {
      window.__INITIAL_STATE__ = pageProps
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps, no-underscore-dangle */

  return <Component {...pageProps} />
}
