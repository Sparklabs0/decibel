import '@/styles/globals.css';
import { studioTheme } from '@/ui-components/';
import { AmplifyProvider, Authenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { ReactElement, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import awsExports from '../aws-exports';
import '../styles/globals.css';
Amplify.configure({ ...awsExports, ssr: true });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AmplifyProvider theme={studioTheme}>
      <Authenticator.Provider>
        <Toaster position="bottom-center" reverseOrder={false} />
        <main className={roboto.className}>
          {' '}
          {getLayout(<Component {...pageProps} />)}
        </main>
      </Authenticator.Provider>
    </AmplifyProvider>
  );
}
