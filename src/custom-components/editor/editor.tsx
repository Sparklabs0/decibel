import styles from '@/styles/Editor.module.css';
import { Text, View } from '@aws-amplify/ui-react';
import EditorJs from '@editorjs/editorjs';
import React, { useEffect, useRef, useState } from 'react';
import demoData from './defaultcontent';

function Editor({ id }: { id: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJs>();
  const [saveStatus, setSaveStatus] = useState('Saved');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  const initializeEditor = async () => {
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
        },
        onReady: () => {
          // alert("Editor is ready to work!");
        },

        data: demoData,
      });
      ref.current = editor;
    }
  };

  const save = async () => {
    if (ref.current) {
      let output = await ref.current.save().then((output) => {
        setSaveStatus('Saving...');
        setTimeout(() => {
          setSaveStatus('Saved');
        }, 500);
        return output;
      });
      console.log(output);
    }
  };

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };
    if (isMounted) {
      init();
      return () => {
        if (ref.current && ref.current.destroy) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted]);

  return (
    <View className={styles.container}>
      <Text
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
      </Text>
      <View className={styles.statusBox}>{saveStatus}</View>
      <div id="editorjs"></div>
    </View>
  );
}

export default Editor;
