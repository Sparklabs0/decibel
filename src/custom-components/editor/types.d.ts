interface BlockData {
  id?: string;
  type: string;
  data: Record<string, any>; // or a more specific type
}

interface EditorData {
  time?: number;
  blocks: BlockData[];
  version?: string;
}
