import Layout from '@/custom-components/Layout';
import { NotesCreateForm } from '@/ui-components';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

function UploadAudio() {
  const router = useRouter();
  return (
    <NotesCreateForm
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
