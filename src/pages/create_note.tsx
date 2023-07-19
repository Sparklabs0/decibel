import Layout from '@/custom-components/Layout';
import { Text, View } from '@aws-amplify/ui-react';
import React, { ReactElement } from 'react';

function NewNotes() {
  return (
    <View>
      <Text>Create Note</Text>
    </View>
  );
}

NewNotes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewNotes;
