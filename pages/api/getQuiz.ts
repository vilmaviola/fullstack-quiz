// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const quizId = req?.body?.quizId

  const { data, error } = await supabase
  .from('questions')
  .select(`
  question,
  id,
  answers (
    questionId,
    answer,
    id,
    correct
  )
`)
.eq('quizId', quizId)

  res.status(200).json(data)

}
