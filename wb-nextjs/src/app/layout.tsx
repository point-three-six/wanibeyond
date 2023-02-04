import '../styles/globals.css'
import Header from './Header'
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />

      <body className='bg:white dark:bg-neutral-900 dark:text-neutral-300'>
        <Header />
        <div className='flex justify-center m-4'>
          <div className='flex justify-center max-width'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
