import '@/styles/globals.css';
import { studioTheme } from '@/ui-components/';
import { AmplifyProvider, Authenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Auth } from 'aws-amplify';
import type { AppProps } from 'next/app';
import awsExports from '../aws-exports';
import '../styles/globals.css';

Auth.configure({ ...awsExports, ssr: true });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AmplifyProvider theme={studioTheme}>
      <Authenticator.Provider>
        <Component {...pageProps} />
      </Authenticator.Provider>
    </AmplifyProvider>
  );
}
