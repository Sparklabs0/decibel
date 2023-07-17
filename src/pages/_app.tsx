import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import awsExports from "../aws-exports";
import { Auth } from 'aws-amplify';
import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import {studioTheme} from '@/ui-components/'
import { AmplifyProvider } from '@aws-amplify/ui-react';

Auth.configure({ ...awsExports, ssr: true });

export default function App({ Component, pageProps }: AppProps) {
  return <AmplifyProvider theme={studioTheme}><Component {...pageProps} /></AmplifyProvider>
}
