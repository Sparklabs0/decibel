import Layout from '@/custom-components/Layout';
// import NavItems from '@/mycomponents/NavItems';
import NavBarSide from '@/ui-components/NavBarSide';
import {
  useAuthenticator,
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import React from 'react';

function Dashboard() {
  const { user } = useAuthenticator((context) => [context.user]);
  return (
    <Layout>
      <div>
        <h1>Hello {user?.attributes?.name}</h1>
      </div>
    </Layout>
  );
}

export default Dashboard;
