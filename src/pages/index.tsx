import { Inter } from "next/font/google";
import Head from "next/head";
import { Authenticator, Flex, Grid, View, useTheme, withAuthenticator } from "@aws-amplify/ui-react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const components = {
  // Add your custom components here
};


function Home() {
  const { tokens } = useTheme();

  return (
    <Grid templateColumns={{ base: "1fr 0", medium: "1fr 1fr" }}>
    <Flex
      backgroundColor={tokens.colors.background.secondary}
      justifyContent="center"
    >
      <Authenticator components={components} loginMechanisms={['email']} signUpAttributes={['name','email']}>
        {({ signOut, user }) => (
          <main>
            {/* <h1>Hello, {user.username}!</h1> */}
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </Flex>
    <View height="100vh">
      <img
        src="your-background-image-url"
        width="100%"
        height="100%"
        // objectFit="cover"
      />
    </View>
  </Grid>
  );
}

export default Home;