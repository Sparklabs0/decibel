import Layout from '@/custom-components/Layout';
// import NavItems from '@/mycomponents/NavItems';
import NavBarSide from '@/ui-components/NavBarSide';
import {
  useAuthenticator,
  View,
  withAuthenticator,
  WithAuthenticatorProps,
} from '@aws-amplify/ui-react';
import React, { ReactElement } from 'react';

function Dashboard() {
  const { user } = useAuthenticator((context) => [context.user]);
  return (
    <View>
      <h1>Hello {user?.attributes?.name}</h1>
    </View>
  );
}
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
