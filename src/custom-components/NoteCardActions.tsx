import { DeleteNoteMutation } from '@/API';
import { Note } from '@/models';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import {
  Button,
  Flex,
  Heading,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { DataStore } from 'aws-amplify';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiEdit, BiLink } from 'react-icons/bi';
import Modal from 'react-modal';
import * as mutations from '../graphql/mutations';

const NoteCardActions: React.FC<{ note: Note }> = ({ note }) => {
  const { tokens } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteHandler = async (id: string) => {
    try {
      const res = await API.graphql<GraphQLQuery<DeleteNoteMutation>>({
        query: mutations.deleteNote,
        //@ts-ignore
        variables: { input: { id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const modalStyles = {
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
  };

  const modalButtonStyles = {
    marginRight: '0.5rem',
  };

  return (
    <>
      <Flex color={tokens.colors.black.original} gap={8}>
        <Button
          borderRadius="8px"
          border="none"
          variation="destructive"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Delete
        </Button>
        <Link href={`/note/${note.id}`}>
          <Button
            border="none"
            backgroundColor={tokens.colors.neutral[60]}
            borderRadius={8}
            alignItems="center"
            variation="menu"
          >
            <Text color={tokens.colors.white.original}>Editor</Text>
            <View marginLeft={8}>
              <BiEdit color="white" />
            </View>
          </Button>
        </Link>
      </Flex>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        // style={modalStyles}
        style={modalStyles}
      >
        <Heading fontSize={25} level={3}>
          Confirm Deletion
        </Heading>
        <Text marginBottom={24}>
          Are you sure you want to delete this note?
        </Text>
        <View>
          <Button
            style={modalButtonStyles}
            variation="destructive"
            onClick={() => deleteHandler(note.id)}
          >
            Delete
          </Button>

          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        </View>
      </Modal>
    </>
  );
};

export default NoteCardActions;
