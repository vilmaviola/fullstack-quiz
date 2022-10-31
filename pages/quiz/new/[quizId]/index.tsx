import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'
import { supabase } from '../../../../utils/supabaseClient'
import Layout from '../../../Layout'

type Answer = {
  answer?: string,
  correct?: boolean,
}

function AddQuestions() {

  const [question, setQuestion] = useState('')

  const [options, setOptions] = useState<Answer[]>([{ answer: '', correct: false }])

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
  
    const bulkOption = options.map((option) => (
        {...option, questionId: data.id}
    ))

    const { data: answers, error: answersError } = await supabase
    .from('answers')
    .insert(bulkOption)

    if (!error && !answersError) {
      alert('Question added')
      setQuestion('')
      setOptions([{answer: '', correct: false}])
    } else if (error || answersError) {
      alert('Something went wrong. Could not add question.')
    }
}

function handleChange(event: ChangeEvent<HTMLInputElement>, index: number) {
  const value = event.target.value
  setOptions((previousArray) => {
    const updateOptionsArray = [...previousArray]
    const updateOption = updateOptionsArray[index]

    updateOptionsArray[index] = {...updateOption, answer: value}
    return updateOptionsArray
  })
}

function handleChecked(event: ChangeEvent<HTMLInputElement>, index:number) {
  const checked = event.target.checked

  setOptions((previousArray) => {
    const update = [...previousArray]
    const updateOption = update[index]

    update[index] = {...updateOption, correct: checked}
    return update
  })
}

  return (
    <Layout>
        <div>
            <h1>Add questions here!</h1>
            <br></br><br></br>
              <form onSubmit={addQuestion} >
                  <label>Question</label><br></br>
                  <input type='text' placeholder='Type the question' value={question} onChange={(event) => setQuestion(event.target?.value)}/><br></br>
                  <br></br>

              <br></br><br></br>
                {options.map((option, index) => (
                  <>
                    <input key={index} value={option.answer} placeholder='Enter answer' onChange={(event) => handleChange(event, index)}></input>
                    <input type='checkbox' checked={option?.correct} onChange={(event) => handleChecked(event, index)} />
                    <br></br>
                  </>
                ))}
              <br></br><br></br>
                <input type='button' value={'Add answer'} onClick={() => setOptions((previousAnswers) => [...previousAnswers, { answer: '', correct: false }])}></input>
                <br></br><br></br>
                <input type="submit" value="Add question"/>
              </form>
              <div>
                <button onClick={() => router.push(`/quiz/new/${quizId}/confirm`)}>Okay I'm done...</button>
              </div>
        </div>
    </Layout>
  )
}

export default AddQuestions
