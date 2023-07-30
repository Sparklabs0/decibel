import Notification from '@/custom-components/Notification';
import '@/styles/globals.css';
import { studioTheme } from '@/ui-components/';
import { AmplifyProvider, Authenticator, View } from '@aws-amplify/ui-react';
import { withInAppMessaging } from '@aws-amplify/ui-react-notifications';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Notifications } from 'aws-amplify';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { ReactElement, ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import awsExports from '../aws-exports';
import '../styles/globals.css';

Amplify.configure({ ...awsExports });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const { InAppMessaging } = Notifications;

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    InAppMessaging.syncMessages();
  }, []);

  return (
    <>
      <AmplifyProvider theme={studioTheme}>
        <Authenticator.Provider>
          <Toaster position="bottom-center" reverseOrder={false} />
          <main className={roboto.className}>
            {' '}
            {getLayout(<Component {...pageProps} />)}
          </main>
        </Authenticator.Provider>
      </AmplifyProvider>
    </>
  );
}

export default withInAppMessaging(App, {
  components: { BannerMessage: Notification },
});
