// @ts-nocheck
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import lozad from 'lozad'

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

    ;(function (m, e, t, r, i, k, a) {
      m[i] =
        m[i] ||
        function () {
          ;(m[i].a = m[i].a || []).push(arguments)
        }
      m[i].l = 1 * new Date()
      ;(k = e.createElement(t)),
        (a = e.getElementsByTagName(t)[0]),
        (k.async = 1),
        (k.src = r),
        a.parentNode.insertBefore(k, a)
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym')

    ym(84009604, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    })
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
