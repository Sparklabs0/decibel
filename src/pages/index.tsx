import { Inter } from "next/font/google";
import Head from "next/head";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

const inter = Inter({ subsets: ["latin"] });

function Home() {
  return (
    <>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            {user && (
              <div>
                <h1>Hello, {user.username}!</h1>
                <button onClick={signOut}>Sign out</button>
              </div>
            )}
          </main>
        )}
      </Authenticator>
    </>
  );
}

export default withAuthenticator(Home);