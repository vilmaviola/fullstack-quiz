import { User } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'

const NewQuiz: NextPage = () => {

    const [user, setUser] = useState<User>()

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser  = async () => {
        const {
            data: { user },
          } = await supabase.auth.getUser()
        
          if (user) {
            setUser(user)
          }
    }

    const signOut  = async () => {
        await supabase.auth.signOut()
    }

  return (
    <div >
        <p>{user?.email}</p>
        <button onClick={signOut}>Logout</button>

    </div>
  )
}

export default NewQuiz
