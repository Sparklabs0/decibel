import { NavBarSide } from '@/ui-components'
import React from 'react'
import NavItems from './navItems'
import { Flex, View, useTheme, withAuthenticator } from '@aws-amplify/ui-react'

// Layout.tsx

import styles from '../styles/Layout.module.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <div className={styles.navbar}>
        <NavBarSide children={<NavItems />} />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}



export default withAuthenticator(Layout,{
  loginMechanisms: ['email'],
  signUpAttributes: ['name','email'],
})
