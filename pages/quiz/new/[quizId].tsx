import { User } from '@supabase/supabase-js'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../../../utils/supabaseClient'
import Layout from '../../Layout'


function AddQuestions() {

  return (
    <Layout>
        <div>
            <h1>Add questions here!</h1>
        </div>
    </Layout>
  )
}

export default AddQuestions
