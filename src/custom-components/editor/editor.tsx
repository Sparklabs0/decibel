import styles from '@/styles/Editor.module.css';
import { Text, View } from '@aws-amplify/ui-react';
import EditorJs from '@editorjs/editorjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import demoData from './defaultcontent';

function Editor({ id }: { id: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJs | null>(null);
  const [saveStatus, setSaveStatus] = useState('Saved');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  const initializeEditor = useCallback(async () => {
    const EditorJs = (await import('@editorjs/editorjs')).default;
    const EditorTools = (await import('./EditorTools')).EDITOR_TOOLS;
    if (!ref.current) {
      try {
        const editor = new EditorJs({
          holder: 'editorjs',
          minHeight: 0,
          tools: EditorTools,
          placeholder: 'Press Tab to select a block',
          onChange: () => {
            setSaveStatus('Unsaved');
            save();
          },
          data: demoData,
        });
        ref.current = editor;
      } catch (error) {
        console.error('Failed to initialize editor:', error);
      }
    }
  }, []);

  const save = async () => {
    if (ref.current) {
      try {
        let output = await ref.current.save();
        setSaveStatus('Saving...');
        setTimeout(() => {
          setSaveStatus('Saved');
        }, 500);
        console.log(output);
      } catch (error) {
        console.error('Failed to save editor content:', error);
      }
    }
  };

  useEffect(() => {
    if (isMounted) {
      initializeEditor().catch(console.error);
      return () => {
        if (ref.current && ref.current.destroy) {
          try {
            ref.current.destroy();
          } catch (error) {
            console.error('Failed to destroy editor:', error);
          }
        }
      };
    }
  }, [isMounted, initializeEditor]);

  return (
    <View className={styles.container}>
      {/* <Text
        variation="primary"
        width="100%"
        textAlign="center"
        as="h2"
        fontSize={50}
      >
        Title goes here
      </Text>
      <Text
        variation="primary"
        width="100%"
        textAlign="center"
        as="h5"
        fontSize={30}
      >
        Subtitle
      </Text> */}
      <View className={styles.statusBox}>{saveStatus}</View>
      <div id="editorjs"></div>
    </View>
  );
}

export default Editor;
