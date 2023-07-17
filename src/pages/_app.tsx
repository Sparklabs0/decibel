import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import awsExports from "../aws-exports";
import { Auth } from 'aws-amplify';
import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";

Auth.configure({ ...awsExports, ssr: true });

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
