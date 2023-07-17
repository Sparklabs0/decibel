import "@/styles/globals.css";
import { studioTheme } from "@/ui-components/";
import { AmplifyProvider, Authenticator, View } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import type { AppProps } from "next/app";
import awsExports from "../aws-exports";
import "../styles/globals.css";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

Auth.configure({ ...awsExports, ssr: true });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AmplifyProvider theme={studioTheme}>
      <Authenticator.Provider>
        getLayout(
        <Component {...pageProps} />)
      </Authenticator.Provider>
    </AmplifyProvider>
  );
}
