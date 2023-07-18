import Layout from '@/custom-components/Layout';
import { View } from '@aws-amplify/ui-react';
import React, { ReactElement } from 'react';

function AudioFiles() {
  return <View>Audio Files</View>;
}

AudioFiles.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AudioFiles;
