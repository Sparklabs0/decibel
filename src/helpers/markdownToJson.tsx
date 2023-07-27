// // import MarkdownIt from 'markdown-it';
// // import fmPlugin from 'markdown-it-front-matter';
// import { EditorData } from '@/custom-components/editor/types';
// export const parseMarkdown = (text: string): EditorData => {
//   let jsonData: EditorData = { blocks: [] };
//   // const md = new MarkdownIt();

//   // Split the text into lines
//   const lines = text.split('\n');

//   // Parse each line
//   lines.forEach((line: string) => {
//     // Skip empty lines
//     if (line.trim() === '') return;

//     if (line.startsWith('--Summary--')) {
//       jsonData.blocks.push({
//         type: 'header',
//         data: { text: 'Summary', level: 1 },
//       });
//     } else if (line.startsWith('--Additional Info--')) {
//       jsonData.blocks.push({
//         type: 'header',
//         data: { text: 'Additional Info', level: 2 },
//       });
//     } else if (line.startsWith('# ')) {
//       // Header 1
//       jsonData.blocks.push({
//         type: 'header',
//         data: { text: line.substring(2), level: 1 },
//       });
//     } else if (line.startsWith('## ')) {
//       // Header 2
//       jsonData.blocks.push({
//         type: 'header',
//         data: { text: line.substring(3), level: 2 },
//       });
//     } else if (line.startsWith('### ')) {
//       // Header 3
//       jsonData.blocks.push({
//         type: 'header',
//         data: { text: line.substring(4), level: 3 },
//       });
//     } else if (line.startsWith('- ')) {
//       // Unordered list
//       const items = line.split('\n').map((item: string) => item.substring(2));
//       jsonData.blocks.push({
//         type: 'list',
//         data: { style: 'unordered', items: items },
//       });
//     } else if (line.startsWith('1. ')) {
//       // Ordered list
//       const items = line.split('\n').map((item: string) => item.substring(3));
//       jsonData.blocks.push({
//         type: 'list',
//         data: { style: 'ordered', items: items },
//       });
//     } else {
//       // Paragraph
//       jsonData.blocks.push({
//         type: 'paragraph',
//         data: { text: line },
//       });
//     }
//   });

//   return jsonData;
// };

export const parseMarkdown = () => {};
