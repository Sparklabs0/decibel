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
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { ClipLoader } from 'react-spinners';
const PAGE_SIZE = 8;

export const AudioFiles = () => {
  const [fileKeys, setFileKeys] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const nextTokenRef = useRef<string | null>(null);

  const fetchFiles = useCallback(async () => {
    try {
      setLoading(true);
      const { results, nextToken: newNextToken } = await Storage.list('', {
        level: 'private',
        pageSize: PAGE_SIZE,
        nextToken: nextTokenRef.current as string,
      });
      setFileKeys((prevFileKeys) => {
        const newFileKeys = { ...prevFileKeys };
        results.forEach((item: any) => {
          newFileKeys[item.key] = true;
        });
        return newFileKeys;
      });
      nextTokenRef.current = newNextToken || null;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleLoadMore = () => {
    fetchFiles();
  };

  const removeFromList = async (key_: string) => {
    setFileKeys((prevFileKeys) => {
      const newFileKeys = { ...prevFileKeys };
      delete newFileKeys[key_];
      return newFileKeys;
    });
  };

  return (
    <View>
      <Heading marginTop={24} marginBottom={24} level={4}>{`Audio Uploads (${
        Object.keys(fileKeys).length
      })`}</Heading>
      <Collection type="list" items={Object.keys(fileKeys)}>
        {(fileKey, index) => (
          <Card key={index} padding="unset">
            <AudioCard fileKey={fileKey} removeFromList={removeFromList} />
          </Card>
        )}
      </Collection>
      {loading && <ClipLoader size={20} color="#007bff" />}{' '}
      {nextTokenRef.current && !loading && (
        <Button onClick={handleLoadMore} marginTop={16}>
          Load More
        </Button>
      )}
    </View>
  );
};

AudioFiles.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AudioFiles;
