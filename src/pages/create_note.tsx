import { CreateNoteMutation } from '@/API';
import Layout from '@/custom-components/Layout';
import { NoteCreateForm } from '@/ui-components';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import {
  Button,
  Flex,
  Text,
  TextField,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import {
  StorageManager,
  StorageManagerProps,
} from '@aws-amplify/ui-react-storage';
import { StorageManagerHandle } from '@aws-amplify/ui-react-storage/dist/types/components/StorageManager/types';
import { tokens } from '@aws-amplify/ui/dist/types/theme/tokens';
import { Predictions, Storage } from 'aws-amplify';
import axios from 'axios';
import { REFUSED } from 'dns';

import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as mutations from '../graphql/mutations';
interface Files {
  [key: string]: any; // Or you can specify the specific type of the files if known
}
enum LoadingStatus {
  Transcribing = 'transcribing note...',
  Summarizing = 'generating & formatting note ...',
}
function NoteAudioUploader() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<Files>({});
  // const [summary, setSummary] = useState<string>('');
  const ref = React.useRef<StorageManagerHandle>(null);
  const { tokens } = useTheme();

  const [loading, setLoading] = useState<LoadingStatus | ''>('');
  const resetForm = async () => {
    setTitle('');
    setFiles({});
    if (ref.current) {
      ref.current.clearFiles();
    }
  };

  const createNote = async () => {
    try {
      if (!files || Object.keys(files).length === 0) {
        toast.error('Please upload an audio file');
        return;
      }

      try {
        const data = await Storage.get(Object.keys(files)[0], {
          level: 'private',
        });

        setLoading(LoadingStatus.Transcribing);
        toast.loading(LoadingStatus.Transcribing);
        const transcriptionResponse = await axios.post(`/api/transcribe`, {
          source: data,
        });

        if (!transcriptionResponse.data.transcript) {
          toast.error('Transcription not available');
          setLoading('');
          return;
        }
        setLoading(LoadingStatus.Summarizing);
        toast.loading(LoadingStatus.Summarizing);
        const summarizingResponse = await axios.post(`/api/summarize`, {
          prompt: transcriptionResponse.data.transcript,
        });
        toast.dismiss();

        const summaryData = JSON.parse(summarizingResponse.data.summary);
        const summaryText =
          summaryData && summaryData[0] && summaryData[0].summary;

        if (!summaryText) {
          toast.error('Summary not available');
          setLoading('');
          return;
        }
        // setSummary(summaryText);

        const fileKeys = Object.keys(files);
        const note = await API.graphql<GraphQLQuery<CreateNoteMutation>>({
          query: mutations.createNote,
          variables: {
            input: {
              title,
              audio: fileKeys,
              transcription: transcriptionResponse.data.transcript,
              summary: summaryText,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });

        toast.success('Note created successfully');
        router.push('/my_notes');
      } catch (error) {
        console.error('Error during the process:', error);
        toast.error('Error during the process');
      } finally {
        setLoading('');
      }
    } catch (error) {
      console.error('Error while getting audio:', error);
      toast.error('Error while getting audio');
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
        accessLevel="private"
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
          variation="menu"
        >
          Reset
        </Button>
        <Button
          onClick={createNote}
          borderRadius={8}
          color={tokens.colors.white.original}
          variation="primary"
          isLoading={
            loading === LoadingStatus.Transcribing ||
            loading === LoadingStatus.Summarizing
          }
        >
          Create Note
        </Button>
      </Flex>
      {/* <Flex>
        <Text>{summary}</Text>
      </Flex> */}
    </Flex>
  );
}

NoteAudioUploader.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NoteAudioUploader;
