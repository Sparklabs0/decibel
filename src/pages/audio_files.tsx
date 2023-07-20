import Layout from '@/custom-components/Layout';
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
import Link from 'next/link';
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

  return (
    <View>
      {/* <Link href="/upload_audio">
        <Button
          backgroundColor={tokens.colors.brand.primary[80]}
          borderRadius={8}
          marginTop={8}
          marginBottom={8}
          color={tokens.colors.white.original}
        >
          Upload Audio
        </Button>
      </Link> */}
      <Heading
        marginTop={24}
        marginBottom={24}
        level={4}
      >{`Audio Uploads (${fileKeys.length})`}</Heading>
      <Collection
        type="list"
        items={fileKeys} // Use the fileKeys state here
        direction="row"
        justifyContent="space-between"
        wrap="wrap"
      >
        {(fileKey, index) => (
          <Card key={index} padding="unset">
            <Text>{fileKey}</Text>
            {/* You can add additional information or links related to the fileKey here */}
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
