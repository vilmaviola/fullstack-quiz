import { useEffect, useMemo, useState } from "react"
import { supabase } from '../utils/supabaseClient'
import { Session } from '@supabase/supabase-js'
import { useRouter } from 'next/router'

export default function Component(props: any) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  console.log("session = ", session)

  const router = useRouter()

  const signOut  = async () => {
    await supabase.auth.signOut()
    router.push('/login')
}

useEffect(() => {
  if(session) {
    router.push('/quiz/new')
  }

}, [session])

useEffect(() => {
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
}, [])

const user = useMemo(() => {

  if (session) {
    return session.user.email
  }

  return ''
}, [session])

  return (
    <div>
      <div>
        <p className="text-3xl">User: </p><p>{user}</p>
      </div>
      <div>
        {session &&
          <button
            onClick={signOut}
          >
              Logout
          </button>
        }
      </div>
      {props.children}
    </div>
  )
}
