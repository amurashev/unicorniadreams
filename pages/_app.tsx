// @ts-nocheck
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import lozad from 'lozad'
// import mixpanesl from 'mixpanel-browser'

import CONFIG from '../data/config.json'

import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  const { asPath } = useRouter()
  useEffect(() => {
    const observer = lozad() // lazy loads elements with default selector as '.lozad'
    observer.observe()
    // @ts-ignore
    window.dataLayer = (window as any).dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag('config', CONFIG.googleAnalytics.key)

    // mixpanel.init(CONFIG.mixPanel.token)
    // mixpanel.track('Site Open');
  }, [])

  const props = {
    ...pageProps,
    context: {
      path: asPath,
      url: `${CONFIG.host}${asPath}`,
    },
  }

  return <Component {...props} />
}
