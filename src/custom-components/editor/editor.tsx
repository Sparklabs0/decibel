import styles from "@/styles/Editor.module.css";
import { Text, View } from "@aws-amplify/ui-react";
import EditorJs from "@editorjs/editorjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import demoData from "./defaultcontent";
import { GetNoteQuery, GetNoteQueryVariables } from "@/API";
import { API, GraphQLQuery, GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { getNote } from "@/graphql/queries";
import { toast } from "react-hot-toast";

function Editor({ id }: { id: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJs>();
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [notes, setNotes] = useState<GraphQLQuery<GetNoteQuery>>();
  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    console.log(id);
    const variables: GetNoteQueryVariables = {id};
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
      return note;
    } catch (error) {
      setLoading(false);
      console.log("Error", error);
      toast.error("Error during fetching");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
    // getNotes();
    console.log(notes, "notes");
  });

  const initializeEditor = async () => {
    const EditorJs = (await import("@editorjs/editorjs")).default;
    const EditorTools = (await import("./EditorTools")).EDITOR_TOOLS;
    const notes = await getNotes();
    if (!ref.current) {
      const editor = new EditorJs({
        holder: "editorjs",
        minHeight: 0,
        // autofocus: true,
        tools: EditorTools,
        placeholder: "Pres Tab to select a block",

        onChange: () => {
          setSaveStatus("Unsaved");
          save();
        },
        onReady: () => {
          // alert("Editor is ready to work!");
          getNotes();
        },
        data: {
          blocks: [
            {
              type: "header",
              data: {
                text: "transcript",
                level: 2,
              },
            },
            {
              type: "paragraph",
              data: {
                text: `${notes?.data?.getNote?.transcription}`,
              },
            },
          ],
        },
      });
      ref.current = editor;
    }
  };

  const save = async () => {
    if (ref.current) {
      let output = await ref.current.save().then((output) => {
        setSaveStatus("Saving...");
        setTimeout(() => {
          setSaveStatus("Saved");
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
