import Layout from "@/custom-components/Layout";
import Editor from "@/custom-components/editor/editor";
import { Flex, View, Text } from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

function NotePage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <View>
      <Editor id= {id as string} />
    </View>
  );
}

NotePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotePage;
