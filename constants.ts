
import { FileItem } from './types';

export const COLORS = {
  header: '#3d4f58', // PANTONE 7546 C
  secondary: '#4a6b73', // PANTONE 2213 C
  accent: '#c9985c', // PANTONE 7569 C
  gold: '#ddb857', // PANTONE 2006 C
  bgLight: '#e8ded1', // PANTONE 9224 C
};

export const MOCK_FILES: FileItem[] = [
  {
    id: '1',
    name: 'Strategie_Marketing_ETE_2024.pdf',
    // Fix: size must be a number (in bytes) instead of a string to match FileItem interface
    size: 2516582,
    type: 'application/pdf',
    data: '',
    folderId: null,
    uploadedBy: 'Hugues',
    uploadedAt: '2023-10-15T10:00:00Z',
    comments: []
  },
  {
    id: '2',
    name: 'Logo_Pastis_12_12_HD.png',
    // Fix: size must be a number (in bytes) instead of a string to match FileItem interface
    size: 4299161,
    type: 'image/png',
    data: '',
    folderId: null,
    uploadedBy: 'Jan',
    uploadedAt: '2023-11-02T14:30:00Z',
    comments: []
  },
  {
    id: '3',
    name: 'Planning_Production_Saint_Tropez.doc',
    // Fix: size must be a number (in bytes) instead of a string to match FileItem interface
    size: 870400,
    type: 'application/msword',
    data: '',
    folderId: null,
    uploadedBy: 'Alain',
    uploadedAt: '2023-11-20T09:15:00Z',
    comments: []
  },
  {
    id: '4',
    name: 'Archives_Recettes_2023.zip',
    // Fix: size must be a number (in bytes) instead of a string to match FileItem interface
    size: 13421772,
    type: 'application/zip',
    data: '',
    folderId: null,
    uploadedBy: 'Hugues',
    uploadedAt: '2023-09-12T16:45:00Z',
    comments: []
  },
];
