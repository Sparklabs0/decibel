import React from "react";
import Editor from "./editor";
import demoData from "./defaultcontent";



function EditorNote() {
  return (
    <div className="w-full flex justify-center p-16">
      <Editor data= {demoData} />
    </div>
  );
}

export default EditorNote;
