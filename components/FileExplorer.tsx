
import React from 'react';
import { FileItem, Folder, User } from '../types';
import { COLORS } from '../constants';

interface FileExplorerProps {
  files: FileItem[];
  folders: Folder[];
  allFolders: Folder[];
  currentUser: User;
  currentFolderId: string | null;
  onNavigate: (id: string | null) => void;
  onTriggerUpload: () => void;
  onDeleteFile: (id: string) => void;
  onFileClick: (file: FileItem) => void;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ 
  files, 
  folders, 
  allFolders,
  currentUser, 
  currentFolderId,
  onNavigate,
  onTriggerUpload,
  onFileClick
}) => {

  const getBreadcrumbs = () => {
    const crumbs = [];
    let currentId = currentFolderId;
    while (currentId) {
      const folder = allFolders.find(f => f.id === currentId);
      if (folder) {
        crumbs.unshift(folder);
        currentId = folder.parentFolderId;
      } else {
        break;
      }
    }
    return crumbs;
  };

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
    const sizes = ['KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const val = bytes / Math.pow(k, i);
    return (i === 0 ? val.toFixed(0) : val.toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Breadcrumbs Top Nav */}
      <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-6 uppercase tracking-[0.2em] font-black">
        <button onClick={() => onNavigate(null)} className="hover:text-amber-600 transition-colors">Distillerie</button>
        {getBreadcrumbs().map(crumb => (
          <React.Fragment key={crumb.id}>
            <span className="text-gray-300">/</span>
            <button onClick={() => onNavigate(crumb.id)} className="hover:text-amber-600 transition-colors">
              {crumb.name}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Folders Grid */}
      {folders.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {folders.map(folder => (
            <div 
              key={folder.id} 
              onClick={() => onNavigate(folder.id)}
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] flex items-center gap-3 group"
            >
              <div className="text-2xl group-hover:rotate-12 transition-transform">📁</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-800 text-sm truncate">{folder.name}</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold">Dossier</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Files Grid (The main request) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {files.map((file) => (
          <div 
            key={file.id} 
            onClick={() => onFileClick(file)}
            className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 cursor-pointer transition-all hover:bg-[#e8ded1] hover:shadow-lg group relative"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-3xl bg-gray-50 p-3 rounded-2xl group-hover:bg-white transition-colors">
                {getFileIcon(file.type)}
              </div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-full group-hover:bg-white group-hover:text-gray-600 transition-all">
                {formatSize(file.size)}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-bold text-gray-800 truncate group-hover:text-amber-900" title={file.name}>
                {file.name}
              </h4>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                Par {file.uploadedBy} • {new Date(file.uploadedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50 group-hover:border-amber-200 transition-colors">
              <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                💬 {file.comments?.length || 0}
              </span>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-amber-600 shadow-sm border border-gray-100">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {files.length === 0 && folders.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center text-gray-400 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
             <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          </div>
          <p className="text-xl font-serif text-gray-600 mb-2">Aucun fichier dans ce dossier</p>
          <p className="text-sm max-w-xs mx-auto mb-6">Ajoutez vos recettes ou documents de production pour commencer l'archivage.</p>
          <button 
            onClick={onTriggerUpload}
            className="px-8 py-3 rounded-2xl font-bold shadow-lg transition-all hover:scale-105"
            style={{ backgroundColor: COLORS.gold, color: COLORS.header }}
          >
            Charger le premier fichier
          </button>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
