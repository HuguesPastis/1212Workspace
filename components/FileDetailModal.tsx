
import React from 'react';
import { FileItem } from '../types';
import { COLORS } from '../constants';

interface FileDetailModalProps {
  file: FileItem;
  onClose: () => void;
  onDelete: () => void;
}

const FileDetailModal: React.FC<FileDetailModalProps> = ({ file, onClose, onDelete }) => {
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('spreadsheet') || type.includes('excel') || type.includes('csv')) return '📊';
    if (type.includes('word') || type.includes('officedocument.word')) return '📝';
    if (type.includes('image')) return '🖼️';
    return '📎';
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-md">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[80vh]">
        {/* Preview Area */}
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 relative">
          {file.type.includes('image') ? (
            <img src={file.data} alt={file.name} className="max-w-full max-h-full object-contain p-4" />
          ) : (
            <div className="text-8xl">{getFileIcon(file.type)}</div>
          )}
          <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500">
            {file.type.split('/')[1] || 'Fichier'}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800 truncate pr-4">{file.name}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="p-6 flex-1 overflow-y-auto space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Taille</span>
                <span className="text-sm font-medium text-gray-700">{formatSize(file.size)}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Auteur</span>
                <span className="text-sm font-medium text-gray-700">{file.uploadedBy}</span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Chargé le</span>
                <span className="text-sm font-medium text-gray-700">{new Date(file.uploadedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase font-bold text-gray-400 mb-3">Commentaires (0)</span>
              <div className="bg-gray-50 rounded-xl p-4 text-center text-xs text-gray-400 italic">
                Aucun commentaire sur ce document.
              </div>
            </div>
          </div>

          <div className="p-6 bg-gray-50 flex items-center justify-between">
            <button 
              onClick={onDelete}
              className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Supprimer
            </button>
            <div className="flex gap-2">
              <a 
                href={file.data} 
                download={file.name}
                className="px-6 py-2 rounded-xl font-bold shadow-md transition-all hover:scale-105"
                style={{ backgroundColor: COLORS.gold, color: COLORS.header }}
              >
                Télécharger
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDetailModal;
