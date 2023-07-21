import { DeleteNoteMutation } from '@/API';
import { Note } from '@/models';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { Button, Text, useTheme } from '@aws-amplify/ui-react';
import React from 'react';
import * as mutations from '../graphql/mutations';

function DeleteNoteModal({ note }: { note: Note }) {
  const { tokens } = useTheme();

  const deleteHandler = async (id: string) => {
    try {
      const res = await API.graphql<GraphQLQuery<DeleteNoteMutation>>({
        query: mutations.deleteNote,
        variables: { input: { id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Text color={tokens.colors.black.original}>
      <Button
        borderRadius="8px"
        border="none"
        backgroundColor={tokens.colors.red[10]}
        onClick={() => {
          deleteHandler(note.id);
        }}
      >
        Delete
      </Button>
    </Text>
  );
}

export default DeleteNoteModal;
