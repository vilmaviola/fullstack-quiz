import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../../../../utils/supabaseClient'
import Layout from '../../../../Layout'

/* type Question = {
  question: string,
  id: number,
  answers: Answer[],
}

type Answer = {
  correct: boolean,
  answer: string,
  questionId: number,
}

type QuizQuestion = ({
  question: any;
  } & {
      id: any;
  } & {
      answers: unknown;
  })[] | undefined */

function ConfirmQuiz() {

    const router = useRouter()
    const { quizId } = router.query

    const [theQuiz, setTheQuiz] = useState(null)
    const [error, setError] = useState<string>()

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
            correct
          )
        `)
        .eq('quizId', quizId)
  
        if (error) {
          setError('Could not fetch quiz')
          setTheQuiz(null)
        }
        if (data) {
          setTheQuiz(data)
          setError(undefined)
        }
        //console.log("quizData = ", data)
        }
      }

      getQuiz()
    }, [])

/*     useEffect(() => {
      console.log("theQuiz = ", theQuiz)
    }, [theQuiz]) */

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