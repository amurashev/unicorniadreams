import Layout from '../components/Layout'
import Page404 from '../components/pages/404'

export default function Custom404() {
  return (
    <div>
      <Layout title="Page not found" description="">
        <Page404 />
      </Layout>
    </div>
  )
}
