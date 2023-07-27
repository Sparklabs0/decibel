import { GetNoteQuery, GetNoteQueryVariables } from '@/API';
import Editor from '@/custom-components/editor/Editor';
import { EditorData } from '@/custom-components/editor/types';
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
      // const summary = note?.data?.getNote?.summary as string;
      // const transcription = note?.data?.getNote?.transcription as string;
      // const parsedData = parseMarkdown(summary);
      // setInitialData(parsedData);
      // console.log(summary, 'summary');
      // console.log(parsedData, 'test');
    } catch (error) {
      setLoading(false);
      console.log('Error', error);
      toast.error('Error during fetching');
    }
  }, [id]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  if (loading) {
    return <ClipLoader size={30} />;
  }

  return (
    <View>
      {noteData?.getNote?.summary && (
        <Editor data={noteData?.getNote?.summary} />
      )}
    </View>
  );
}

NotePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotePage;
