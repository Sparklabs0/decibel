// @ts-nocheck

import { GetNoteQuery, GetNoteQueryVariables } from '@/API';
import { getNote } from '@/graphql/queries';
import styles from '@/styles/Editor.module.css';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { Text, View } from '@aws-amplify/ui-react';
import EditorJs from '@editorjs/editorjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import demoData from './defaultcontent';

function Editor({ data }: { data: EditorData }) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJs>();
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
      const editor = new EditorJs({
        holder: 'editorjs',
        minHeight: 0,
        // autofocus: true,
        tools: EditorTools,
        placeholder: 'Pres Tab to select a block',

        onChange: () => {
          setSaveStatus('Unsaved');
          save();
          console.log();
        },
        onReady: () => {
          // alert("Editor is ready to work!");
        },
        data: JSON.parse(data),
      });
      ref.current = editor;
    }
  }, [data]);

  const save = async () => {
    if (ref.current) {
      let output = await ref.current.save().then((output) => {
        setSaveStatus('Saving...');
        setTimeout(() => {
          setSaveStatus('Saved');
        }, 500);
        return output;
      });
      console.log(output, 'output');
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
      <View className={styles.statusBox}>{saveStatus}</View>
      <div id="editorjs"></div>
    </View>
  );
}

export default Editor;
