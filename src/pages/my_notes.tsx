import Layout from '@/custom-components/Layout';
// import { NoteCollection } from '@/ui-components';
import { View } from '@aws-amplify/ui-react';
import React, { ReactElement } from 'react';

function Notes() {
  return <View>{/* <NoteCollection /> */}</View>;
}

Notes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notes;
