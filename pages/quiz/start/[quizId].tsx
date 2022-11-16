import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Layout from '../../Layout'

function StartQuiz() {

  const router = useRouter()
  const { quizId } = router.query

  const [theQuestion, setTheQuestion] = useState<({ question: any; } & { id: number; } & { answers: ({ answer: any; } & { id: any; } & { questionId: any;} & { correct: any; })[]; })[]>()
  const [error, setError] = useState<string>()
  const [userAnswer, setUserAnswer] = useState<string[]>([])
  const [validatedAnswer, setValidatedAnswer] = useState<({ answer: any; } & { id: any; } & { correct: any; })[]>()

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
          setTheQuestion(data)
          setError(undefined)
       })
       .catch((error) => {
        setError(error)
        setTheQuestion([])
      });
    
      }
  }

    getQuiz()
  }, [quizId])


  const answerQuiz = async (event: any) => {
    event.preventDefault()

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
      return response.json();
   })
   .then((data) => {
       setValidatedAnswer(data)
   })
   .catch((error) => {
    console.error(error)
    setError(error)
  });

}
/* console.log("validatedAnswer = ", validatedAnswer)
validatedAnswer.map((answer) => {
  console.log("answer = ", answer)
}) */

  const renderQuiz = () => {
    return (
      <div>
        {error && error}
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

  const renderValidatedAnswers = () => {
    return (
      <>
      <p>HEJ</p>
        {error && error}
        {validatedAnswer && validatedAnswer?.map((answer: ({ answer: any; } & { id: any; } & { correct: any; })) => {
          <div key={answer.answer}>
            <br></br>
            <p>{answer.answer}</p>
            <br></br>
            <p>{answer.correct}</p>
            <br></br>
          </div>
        })}
    </>
    )
  }

  const countCorrectAnswers = useMemo(() => {
    const listOfCorrect = validatedAnswer?.map((answer) => answer.correct).flat()
    const countTrue = listOfCorrect?.filter((correct: boolean) => correct === true).length
    return countTrue
  }, [validatedAnswer])

  return (
    <Layout>
        <div>
            This is the start quiz page!!
        </div>
        <div>
          {validatedAnswer ? (
            <div>
              {renderValidatedAnswers()}
              Number of correct answers: {countCorrectAnswers}
            </div>
          ) : (
            <>
              {renderQuiz()}
            </>
          )}
        </div>

    </Layout>
  )
}

export default StartQuiz
