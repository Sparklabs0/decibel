import { DeleteNoteMutation } from '@/API';
import { Note } from '@/models';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { Button, Heading, Text, useTheme, View } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import Modal from 'react-modal';
import * as mutations from '../graphql/mutations';

const DeleteNoteModal: React.FC<{ note: Note }> = ({ note }) => {
  const { tokens } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteHandler = async (id: string) => {
    try {
      const res = await API.graphql<GraphQLQuery<DeleteNoteMutation>>({
        query: mutations.deleteNote,
        variables: { input: { id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
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
      transform: 'translate(-50%, -50%)',
    },
  };

  const modalButtonStyles = {
    marginRight: '0.5rem',
  };

  return (
    <>
      <Text color={tokens.colors.black.original}>
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
      </Text>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        // style={modalStyles}
        style={modalStyles}
      >
        <Heading level={3}>Confirm Deletion</Heading>
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

export default DeleteNoteModal;
