import React from 'react'
import Link from 'next/link'
import { Suspense } from 'react';
import UserInfoBar from './components/UserInfoBar'

export default function Header() {
  return (
    <header className='flex justify-center bg-slate-700 mb-7'>
      <div className='flex max-width space-x-4 p-4'>
        <Link href="/" className='px-2 py-1 text-white '>Home</Link>
        {/* <Link href="/decks" className='px-2 py-1 text-white '>Decks</Link> */}
        <Link href="/about" className='px-2 py-1 text-white '>About</Link>
        <UserInfoBar />
      </div>
    </header>
  )
}
