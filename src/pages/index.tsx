import {
  Authenticator,
  Flex,
  Grid,
  useAuthenticator,
  useTheme,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Dashboard from './dashboard';

const components = {
  // Add your custom components here
};

function Home() {
  const { tokens } = useTheme();
  const { authStatus } = useAuthenticator((context) => [context.route]);
  const router = useRouter();

  if (authStatus === 'authenticated') {
    router.push('/my_notes');
    return null; // Render nothing while redirecting
  }

  return (
    <>
      {/* {authStatus === 'configuring' && 'Loading...'} */}
      <Grid templateColumns={{ base: '1fr 0', medium: '1fr 1fr' }}>
        <Flex
          backgroundColor={tokens.colors.background.primary}
          justifyContent="center"
          height="100vh"
        >
          <Authenticator
            components={components}
            loginMechanisms={['email']}
            signUpAttributes={['name', 'email']}
            socialProviders={['google']}
          >
            {/* {({ signOut, user }) => (
          <main>
            <h1>Hello, {user?.username}!</h1>
            <button onClick={signOut}>Sign out</button>
          </main>
        )} */}
          </Authenticator>
        </Flex>
        <View height="100vh" overflow="hidden">
          {' '}
          <View style={{ width: '100%', height: '100%', position: 'relative' }}>
            <Image
              alt="display"
              src="/display_.webp"
              fill
              style={{ objectFit: 'cover' }}
              objectFit="cover"
            />
          </View>
        </View>
      </Grid>
    </>
  );
}

export default Home;
