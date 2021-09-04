import { useEffect } from 'react'

import CONFIG from '../data/config.json'

import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  /* eslint-disable react-hooks/exhaustive-deps, no-underscore-dangle, */
  useEffect(() => {
    // @ts-ignore
    window.dataLayer = (window as any).dataLayer || []
    function gtag() {
      // @ts-ignore
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
