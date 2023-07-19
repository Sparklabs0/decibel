import Layout from '@/custom-components/Layout';
// import NavItems from '@/mycomponents/NavItems';
import NavBarSide from '@/ui-components/NavBarSide';
import {
  Text,
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
      <Text>Hello {user?.attributes?.name}</Text>
    </View>
  );
}
Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
