// @ts-nocheck
import { useEffect } from 'react'
import lozad from 'lozad'
// import mixpanesl from 'mixpanel-browser'

import CONFIG from '../data/config.json'

import '../styles/global.scss'

export default function App({ Component, pageProps }) {
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

    ym(84024415, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    })
  }, [])

  return <Component {...pageProps} />
}
