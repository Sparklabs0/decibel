import { NavBarHeader, NavBarSide } from '@/ui-components';
import {
  Card,
  Flex,
  Grid,
  useTheme,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import React from 'react';
import styles from '../styles/Layout.module.css';
import NavItems from './NavItems';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Grid
      columnGap="0.2rem"
      rowGap="0.2rem"
      height="100vh"
      templateColumns="1fr 6fr "
      templateRows="1fr 12fr"
    >
      <NavBarHeader
        columnStart="1"
        columnEnd="-1"
        className={styles.navbar}
        width="100%"
      />
      <NavBarSide
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
        height="100%"
        width="100%"
        className={styles.sidebar}
      >
        <NavItems />
      </NavBarSide>

      <View columnStart="2" columnEnd="-1" className={styles.content}>
        {children}
      </View>
    </Grid>
  );
}

export default withAuthenticator(Layout, {
  loginMechanisms: ['email'],
  signUpAttributes: ['name', 'email'],
});
