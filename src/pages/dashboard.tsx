import NavItems from '@/mycomponents/navItems';
import NavBarSide from '@/ui-components/NavBarSide';
import { withAuthenticator,WithAuthenticatorProps } from '@aws-amplify/ui-react'
import React from 'react'
import { ThemeProvider } from '@aws-amplify/ui-react';




function Dashboard({user,signOut}:WithAuthenticatorProps) {
  return (
    <div>
      <ThemeProvider>
     <h1>Hello {user?.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <NavBarSide  frame437={<NavItems/>}/>
      </ThemeProvider>
    </div>
  )
}



export default withAuthenticator(Dashboard,{
    loginMechanisms: ['email'],
    signUpAttributes: ['name','email'],
})
