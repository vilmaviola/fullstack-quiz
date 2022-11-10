import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../../Layout'

function ConfirmQuiz() {

    const router = useRouter()
    const { quizId } = router.query

    const [theQuiz, setTheQuiz] = useState<({ question: any; } & { id: number; } & { answers: ({ answer: any; } & { id: any; } & { questionId: any;} & { correct: any; })[]; })[]>()
    const [error, setError] = useState<string>()

    useEffect(() => {
      async function getQuiz() {
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
            return response.json();
         })
         .then((data) => {
            setTheQuiz(data)
            setError(undefined)
         })
         .catch((error) => {
            setError('Could not fetch quiz')
            setTheQuiz([])
        });
      
        }
    }

      getQuiz()
    }, [])


    const renderQuiz = () => {
      return (
        <div>
        {theQuiz?.map((question) => (
          <div key={question.question}>
            <h2><strong>Question:</strong></h2>
            <p>{question.question}</p>
            <br></br>
            {question?.answers?.map((answer) => (
              <div key={answer.answer}>
            <h2><strong>Answer:</strong></h2>
                <p>{answer.answer}</p>
                <p>{answer.correct ? 'Correct' : 'False'}</p>
                <br></br>
              </div>

            ))}

          </div>
        ))}
      </div>
      )

    }

  return (
    <Layout>
        <div>
            <h1><strong>This is the confirm page!!!!</strong></h1>
            <br></br>
        </div>
        {error && <p>{error}</p>}
        {quizId && theQuiz && (
          renderQuiz()
        )}
        <div>
          <button onClick={() => navigator.clipboard.writeText(`http://localhost:3000/quiz/start/${quizId}`)}>Click here to copy link to quiz!</button>
        </div>
    </Layout>
  )

}

export default ConfirmQuiz