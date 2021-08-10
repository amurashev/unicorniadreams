import { useEffect } from 'react'
import lozad from 'lozad'

import '../styles/global.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const observer = lozad() // lazy loads elements with default selector as '.lozad'
    observer.observe()
  }, [])

  return <Component {...pageProps} />
}
