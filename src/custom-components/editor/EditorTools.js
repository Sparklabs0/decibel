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

export const EDITOR_TOOLS = {
  code: Code,
  header: Header,
  Paragraph: Paragraph,
  quote: quote,
  list: list,
  checklist: checklist,
  warning: warning,
//   link: link,
  inlineCode: inlineCode,
};
