import type { AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react'

const App: AppType = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
};

export default App;