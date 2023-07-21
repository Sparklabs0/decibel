"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import EditorJs from "@editorjs/editorjs";
import { EditorData } from "./types";

function Editor({ data }: { data: EditorData }) {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJs>();
  const [saveStatus, setSaveStatus] = useState("Saved");

  useEffect(() => {
    if (typeof window !== "undefined") {
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
        placeholder: "Let`s write an awesome story!",
        onChange: async () => {
          let content = await editor.saver.save();
          console.log(content);
        },
        onReady: () => {
          // alert("Editor is ready to work!");
        },
        data: data
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
        if (ref.current && ref.current.destroy) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted]);

  return (
    <div 
    className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white pt-8 sm:rounded-lg sm:border  sm:shadow-lg">
      <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div>
      <div id="editorjs"></div>
    </div>
  );
}

export default Editor;
