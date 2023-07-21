'use client'

import Note from "@/custom-components/editor/EditorNote";
import Editor from "@/custom-components/editor/editor";
import { View, useTheme } from "@aws-amplify/ui-react";

export default function Page() {

  const {tokens} = useTheme();
  
  return (
    <View padding={tokens.space.xxxl}>
        <Note />
    </View>
  );
}
