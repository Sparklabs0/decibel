// @ts-nocheck
// import { GetNoteQuery, GetNoteQueryVariables } from '@/API';
// import { getNote } from '@/graphql/queries';
import styles from '@/styles/Editor.module.css';
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { Text, TextAreaField, TextField, View } from '@aws-amplify/ui-react';
import EditorJs from '@editorjs/editorjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'usehooks-ts';
import * as mutations from '../../graphql/mutations';
// import demoData from './defaultcontent';
import { useTheme } from '@aws-amplify/ui-react';
enum SaveStatus {
  Saved = 'Saved',
  Saving = 'Saving...',
  Failed = 'Failed',
  Unsaved = 'Unsaved',
}

function Editor({
  data,
  id,
  title,
}: {
  data: EditorData;
  id: string;
  title: string;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJs>();
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SaveStatus.Saved);
  const { tokens } = useTheme();
  const [noteEditorData, setNoteEditorData] = useState<string>(data);
  const [noteTitle, setNoteTitle] = useState<string>(title);
  const debouncedTitle = useDebounce<string>(noteTitle, 500);
  const debouncedEditorData = useDebounce<string>(noteEditorData, 500);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const updateTitle = async () => {
      try {
        setSaveStatus(SaveStatus.Saving);
        if (!debouncedTitle) {
          toast.error('Title cannot be empty');
          throw new Error('Title cannot be empty');
        }
        await API.graphql<GraphQLQuery<UpdateNoteMutation>>({
          query: mutations.updateNote,
          variables: {
            input: {
              id: id,
              title: debouncedTitle,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
        setSaveStatus(SaveStatus.Saved);
      } catch (error) {
        setSaveStatus('Failed');
      }
    };
    updateTitle();
  }, [debouncedTitle, id]);

  const updateNotes = useCallback(async () => {
    if (!id) {
      console.error('Note id is missing.');
      return;
    }
    try {
      setSaveStatus(SaveStatus.Saving);
      await API.graphql<GraphQLQuery<UpdateNoteMutation>>({
        query: mutations.updateNote,
        variables: {
          input: {
            id: id as string,
            summary: debouncedEditorData,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      setSaveStatus(SaveStatus.Saved);
    } catch (error) {
      setSaveStatus(SaveStatus.Failed);
      console.log('Error', error);
      toast.error('Error during updating notes.');
    }
  }, [id, debouncedEditorData]);

  const initializeEditor = useCallback(async () => {
    const EditorJs = (await import('@editorjs/editorjs')).default;
    const EditorTools = (await import('./EditorTools')).EDITOR_TOOLS;
    if (!ref.current) {
      const editor = new EditorJs({
        holder: 'editorjs',
        minHeight: 0,
        // autofocus: true,
        tools: EditorTools,
        placeholder: 'Press Tab to select a block',
        onChange: async () => {
          setSaveStatus(SaveStatus.Unsaved);
          if (ref.current) {
            const output = await ref.current.save().then((output) => {
              return output;
            });
            setNoteEditorData(JSON.stringify(output));
          }
        },
        onReady: () => {},
        data: JSON.parse(data),
      });
      ref.current = editor;
    }
  }, [data]);

  useEffect(() => {
    updateNotes();
  }, [debouncedEditorData, updateNotes]);

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

  useEffect(() => {
    if (saveStatus === SaveStatus.Saved) {
      setBackgroundColor(tokens.colors.green[40]);
    } else if (saveStatus === SaveStatus.Saving) {
      setBackgroundColor(tokens.colors.blue[40]);
    } else if (saveStatus === SaveStatus.Failed) {
      setBackgroundColor(tokens.colors.red[40]);
    } else if (saveStatus === SaveStatus.Unsaved) {
      setBackgroundColor(tokens.colors.neutral[40]);
    } else {
      setBackgroundColor(tokens.colors.neutral[40]);
    }
  }, [saveStatus, tokens]);

  return (
    <View className={styles.container}>
      <TextField
        margin="auto"
        width="60%"
        maxWidth="720px"
        variation="quiet"
        overflow="visible"
        resize="vertical"
        marginBottom={24}
        style={{ fontSize: '48px' }}
        value={noteTitle}
        onChange={(e) => {
          setNoteTitle(e.target.value);
        }}
        placeholder="Title"
      ></TextField>
      <View
        backgroundColor={backgroundColor}
        color="white"
        className={styles.statusBox}
      >
        {saveStatus}
      </View>
      <div
        id="editorjs"
        style={{ width: '60%', maxWidth: '720px', margin: 'auto' }}
      ></div>
    </View>
  );
}

export default Editor;
