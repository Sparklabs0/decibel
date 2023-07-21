import {
  GetNoteQueryVariables,
  ListNotesQuery,
  ListNotesQueryVariables,
  ModelSortDirection,
  NotesByDateQuery,
  NotesByDateQueryVariables,
  OnCreateNoteSubscription,
  OnDeleteNoteSubscription,
} from '@/API';
import DeleteNoteModal from '@/custom-components/DeleteNoteModal';
import Layout from '@/custom-components/Layout';
import { getNote } from '@/graphql/queries';
import { Note } from '@/models';
import { NoteCard, NoteCardCollection } from '@/ui-components';
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
  View,
} from '@aws-amplify/ui-react';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions';
import { useRouter } from 'next/router';
function Notes() {
  const [notes, setNotes] = useState<NotesByDateQuery>();
  const nextTokenRef = useRef<string | undefined>(undefined);

  const getNotes = async () => {
    const variables: NotesByDateQueryVariables = {
      limit: 8,
      type: 'Note',
      sortDirection: ModelSortDirection.DESC,
    };
    if (nextTokenRef.current) {
      variables.nextToken = nextTokenRef.current;
    }
    const allNotes = await API.graphql<GraphQLQuery<NotesByDateQuery>>({
      query: queries.notesByDate,
      variables: variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });
    // if (allNotes?.data?.notesByDate?.nextToken !== nextTokenRef.current) {
    setNotes(allNotes.data);
    nextTokenRef.current = allNotes?.data?.notesByDate?.nextToken as string;
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
            if (!prevNotes?.notesByDate?.items) return prevNotes;
            const updatedNotes = {
              ...prevNotes,
              notesByDate: {
                ...prevNotes.notesByDate,
                items: prevNotes.notesByDate.items.filter(
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
    // Stop receiving data updates from the subscription
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
        items={notes?.notesByDate?.items as any}
      >
        {(item, index) => (
          <NoteCard
            boxShadow="none"
            key={index}
            padding="1rem"
            note={item as any}
            onClick={() => {
              // router.push(`/notes/${item?.id}`);
            }}
            overrides={{
              NOTE: { flex: '0 0 auto' },
              NoteCard: {
                border: '1px solid black',
                borderRadius: '8px',
                width: '100%',
              },
              'Frame 438': { height: 'fit-content', flex: '0 0 auto' },
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.':
                { flex: '1 1 auto' },
            }}
          >
            <DeleteNoteModal note={item as any} />
          </NoteCard>
        )}
      </Collection>
      <Flex marginTop={12}>
        <Button borderRadius="8px" variation="primary" onClick={getNotes}>
          Load More
        </Button>
      </Flex>
    </View>
  );
}

Notes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notes;
