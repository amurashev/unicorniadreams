// @ts-nocheck
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import lozad from 'lozad'
import mixpanel from 'mixpanel-browser'

import CONFIG from '../data/config.json'

import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  const { asPath } = useRouter()
  useEffect(() => {
    const observer = lozad() // lazy loads elements with default selector as '.lozad'
    observer.observe()
    // ;(window as any).dataLayer = (window as any).dataLayer || []
    // function gtag() {
    //   ;(window as any).dataLayer.push(arguments)
    // }
    // @ts-ignore
    // gtag('js', new Date())
    // @ts-ignore
    // gtag('config', 'G-BH4EFRY18K')
    mixpanel.init(CONFIG.mixPanel.token)
    mixpanel.track('Site Open');
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
