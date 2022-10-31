import { Session } from '@supabase/supabase-js'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [session, setSession] = useState<Session | null>(null)

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email, options: {emailRedirectTo: '/new/quiz'}})
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
  
    async function getInitialSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
  
      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        }
  
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
  }, [])

  useEffect(() => {

    if(session ) {
      router.push('/quiz/new')
    }
  
  }, [session])

  return (
    <div className="row flex-center flex">
      <div className="col-6 form-widget">
        <h1 className="header">Fullstack quiz project</h1>
        <p className="description">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}