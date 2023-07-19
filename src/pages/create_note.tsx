import Layout from '@/custom-components/Layout';
import { Button, Text, View } from '@aws-amplify/ui-react';
import Link from 'next/link';
import React, { ReactElement } from 'react';

function NewNotes() {
  return (
    <View>
      <Link href="/upload_audio" >
        <Button>Upload Audio</Button>
      </Link>
    </View>
  );
}

NewNotes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NewNotes;
