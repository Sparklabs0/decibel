import { GetNoteQuery, GetNoteQueryVariables } from '@/API';
import { EditorData } from '@/custom-components/edit/types';
import Editor from '@/custom-components/Editor';
import Layout from '@/custom-components/Layout';
import { getNote } from '@/graphql/queries';
// import { parseMarkdown } from '@/helpers/markdownToJson';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { Flex, Text, View } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

function NotePage() {
  const router = useRouter();
  const { id } = router.query;
  const [noteData, setNoteData] = useState<GraphQLQuery<GetNoteQuery>>();
  const [loading, setLoading] = useState(false);
  // const [initialData, setInitialData] = useState<EditorData | null>(null);

  const getNotes = useCallback(async () => {
    // console.log(id);
    const variables: GetNoteQueryVariables = { id: id as string };
    // console.log(variables, 'variables');
    try {
      setLoading(true);
      const note = await API.graphql<GraphQLQuery<GetNoteQuery>>({
        query: getNote,
        variables: variables,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      setNoteData(note.data);
      console.log(note);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
      // toast.error('Error during fetching');
    }
  }, [id]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <View>
      {loading && <ClipLoader size={30} />}
      {noteData?.getNote?.summary && (
        <Editor
          data={noteData?.getNote?.summary}
          title={noteData?.getNote?.title as string}
          id={id as string}
        />
      )}
    </View>
  );
}

NotePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotePage;
