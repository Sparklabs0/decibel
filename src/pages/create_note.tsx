import { CreateNoteMutation } from '@/API';
import Layout from '@/custom-components/Layout';
import { NoteCreateForm } from '@/ui-components';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { Button, Flex, TextField, useTheme } from '@aws-amplify/ui-react';
import {
  StorageManager,
  StorageManagerProps,
} from '@aws-amplify/ui-react-storage';
import { StorageManagerHandle } from '@aws-amplify/ui-react-storage/dist/types/components/StorageManager/types';
import { tokens } from '@aws-amplify/ui/dist/types/theme/tokens';
import { REFUSED } from 'dns';
import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';
import * as mutations from '../graphql/mutations';
function NoteAudioUploader() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState({});
  const ref = React.useRef<StorageManagerHandle>(null);
  const { tokens } = useTheme();

  const resetForm = async () => {
    setTitle('');
    setFiles({});
    if (ref.current) {
      ref.current.clearFiles();
    }
  };

  const createNote = async () => {
    console.log({ title, files });
    // try {
    //   const note = await API.graphql<GraphQLQuery<CreateNoteMutation>>({
    //     query: mutations.createNote,
    //     variables: { input: { title: '2todoDetails', audio: ['3.mp3'] } },
    //     authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    //   });
    //   console.log(note);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <Flex direction="column">
      {/* <NoteCreateForm
        marginTop={24}
        padding={0}
        onSuccess={() => {
          router.push('/audio_files');
        }}
      /> */}
      <TextField
        descriptiveText="Enter a valid note title"
        placeholder="Enter Title"
        label="Note Title"
        errorMessage="There is an error"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <StorageManager
        acceptedFileTypes={['audio/*']}
        accessLevel="protected"
        maxFileCount={1}
        maxFileSize={5000000}
        onUploadSuccess={({ key = '' }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: true,
            };
          });
        }}
        ref={ref}
      />
      <Flex direction="row" justifyContent="space-between">
        <Button
          color={tokens.colors.white.original}
          borderRadius={8}
          border="none"
          backgroundColor={tokens.colors.neutral[60]}
          onClick={resetForm}
        >
          Reset
        </Button>
        <Button
          onClick={createNote}
          borderRadius={8}
          color={tokens.colors.white.original}
          backgroundColor={tokens.colors.brand.primary[80]}
        >
          Create Note
        </Button>
      </Flex>
    </Flex>
  );
}

NoteAudioUploader.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NoteAudioUploader;
