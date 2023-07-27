import Layout from "@/custom-components/Layout";
import Editor from "@/custom-components/editor/editor";
import { Flex, View, Text } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { GetNoteQuery, GetNoteQueryVariables } from "@/API";
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { getNote } from "@/graphql/queries";
import { toast } from "react-hot-toast";
import { parseMarkdown } from "@/helpers/markdownToJson";

function NotePage() {
  const router = useRouter();
  const { id } = router.query;
  const [notes, setNotes] = useState<GraphQLQuery<GetNoteQuery>>();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<EditorData | null>(null);

  const getNotes = useCallback(async () => {
    console.log(id);
    const variables: GetNoteQueryVariables = { id: id as string };
    console.log(variables, "variables");
    try {
      setLoading(true);
      const note = await API.graphql<GraphQLQuery<GetNoteQuery>>({
        query: getNote,
        variables: variables,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      setNotes(note.data);
      setLoading(false);
      const summary = note?.data?.getNote?.summary as string;
      const parsedData = parseMarkdown(summary);
      setInitialData(parsedData);
      console.log(summary,"summary")
      console.log(parsedData, "test");
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
      toast.error("Error during fetching");
    }
  }, [id]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  if (!initialData || loading) {
    return <CircleLoader size={30} />;
  }

  return (
    <View>
      <Editor data={initialData} />
    </View>
  );
}


NotePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotePage;
