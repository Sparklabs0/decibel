'use client';

import Editor from '@/custom-components/editor/editor';
import Note from '@/custom-components/editor/EditorNote';
import { useTheme, View } from '@aws-amplify/ui-react';

export default function Page() {
  const { tokens } = useTheme();

  return (
    <View padding={tokens.space.xxxl}>
      <Note />
    </View>
  );
}
