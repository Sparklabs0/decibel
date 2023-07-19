import Layout from '@/custom-components/Layout';
import { Button, Text, View } from '@aws-amplify/ui-react';
import Link from 'next/link';
import React, { ReactElement } from 'react';

function NewNotes() {
  return <View></View>;
}

NewNotes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewNotes;
