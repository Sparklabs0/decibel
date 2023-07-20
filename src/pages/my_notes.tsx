import {
  GetNoteQueryVariables,
  ListNotesQuery,
  ListNotesQueryVariables,
} from '@/API';
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
        row={2}
        items={notes?.listNotes?.items as any}
        gap="1.5rem"
      >
        {(item, index) => (
          <NoteCard key={index} padding="1rem" note={item as any}></NoteCard>
        )}
      </Collection>
      <Flex marginTop={12}>
        <Button>Prev</Button>
        <Button onClick={getNotes}>Next</Button>
      </Flex>
    </View>
  );
}

Notes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notes;
