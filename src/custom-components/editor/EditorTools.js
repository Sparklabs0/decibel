//./components/EditorTools.js
import checklist from "@editorjs/checklist";
import Code from "@editorjs/code";
import Header from "@editorjs/header";
import list from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import quote from "@editorjs/quote";
import warning from "@editorjs/warning";
// import link from "@editorjs/link";
import inlineCode from "@editorjs/inline-code";
import autoCompleLink from "@editorjs/link-autocomplete";
import marker from "@editorjs/marker";
import nextedList from "@editorjs/nested-list";
import spoiler from "editorjs-inline-spoiler-tool";

export const EDITOR_TOOLS = {
  code: Code,
  header: Header,
  quote: quote,
  list: list,
  checklist: checklist,
  warning: warning,
  //   link: link,
  inlineCode: inlineCode,
  nextedList: nextedList,
  marker: marker,
  autoCompleLink: autoCompleLink,
  spoiler: spoiler,

};

