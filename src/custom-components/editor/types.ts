export interface BlockData {
  id: string;
  type: string;
  data: Record<string, any>;
}

export interface EditorData {
  time: number;
  blocks: BlockData[];
  version: string;
}
