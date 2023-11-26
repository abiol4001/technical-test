"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const LandingPage = (props: Props) => {
    const router = useRouter()

    //Redirecting to the note page since the landing page doesnt have any content
    router.push("/notes")
  return (
    <div className='flex justify-center items-center h-full'>Landing Page</div>
  )
}

export default LandingPage