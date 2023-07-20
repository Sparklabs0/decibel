import { ListNotesQuery } from '@/API';
import Layout from '@/custom-components/Layout';
import { getNote } from '@/graphql/queries';
import { NoteCardCollection } from '@/ui-components';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { View } from '@aws-amplify/ui-react';
import React, { ReactElement, useEffect } from 'react';
import * as queries from '../graphql/queries';

function Notes() {
  useEffect(() => {
    const getNotes = async () => {
      const allNotes = await API.graphql<GraphQLQuery<ListNotesQuery>>({
        query: queries.listNotes,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      console.log(allNotes); // result: { "data": { "listTodos": { "items": [/* ..... */] } } }
    };
    getNotes();
    return () => {};
  }, []);

  return (
    <View>
      <NoteCardCollection />
    </View>
  );
}

Notes.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Notes;
