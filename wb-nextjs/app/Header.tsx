import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='p-5 bg-red-500'>
        <Link href="/" className='px-2 py-1 bg-white text-black-500'>Home</Link>
        <Link href="/decks" className='px-2 py-1 bg-white text-black-500'>Decks</Link>
    </header>
  )
}
