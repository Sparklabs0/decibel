import {
  Button,
  Card,
  Flex,
  Heading,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-audio-player';
import { toast } from 'react-hot-toast';
import { ImBin2 } from 'react-icons/im';
import Modal from 'react-modal'; // Import Modal from 'react-modal'
function AudioCard({
  fileKey,
  removeFromList,
}: {
  fileKey: string;
  removeFromList: any;
}) {
  const { tokens } = useTheme();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal

  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const url = await Storage.get(fileKey, { level: 'private' });
        setAudioUrl(url);
      } catch (error) {
        console.log('Error fetching audio URL:', error);
      }
    };
    fetchAudioUrl();
  }, [fileKey]);

  const handleDeleteAudio = async () => {
    try {
      const res = await Storage.remove(fileKey, { level: 'private' });
      setIsModalOpen(false); // Close the modal after deletion
      removeFromList(fileKey);
      toast.success('Note deleted successfully');
      // Implement a function to update the list of audio files after deletion if necessary
    } catch (error) {
      console.log('Error deleting audio:', error);
    }
  };

  if (!audioUrl) {
    return <View>Loading...</View>;
  }

  return (
    <Card
      // backgroundColor={tokens.colors.background.tertiary.value}
      borderRadius="8px"
      marginBottom={12}
      display="flex"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)"
    >
      <Flex width="100%" justifyContent="space-between" direction="row">
        <Flex direction="column">
          <View flex="1">
            <AudioPlayer
              src={audioUrl}
              controls
              style={{
                width: '100%',
              }}
            />
          </View>
          <View flex="2">
            <Text fontWeight="bold">File Key</Text>
            <Text>{fileKey}</Text>
          </View>
        </Flex>
        <Button
          onClick={() => setIsModalOpen(true)} // Open the modal when the button is clicked
          variation="destructive"
          style={{
            height: '50px',
            backgroundColor: `${tokens.colors.red[60]}`,
          }}
        >
          <ImBin2 size={17} />
        </Button>
      </Flex>
      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            padding: '60px',
            transform: 'translate(-50%, -50%)',
            borderRadius: '8px',
          },
        }}
        overlayClassName={'modal-overlay'}
      >
        <Heading fontSize={25} level={3}>
          Confirm Deletion
        </Heading>
        <Text marginBottom={24}>
          Are you sure you want to delete this audio file?
        </Text>
        <View>
          <Button
            onClick={handleDeleteAudio}
            variation="destructive"
            marginRight={8}
          >
            Delete
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </View>
      </Modal>
    </Card>
  );
}

export default AudioCard;
