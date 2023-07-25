import {
  Button,
  Card,
  Flex,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { Storage } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-audio-player';
import { toast } from 'react-hot-toast';
import { IoTrashBinSharp } from 'react-icons/io5';
import Modal from 'react-modal'; // Import Modal from 'react-modal'
function AudioForNoteCard({
  fileKey,
}: {
  fileKey: string;
  removeFromList: any;
}) {
  const { tokens } = useTheme();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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

  if (!audioUrl) {
    return <View>Loading...</View>;
  }

  return (
    <View flex="1">
      <AudioPlayer src={audioUrl} controls />
    </View>
  );
}

export default AudioForNoteCard;
