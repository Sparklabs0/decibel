import Layout from '@/custom-components/Layout';
// import NavItems from '@/mycomponents/NavItems';
import NavBarSide from '@/ui-components/NavBarSide';
import {
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import React from 'react';

function Dashboard({ user, signOut }: WithAuthenticatorProps) {
  return (
    <Layout>
      <div>
        <h1>Hello {user?.username}</h1>
      </div>
    </Layout>
  );
}

export default Dashboard;
