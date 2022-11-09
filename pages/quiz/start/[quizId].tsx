import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import Layout from '../../Layout'

function StartQuiz() {

  const router = useRouter()
  const { quizId } = router.query

  const [theQuestion, setTheQuestion] = useState<({ question: any; } & { id: number; } & { answers: ({ answer: any; } & { id: any; } & { questionId: any;})[]; })[]>()
  const [error, setError] = useState<string>()
  const [userAnswer, setUserAnswer] = useState<string[]>([])


  useEffect(() => {

    async function getQuiz() {
      if (quizId) {
        const { data, error } = await supabase
        .from('questions')
        .select(`
        question,
        id,
        answers (
          questionId,
          answer,
          id
        )
      `)
      .eq('quizId', quizId)

      if (error) {
        setError('Could not fetch quiz')
        setTheQuestion([])
      }
      if (data) {
        setTheQuestion(data)
        setError(undefined)
      }
      }
    }

/*     async function getQuiz() {
      if (quizId) {
        fetch('/api/getQuiz', {
          body: JSON.stringify ({
            quizId: quizId
          }),
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then((response) => {
          console.log("response = ", response)
    
          return response.json();
       })
       .then((data) => {
           console.log("data = ", data)
       })
       .catch((error) => console.error(error));
    
      }
  } */

    getQuiz()
  }, [quizId])


  const answerQuiz = async (event: any) => {
    event.preventDefault()
    console.log("userAnswer = ", userAnswer)

    fetch('/api/validateAnswer', {
      body: JSON.stringify ({
        answer: userAnswer
      }),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }) 
    .then((response) => {
      console.log("response = ", response)

      return response.json();
   })
   .then((data) => {
       console.log("data = ", data)
   })
   .catch((error) => console.error(error));

}

  const renderQuiz = () => {
    return (
      <div>
        <form onSubmit={answerQuiz}>
        { theQuestion && theQuestion?.map((question) => (
        <div key={question.question}>
          <h2><strong>Question:</strong></h2>
          <p>{question.question}</p>
          <br></br>
          {question?.answers?.map((answer, index) => (
            <div key={answer.answer}>
          <h2><strong>{` Answer option: ${index + 1}`}</strong></h2>
            <label>{answer.answer}</label>
              <input
                type={'checkbox'}
                value={answer.answer}
                onChange={(event) => event.target.checked 
                ? setUserAnswer([...userAnswer, answer.id]) 
                : setUserAnswer(userAnswer.filter((item) => item !== answer.id))
              }
              ></input>
              <br></br>
            </div>
          ))}
              <br></br>
              <br></br>
        </div>
      ))}
        
        <input type="submit" value="Submit quiz"/>
        </form>

    </div>
    )
  }

  return (
    <Layout>
        <div>
            This is the start quiz page!!
        </div>
        <div>{renderQuiz()}</div>

    </Layout>
  )
}

export default StartQuiz
