// @ts-nocheck
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import lozad from 'lozad'
import mixpanel from 'mixpanel-browser'

import '../styles/global.scss'

const host = 'https://unicorniadreams.store'

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
    mixpanel.init('9df06fac58017236829f176956d86e6a')
    mixpanel.track('Site Open');
  }, [])

  const props = {
    ...pageProps,
    context: {
      host,
      path: asPath,
      url: `${host}${asPath}`,
    },
  }

  return <Component {...props} />
}
