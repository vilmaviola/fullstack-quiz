import { User } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import Layout from '../../Layout'

const NewQuiz: NextPage = () => {

    const router = useRouter()

    const [user, setUser] = useState<User>()
    const [quizName, setQuizName] = useState('')

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

    const createQuiz = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const { data, error } = await supabase
            .from('quiz')
            .insert(
                { name: quizName }
            ).select().limit(1).single()

            if (!error) {
                router.push(`/quiz/new/${data.id}`)
            }

    }

  return (
    <Layout>
        <div>
            <div>
                <p className='text-3xl'>Create new quiz</p>
                <form onSubmit={createQuiz}>
                    <label>Quiz name</label><br></br>
                    <input type='text' placeholder='Type the name of the quiz' onChange={(event) => setQuizName(event.target?.value)}/><br></br>
                    <input type="submit" value="Create quiz"/>
                </form>
                
            </div>
            
        </div>
    </Layout>
  )
}

export default NewQuiz
