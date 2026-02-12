
import React from 'react';
import { Folder, FileItem, User } from '../types';
import { COLORS } from '../constants';

interface SidebarProps {
  folders: Folder[];
  files: FileItem[];
  currentFolderId: string | null;
  currentUser: User;
  onNavigate: (id: string | null) => void;
  onTriggerUpload: () => void;
  onCreateFolder: (folder: Folder) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  folders,
  files,
  currentFolderId,
  currentUser,
  onNavigate,
  onTriggerUpload,
  onCreateFolder
}) => {
  const handleCreateFolder = () => {
    const name = prompt("Nom du nouveau dossier :");
    if (name && name.trim()) {
      const newFolder: Folder = {
        id: 'folder_' + Date.now(),
        name: name.trim(),
        createdBy: currentUser || 'Inconnu',
        createdAt: new Date().toISOString(),
        parentFolderId: currentFolderId
      };
      onCreateFolder(newFolder);
    }
  };

  const rootFolders = folders.filter(f => f.parentFolderId === null);

  return (
    <aside className="w-full md:w-72 flex flex-col gap-6">
      {/* 1. Action Button */}
      <button
        onClick={onTriggerUpload}
        className="w-full py-4 px-6 rounded-2xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
        style={{ backgroundColor: COLORS.gold, color: COLORS.header }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
        </svg>
        Ajouter un fichier
      </button>

      {/* 2. Folders Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h4 className="font-bold text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">
            Dossiers
          </h4>
          <button 
            onClick={handleCreateFolder}
            className="p-1.5 rounded-lg transition-colors hover:bg-opacity-10"
            style={{ color: COLORS.accent }}
            title="Nouveau dossier"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
          </button>
        </div>

        <div className="p-2 flex flex-col gap-1 max-h-[400px] overflow-y-auto">
          {/* Default Option */}
          <button
            onClick={() => onNavigate(null)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${currentFolderId === null ? 'shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
            style={currentFolderId === null ? { backgroundColor: COLORS.bgLight, color: COLORS.header } : {}}
          >
            <span className="text-xl">📂</span>
            Tous les fichiers
          </button>

          {/* User Folders */}
          {rootFolders.map(folder => (
            <button
              key={folder.id}
              onClick={() => onNavigate(folder.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${currentFolderId === folder.id ? 'shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              style={currentFolderId === folder.id ? { backgroundColor: COLORS.bgLight, color: COLORS.header } : {}}
            >
              <span className="text-xl">📁</span>
              {folder.name}
            </button>
          ))}
          
          {rootFolders.length === 0 && (
            <div className="px-4 py-8 text-center text-xs text-gray-400 italic">
              Aucun dossier créé
            </div>
          )}
        </div>

        <button 
          onClick={handleCreateFolder}
          className="m-3 py-2 px-4 rounded-xl text-xs font-bold border-2 transition-all hover:brightness-95 active:scale-95 text-center"
          style={{ borderColor: COLORS.accent, color: COLORS.accent }}
        >
          + Nouveau dossier
        </button>
      </div>

      {/* 3. Statistics Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h4 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-4">Statistiques</h4>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Total Fichiers</span>
            <span className="font-bold text-gray-800 text-lg">{files.length}</span>
          </div>
          <div className="h-px bg-gray-100 w-full"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Dossiers</span>
            <span className="font-bold text-gray-800 text-lg">{folders.length}</span>
          </div>
          <div className="h-px bg-gray-100 w-full"></div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Espace utilisé</span>
            <span className="font-bold text-gray-800 text-sm">
              {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(1)} MB / 5 MB
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
