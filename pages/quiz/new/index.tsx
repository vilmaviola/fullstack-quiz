import { User } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import Layout from '../../Layout'

const NewQuiz: NextPage = () => {

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

    const createQuiz = async () => {
        const { data, error } = await supabase
            .from('quiz')
            .insert([
                { name: quizName }
            ])

        console.log("insert data", data)
    }

  return (
    <Layout>
        <div>
            <div>
                <p className='text-3xl' >Create new quiz</p>
                <form>
                    <label>Quiz name</label><br></br>
                    <input type='text' placeholder='Type the name of the quiz' onChange={(event) => setQuizName(event.target?.value)}/><br></br>
                    <input type="submit" value="Submit" onClick={() => createQuiz()}/>
                </form>
                
            </div>
            
        </div>
    </Layout>
  )
}

export default NewQuiz
