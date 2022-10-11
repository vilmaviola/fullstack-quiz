import Auth from '../components/Auth'
import Layout from './Layout'

export default function Home() {

  return (
    <Layout>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
          <Auth />
      </div>
    </Layout>

  )
}