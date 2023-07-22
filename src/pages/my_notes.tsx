import {
  GetNoteQueryVariables,
  ListNotesQuery,
  ListNotesQueryVariables,
  // ModelSortDirection,
  // NotesByDateQuery,
  // NotesByDateQueryVariables,
  OnCreateNoteSubscription,
  OnDeleteNoteSubscription,
} from '@/API';
import Layout from '@/custom-components/Layout';
import NoteCardActions from '@/custom-components/NoteCardActions';
import { getNote } from '@/graphql/queries';
import { Note } from '@/models';
import { NoteCard } from '@/ui-components';
import {
  API,
  graphqlOperation,
  GraphQLQuery,
  GraphQLSubscription,
  GRAPHQL_AUTH_MODE,
} from '@aws-amplify/api';
import {
  Button,
  Collection,
  Flex,
  SearchField,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
function Notes() {
  const [notes, setNotes] = useState<ListNotesQuery>();
  const nextTokenRef = useRef<string | undefined>(undefined);
  const { tokens } = useTheme();
  const getNotes = async () => {
    const variables: ListNotesQueryVariables = {
      limit: 8,
    };
    if (nextTokenRef.current) {
      variables.nextToken = nextTokenRef.current;
    }
    const allNotes = await API.graphql<GraphQLQuery<ListNotesQuery>>({
      query: queries.listNotes,
      variables: variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    // if (allNotes?.data?.listNotes?.nextToken !== nextTokenRef.current) {
    setNotes(allNotes.data);
    nextTokenRef.current = allNotes?.data?.listNotes?.nextToken as string;
    // }
  };

  useEffect(() => {
    getNotes();
    const sub = API.graphql<GraphQLSubscription<OnDeleteNoteSubscription>>({
      query: subscriptions.onDeleteNote,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }).subscribe({
      next: ({ provider, value }) => {
        if (value?.data?.onDeleteNote?.id) {
          const deletedNoteId = value.data.onDeleteNote.id;
          setNotes((prevNotes: any) => {
            if (!prevNotes?.listNotes?.items) return prevNotes;
            const updatedNotes = {
              ...prevNotes,
              listNotes: {
                ...prevNotes.listNotes,
                items: prevNotes.listNotes.items.filter(
                  (note: Note) => note.id !== deletedNoteId
                ),
              },
            };
            return updatedNotes;
          });
        }
      },
      error: (error) => console.warn(error),
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const router = useRouter();

  return (
    <View>
      {/* <NoteCardCollection /> */}
      <SearchField
        marginBottom={24}
        label="Search"
        placeholder="Search notes... ( non functional )"
      />
      <Collection
        type="grid"
        templateColumns="1fr 1fr"
        gap={20}
        items={notes?.listNotes?.items as any}
      >
        {(item, index) => (
          <NoteCard
            boxShadow="none"
            key={index}
            padding="1rem"
            note={item as any}
            overrides={{
              note_title: { flex: '0 0 auto' },
              note_audio: { flex: '0 0 auto' },
              note_text: { flex: '1 1 auto' },
              'Frame 438': { height: 'fit-content', flex: '0 0 auto' },

              NoteCard: {
                border: '1px solid black',
                borderRadius: '8px',
                width: '100%',
              },
            }}
          >
            <NoteCardActions note={item as any} />
          </NoteCard>
        )}
      </Collection>
      <Flex marginTop={24}>
        <Button borderRadius="8px" variation="primary" onClick={getNotes}>
          Next Page
        </Button>
      </Flex>
    </View>
  );
}

Notes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notes;
