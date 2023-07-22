import AudioCard from '@/custom-components/AudioCard';
import { default as Layout } from '@/custom-components/Layout';
import {
  Button,
  Card,
  Collection,
  Heading,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import { ReactElement, useEffect, useState } from 'react';

export const AudioFiles = () => {
  const { tokens } = useTheme();
  const [fileKeys, setFileKeys] = useState<string[]>([]);

  useEffect(() => {
    Storage.list('', { level: 'private' })
      .then(({ results }) => {
        // Extract the file keys from the response and filter out any undefined values
        const keys = results
          .map((result) => result.key)
          .filter(Boolean) as string[];
        setFileKeys(keys);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeFromList = async (key_: string) => {
    setFileKeys((prevFileKeys) => prevFileKeys.filter((key) => key !== key_));
  };

  return (
    <View>
      <Heading
        marginTop={24}
        marginBottom={24}
        level={4}
      >{`Audio Uploads (${fileKeys.length})`}</Heading>
      <Collection type="list" items={fileKeys}>
        {(fileKey, index) => (
          <Card key={index} padding="unset">
            <AudioCard fileKey={fileKey} removeFromList={removeFromList} />
          </Card>
        )}
      </Collection>
    </View>
  );
};

AudioFiles.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AudioFiles;
