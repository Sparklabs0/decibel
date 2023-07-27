//./components/EditorTools.js
import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import quote from "@editorjs/quote";
import list from "@editorjs/list";
import checklist from "@editorjs/checklist";
import warning from "@editorjs/warning";
// import link from "@editorjs/link";
import inlineCode from "@editorjs/inline-code";
import nextedList from "@editorjs/nested-list";
import marker from "@editorjs/marker";
import autoCompleLink from "@editorjs/link-autocomplete";
import spoiler from "editorjs-inline-spoiler-tool";
import ToggleBlock from 'editorjs-toggle-block';

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

