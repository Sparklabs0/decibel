import { NavBarHeader, NavBarSide } from '@/ui-components';
import {
  Button,
  Card,
  Flex,
  Grid,
  useTheme,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import React from 'react';
import { BiLeftArrow, BiLeftArrowAlt } from 'react-icons/bi';
import { BsBack } from 'react-icons/bs';
import styles from '../styles/Layout.module.css';
import NavItems from './NavItems';

function Layout({ children }: { children: React.ReactNode }) {
  const { tokens } = useTheme();
  const router = useRouter();
  return (
    <>
      <NavBarSide
        backgroundColor={tokens.colors.brand.secondary[10]}
        overrides={{
          NavBarSide: {
            height: '100vh',
            borderRadius: '0',
          },
          Button: {
            borderRadius: '8px',
          },
        }}
        columnStart="1"
        columnEnd="2"
        position="fixed"
        left="0"
        overflow="auto"
        width="300px"
        className={styles.sidebar}
      >
        <NavItems />
      </NavBarSide>
      <NavBarHeader
        className={styles.navbar}
        position="fixed"
        backgroundColor={tokens.colors.neutral[20]}
        right="0"
        height="80px"
        width="calc(100vw - 300px)"
        left="300px"
        boxShadow="none"
      />

      <View
        top="80px"
        bottom="0"
        right="0"
        left="300px"
        position="fixed"
        className={styles.content}
      >
        <Button
          border="none"
          borderRadius={8}
          marginBottom={20}
          variation="primary"
          onClick={() => {
            router.back();
          }}
        >
          <BiLeftArrowAlt color="white" />
        </Button>
        {children}
      </View>
    </>
  );
}

export default withAuthenticator(Layout, {
  loginMechanisms: ['email'],
  signUpAttributes: ['name', 'email'],
  socialProviders: ['google'],
});
