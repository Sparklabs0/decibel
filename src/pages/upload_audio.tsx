import Layout from '@/custom-components/Layout';
import { NoteCreateForm } from '@/ui-components';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

function UploadAudio() {
  const router = useRouter();
  return (
    <NoteCreateForm
      padding={0}
      paddingTop={24}
      onSuccess={() => {
        router.back();
      }}
    />
  );
}

UploadAudio.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default UploadAudio;
