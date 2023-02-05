import '../styles/globals.css'
import Header from './Header';
import { cookies } from 'next/headers';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nextCookies = cookies();
  let theme = nextCookies.get('wp_theme')?.value || '';

  return (
    <html className={`${theme == 'dark' ? 'dark' : ''}`}>
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
