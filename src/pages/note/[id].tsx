import Layout from "@/custom-components/Layout";
import Editor from "@/custom-components/editor/editor";
import { Flex, View, Text } from "@aws-amplify/ui-react";
import React, { ReactElement } from "react";

function NotePage() {
  return (
    <View>
      <Editor id="1" />
    </View>
  );
}

NotePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default NotePage;
