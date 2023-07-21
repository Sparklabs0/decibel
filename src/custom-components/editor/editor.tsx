'use client';
import React, { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic'; 
import EditorJs from "@editorjs/editorjs";



function Editor() {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJs>();


  useEffect(() => {
    if (typeof window !== "undefined"){
        setIsMounted(true);
    }
  }, []);

  const initializeEditor = async () => {
    const EditorJs = (await import("@editorjs/editorjs")).default;
    const EditorTools = (await import("./EditorTools")).EDITOR_TOOLS;
    if (!ref.current) {
      const editor = new EditorJs({
        holder: "editorjs",
        // autofocus: true,
        tools: EditorTools,
        placeholder: 'Let`s write an awesome story!',
        onChange: async () => {
            let content = await editor.saver.save();
            console.log(content);
          },
        onReady: () => {
            // alert("Editor is ready to work!");
        },
        // data: {
        //     blocks: [
        //         {
        //             type:"paragraph",
        //             data:{
        //                 text:"Hello World!"
        //             }
        //         },
        //     ]
        // },

        
      });
      ref.current = editor;
    }
  };



  // We need to use this function, if autosave in Amplify is costly
  const save = async () => {
    if (ref.current) {
      let output = await ref.current.save().then((output) => {
        // we can do anything with output data
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
        if (ref.current) {
          ref.current.destroy
          ;
        }
      };
    }
  }, [isMounted]);

  return (
      <div id="editorjs"></div>
  );
}

export default Editor;
