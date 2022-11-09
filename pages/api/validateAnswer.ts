// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { data, error } = await supabase
    .from('answers')
    .select('id, correct')
    .in('id', req?.body?.answer)

    console.log("data = ", data)
    console.log("error = ", error)

  res.status(200).json(data)}
