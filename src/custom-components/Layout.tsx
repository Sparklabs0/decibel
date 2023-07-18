import { NavBarSide } from '@/ui-components';
import { Flex, useTheme, View, withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
// Layout.tsx
import styles from '../styles/Layout.module.css';
import NavItems from './NavItems';
// import NavItems from './NavItems';

function Layout({ children }: { children: React.ReactNode }) {
  const { tokens } = useTheme();
  return (
    <View className={styles.layout}>
      <View className={styles.navbar}>
        <NavBarSide
          overrides={{
            NavBarSide: {
              height: '100vh',
              borderRadius: '0',
            },
          }}
        >
          <NavItems />
        </NavBarSide>
      </View>
      <View
        className={styles.content}
        backgroundColor={tokens.colors.background.tertiary}
      >
        {children}
      </View>
    </View>
  );
}

export default withAuthenticator(Layout, {
  loginMechanisms: ['email'],
  signUpAttributes: ['name', 'email'],
});
