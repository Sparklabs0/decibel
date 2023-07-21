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
interface Files {
  [key: string]: any; // Or you can specify the specific type of the files if known
}
function NoteAudioUploader() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<Files>({});
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
    try {
      const fileKeys = Object.keys(files);
      const note = await API.graphql<GraphQLQuery<CreateNoteMutation>>({
        query: mutations.createNote,
        variables: { input: { title, audio: fileKeys } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
    } catch (error) {
      console.error(error);
    }
  };

  interface ProcessedFile {
    file: File;
    key: string;
  }

  const processFile = async ({
    file,
  }: {
    file: File;
  }): Promise<ProcessedFile> => {
    const fileExtension = file.name.split('.').pop();

    return file
      .arrayBuffer()
      .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, '0'))
          .join('');
        return { file, key: `${hashHex}.${fileExtension}` };
      });
  };

  return (
    <Flex direction="column">
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
        processFile={processFile}
        onFileRemove={({ key = '' }) => {
          setFiles((prevFiles) => {
            const updatedFiles = { ...prevFiles };
            delete updatedFiles[key];
            return updatedFiles;
          });
        }}
        onUploadError={(error, { key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'error',
              },
            };
          });
        }}
        onUploadSuccess={({ key = '' }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'success',
              },
            };
          });
        }}
        onUploadStart={({ key = '' }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'uploading',
              },
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
