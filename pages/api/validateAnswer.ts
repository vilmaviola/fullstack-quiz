// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabaseClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { data, error } = await supabase
    .from('answers')
    .select('id, correct, answer')
    .in('id', req?.body?.answer)
    
  res.status(200).json(data)}
