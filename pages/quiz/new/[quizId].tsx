import { User } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import Layout from '../../Layout'


function AddQuestions() {

  const [question, setQuestion] = useState('')
  const [option1, setOption1] = useState('')

  const router = useRouter()
  const { quizId } = router.query

  const addQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { data, error } = await supabase
        .from('questions')
        .insert(
            { 
              question:  question,
              quizId: quizId
            }
        ).select().limit(1).single()

    const { data: answers, error: answersError } = await supabase
    .from('answers')
    .insert(
        { 
          answer:  option1,
          correct: true,
          questionId: data.id,
        }
    ).select().limit(1).single()

}

  return (
    <Layout>
        <div>
            <h1>Add questions here!</h1>
              <form onSubmit={addQuestion}>
                  <label>Question</label><br></br>
                  <input type='text' placeholder='Type the question' onChange={(event) => setQuestion(event.target?.value)}/><br></br>
                  <input type='text' placeholder='Type option 1' onChange={(event) => setOption1(event.target?.value)}/><br></br>
                  <input type="submit" value="Add question"/>
              </form>
        </div>
    </Layout>
  )
}

export default AddQuestions
