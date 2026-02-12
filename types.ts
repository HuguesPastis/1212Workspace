
export type User = 'Hugues' | 'Jan' | 'Alain' | null;

export interface Comment {
  id: string;
  user: string;
  text: string;
  date: string;
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string; // Base64 content
  folderId: string | null;
  uploadedBy: string;
  uploadedAt: string;
  comments: Comment[];
}

export interface Folder {
  id: string;
  name: string;
  createdBy: string;
  createdAt: string;
  parentFolderId: string | null;
}

export interface StorageData {
  files: FileItem[];
  folders: Folder[];
}
