import { CreateNoteMutation } from '@/API';
import Layout from '@/custom-components/Layout';
import { NoteCreateForm } from '@/ui-components';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import {
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Loader,
  Text,
  TextField,
  useTheme,
  View,
  VisuallyHidden,
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
import { ClipLoader } from 'react-spinners'; // Import the ClipLoader

import { useRouter } from 'next/router';
import React, { ChangeEvent, ReactElement, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as mutations from '../graphql/mutations';
interface Files {
  [key: string]: any; // Or you can specify the specific type of the files if known
}
enum LoadingStatus {
  Transcribing = 'transcribing audio...',
  Summarizing = 'generating note...',
  Success = 'note creation successful...',
}
function NoteAudioUploader() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [files, setFiles] = useState<Files>({});
  const [loading, setLoading] = useState<LoadingStatus | ''>('');
  // const [summary, setSummary] = useState<string>('');
  const ref = React.useRef<StorageManagerHandle>(null);
  const { tokens } = useTheme();

  const resetForm = async () => {
    setTitle('');
    setFiles({});
    if (ref.current) {
      ref.current.clearFiles();
    }
  };

  const tempText = `Lessons Learned:

  1. The Power of AI: AI is a powerful tool that can be used to simplify and streamline the process of creating content for social media. With the right AI tools, you can create content in just a few clicks and have it posted to social media in a matter of hours.
  
  2. Ideation Process: Ideation is an important part of the content creation process. It involves brainstorming ideas, researching topics, and creating a plan for how to best present the content.
  
  3. Benefits of a YouTube Channel: Starting a YouTube channel can be a great way to learn more while teaching. You can get feedback from viewers and share your journey with the world.
  
  4. Three Niches: There are three main niches that startups target: developers, creators, and social media marketers. Each of these niches has its own unique needs and challenges.
  
  5. Features and Ideas: When creating a startup, it`

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
        // toast.loading(LoadingStatus.Transcribing);
        const transcriptionResponse = await axios.post(`/api/transcribe`, {
          source: data,
        });

        if (!transcriptionResponse.data.transcript) {
          toast.error('Transcription not available');
          setLoading('');
          return;
        }
        setLoading(LoadingStatus.Summarizing);
        // toast.loading(LoadingStatus.Summarizing);
        const summarizingResponse = await axios.post(`/api/summarize`, {
          prompt:  transcriptionResponse.data.transcript,
        });
        toast.dismiss();

        console.log(summarizingResponse.data,"summary data that I am logging, its summary.data")
        // const summaryData = JSON.parse(summarizingResponse.data.summary);
        // console.log(summaryData,"summary data which is parsed")
        const summaryText = summarizingResponse.data.summary;


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
        setLoading(LoadingStatus.Success);
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
    <>
      <Heading marginTop={24} marginBottom={24} level={4}>
        Create Note
      </Heading>
      <Text variation="info" marginBottom={24}>
        Effortlessly upload audio files, transcribe, and generate comprehensive
        notes. Edit your notes using our user-friendly WYSIWYG editor.
      </Text>
      {loading && (
        <Flex
          marginBottom={16}
          backgroundColor={tokens.colors.brand.primary[80]}
          padding={16}
          borderRadius={8}
        >
          <ClipLoader size={20} color="#007bff" />
          {/* <Loader size="large" color="#007bff" /> */}
          <Text color={tokens.colors.white}>{loading}</Text>
        </Flex>
      )}
      <Flex direction="column">
        <TextField
          isRequired={true}
          // descriptiveText="Enter a valid note title"
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
          components={{
            Container({ children }) {
              return <Card variation="elevated">{children}</Card>;
            },
            DropZone({ children, displayText, inDropZone, ...rest }) {
              return (
                <Flex
                  alignItems="center"
                  direction="column"
                  padding="medium"
                  backgroundColor={inDropZone ? 'brand.primary.10' : ''}
                  {...rest}
                >
                  <Text>Drop audio files here, and click create note</Text>
                  <Divider size="small" label="or" maxWidth="10rem" />
                  {children}
                </Flex>
              );
            },
          }}
        />
        <Flex direction="row" justifyContent="space-between">
          <Button
            // color={tokens.colors.white.original}
            borderRadius="8px"
            border="none"
            // backgroundColor={tokens.colors.neutral[60]}
            onClick={resetForm}
            variation="warning"
            isDisabled={
              loading === LoadingStatus.Transcribing ||
              loading === LoadingStatus.Summarizing
            }
          >
            Reset
          </Button>
          <Button
            onClick={createNote}
            borderRadius="8px"
            color={tokens.colors.white.original}
            variation="primary"
            isDisabled={
              loading === LoadingStatus.Transcribing ||
              loading === LoadingStatus.Summarizing
            }
          >
            Create Note
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

NoteAudioUploader.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NoteAudioUploader;
