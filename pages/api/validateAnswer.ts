// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

/*     async function getQuiz() {
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

      }
    }
 */


    console.log(req.body)
  res.status(200).json({ name: 'John Doe' })
}
