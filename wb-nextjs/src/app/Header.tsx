import Link from 'next/link'
import UserInfoBar from './components/UserInfoBar'
import ThemeButton from './components/ThemeButton';

export default function Header() {
  return (
    <header className='flex justify-center bg-slate-700 dark:bg-neutral-800 mb-7'>
      <div className='flex max-width space-x-4 p-4'>
        <Link href="/" className='px-2 py-1 text-white '>Home</Link>
        <Link href="/decks" className='px-2 py-1 text-white '>Decks</Link>
        <Link href="/decks/create" className='px-2 py-1 text-white'>Create</Link>
        <ThemeButton />
        {/* <Link href="/about" className='px-2 py-1 text-white '>About</Link> */}
        <UserInfoBar />
      </div>
    </header>
  )
}
