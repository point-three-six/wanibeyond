import '../styles/globals.css'
import Header from './Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />

      <body>
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
