import {
  GetNoteQueryVariables,
  ListNotesQuery,
  ListNotesQueryVariables,
} from '@/API';
import DeleteNoteModal from '@/custom-components/DeleteNoteModal';
import Layout from '@/custom-components/Layout';
import { getNote } from '@/graphql/queries';
import { Note } from '@/models';
import { NoteCard, NoteCardCollection } from '@/ui-components';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { Button, Collection, Flex, View } from '@aws-amplify/ui-react';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import * as queries from '../graphql/queries';

function Notes() {
  const [notes, setNotes] = useState<ListNotesQuery>();
  const prevTokenRef = useRef<string | undefined>(undefined);

  const getNotes = async () => {
    const variables: ListNotesQueryVariables = {
      limit: 1,
    };
    // if (prevTokenRef.current) {
    //   variables.nextToken = prevTokenRef.current;
    // }
    const allNotes = await API.graphql<GraphQLQuery<ListNotesQuery>>({
      query: queries.listNotes,
      // variables: variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    });

    // if (allNotes?.data?.listNotes?.nextToken !== prevTokenRef.current) {
    setNotes(allNotes.data);
    // prevTokenRef.current = allNotes?.data?.listNotes?.nextToken as string;
    // }
  };

  useEffect(() => {
    getNotes();
    return () => {};
  }, []);

  return (
    <View>
      {/* <NoteCardCollection /> */}
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
        {/* <Button>Prev</Button>
        <Button onClick={getNotes}>Next</Button> */}
      </Flex>
    </View>
  );
}

Notes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notes;
