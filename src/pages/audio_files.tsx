import Layout from '@/custom-components/Layout';
import { Button, View } from '@aws-amplify/ui-react';
import Link from 'next/link';
import React, { ReactElement } from 'react';

function AudioFiles() {
  return (
    <View>
      <Link href="/upload_audio">
        <Button>Upload Audio</Button>
      </Link>
    </View>
  );
}

AudioFiles.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AudioFiles;
