// @ts-nocheck
import { useEffect } from 'react'
// import lozad from 'lozad'
// import mixpanesl from 'mixpanel-browser'

import CONFIG from '../data/config.json'

import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // const observer = lozad() // lazy loads elements with default selector as '.lozad'
    // observer.observe()

    window.dataLayer = (window as any).dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', CONFIG.googleAnalytics.key)

    // mixpanel.init(CONFIG.mixPanel.token)
    // mixpanel.track('Site Open');

    // TODO: DEV MODE
    if (true) {
      window['__INITIAL_STATE__'] = pageProps
    }
  }, [])

  return <Component {...pageProps} />
}
