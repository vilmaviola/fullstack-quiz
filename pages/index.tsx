import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/router'
import Layout from './Layout'

export default function Home() {
/*   const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  const router = useRouter()

  useEffect(() => {
    if(session) {
      router.push('/quiz/new')
    }

  }, [session]) */
  
/*   useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      console.log("session = ", session)

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }

        setIsLoading(false)
      }
    }

    getInitialSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      mounted = false

      subscription?.unsubscribe()
    }
  }, []) */

  return (
    <Layout>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
          <Auth />
      </div>
    </Layout>

  )
}