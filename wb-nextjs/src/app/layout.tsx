import '../styles/globals.css'
import Header from './Header'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <Script src='/darkMode.js' strategy='beforeInteractive' />
      </head>

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
