import Layout from "@/custom-components/Layout";
import Editor from "@/custom-components/editor/editor";
import { Flex, View, Text } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

function NotePage() {
  const router = useRouter();
  const { id } =  router.query;
  console.log(id, "id from note page")
  return (
    <View>
      <Text style={{
        marginBottom:'40px'
      }}>Editor</Text>
      <Editor id= {id as string} />
    </View>
  );
}

NotePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotePage;
