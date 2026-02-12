
import React, { useState } from 'react';
import { User, FileItem, Folder } from '../types';
import Header from './Header';
import Sidebar from './Sidebar';
import FileExplorer from './FileExplorer';
import UploadModal from './UploadModal';
import FileDetailModal from './FileDetailModal';
import { COLORS } from '../constants';

interface DashboardProps {
  user: User;
  files: FileItem[];
  folders: Folder[];
  onLogout: () => void;
  onUpload: (file: FileItem) => void;
  onCreateFolder: (folder: Folder) => void;
  onDeleteFile: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  files, 
  folders, 
  onLogout, 
  onUpload, 
  onCreateFolder,
  onDeleteFile
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'mine'>('all');
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const handleUploadMultiple = (newFiles: FileItem[]) => {
    newFiles.forEach(onUpload);
    setIsUploadModalOpen(false);
  };

  const filteredFolders = folders.filter(f => f.parentFolderId === currentFolderId);
  const filteredFiles = files.filter(f => f.folderId === currentFolderId);

  const displayFiles = activeTab === 'all' 
    ? filteredFiles 
    : filteredFiles.filter(f => f.uploadedBy === user);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: COLORS.bgLight }}>
      <Header user={user} onLogout={onLogout} />
      
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar 
          folders={folders}
          files={files}
          currentFolderId={currentFolderId}
          onNavigate={setCurrentFolderId}
          onTriggerUpload={() => setIsUploadModalOpen(true)}
          onCreateFolder={onCreateFolder}
          currentUser={user}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-serif text-gray-800 mb-1">
                {currentFolderId ? folders.find(f => f.id === currentFolderId)?.name : 'Archives Globales'}
              </h2>
              <p className="text-gray-500 text-sm">Gestion des actifs de la distillerie.</p>
            </div>
            
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200 self-start">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-md transition-all text-xs font-bold uppercase tracking-wider ${activeTab === 'all' ? 'shadow-inner' : 'text-gray-500 hover:text-gray-700'}`}
                style={activeTab === 'all' ? { backgroundColor: COLORS.bgLight, color: COLORS.header } : {}}
              >
                Tout voir
              </button>
              <button 
                onClick={() => setActiveTab('mine')}
                className={`px-4 py-1.5 rounded-md transition-all text-xs font-bold uppercase tracking-wider ${activeTab === 'mine' ? 'shadow-inner' : 'text-gray-500 hover:text-gray-700'}`}
                style={activeTab === 'mine' ? { backgroundColor: COLORS.bgLight, color: COLORS.header } : {}}
              >
                Mes uploads
              </button>
            </div>
          </div>

          <FileExplorer 
            files={displayFiles} 
            folders={filteredFolders}
            allFolders={folders}
            currentUser={user} 
            currentFolderId={currentFolderId}
            onNavigate={setCurrentFolderId}
            onTriggerUpload={() => setIsUploadModalOpen(true)}
            onDeleteFile={onDeleteFile}
            onFileClick={setSelectedFile}
          />
        </div>
      </div>

      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onUpload={handleUploadMultiple}
          folders={folders}
          currentFolderId={currentFolderId}
          currentUser={user}
        />
      )}

      {selectedFile && (
        <FileDetailModal 
          file={selectedFile} 
          onClose={() => setSelectedFile(null)} 
          onDelete={() => { onDeleteFile(selectedFile.id); setSelectedFile(null); }}
        />
      )}

      <footer className="py-6 text-center text-gray-400 text-xs border-t border-gray-200 mt-auto">
        <p>Pastis 12/12 - L'abus d'alcool est dangereux pour la santé, à consommer avec modération.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
