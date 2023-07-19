import { NavBarSide } from '@/ui-components';
import { Flex, useTheme, View, withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import styles from '../styles/Layout.module.css';
import NavItems from './NavItems';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <View className={styles.layout} height="100vh">
      <View className={styles.navbar}>
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
        >
          <NavItems />
        </NavBarSide>
      </View>
      <View className={styles.content}>{children}</View>
    </View>
  );
}

export default withAuthenticator(Layout, {
  loginMechanisms: ['email'],
  signUpAttributes: ['name', 'email'],
});
