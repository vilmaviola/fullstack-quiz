import { User } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import Layout from '../../Layout'

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

  return (
    <Layout>
        <div >
            <p>{user?.email}</p>
        </div>
    </Layout>

  )
}

export default NewQuiz
