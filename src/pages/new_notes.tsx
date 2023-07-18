import Layout from '@/custom-components/Layout';
import { View } from '@aws-amplify/ui-react';
import React, { ReactElement } from 'react';

function NewNotes() {
  return <View>New Notes</View>;
}

NewNotes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewNotes;
