const demoData = {
  time: 1667495123102,
  blocks: [
    {
      id: 'P6bbP3YI3E',
      type: 'header',
      data: {
        text: 'Another Example',
        level: 2,
      },
    },
    {
      id: 'XkWvC37UhV',
      type: 'paragraph',
      data: {
        text: 'This is another example of content created with Editor.js. You can freely edit this text, add new blocks, and see how the editor works!',
      },
    },
    {
      id: 'RjjDcqR-Lz',
      type: 'header',
      data: {
        text: 'Custom Blocks',
        level: 3,
      },
    },
    {
      id: 'I7YK4ddRJq',
      type: 'list',
      data: {
        style: 'ordered',
        items: [
          'Editor.js supports custom blocks',
          'Developers can create their own blocks to suit their specific needs',
          'These custom blocks can be seamlessly integrated into the editor',
        ],
      },
    },
    {
      id: 'QyRp9nJWXs',
      type: 'code',
      data: {
        code: 'const example = "This is a code block";\nconsole.log(example);',
        language: 'javascript',
      },
    },
  ],
  version: '2.14.2',
};

export default demoData;
