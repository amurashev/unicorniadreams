import { useEffect } from 'react'
import lozad from 'lozad'

import '../styles/global.scss'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const observer = lozad() // lazy loads elements with default selector as '.lozad'
    observer.observe()
    ;(window as any).dataLayer = (window as any).dataLayer || []
    function gtag() {
      ;(window as any).dataLayer.push(arguments)
    }
    // @ts-ignore
    gtag('js', new Date())
    // @ts-ignore
    gtag('config', 'G-BH4EFRY18K')
  }, [])

  return <Component {...pageProps} />
}
