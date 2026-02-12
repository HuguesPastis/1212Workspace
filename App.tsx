
import React, { useState, useEffect } from 'react';
import { User, FileItem, Folder } from './types';
import { loadData, saveData } from './storage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data on start
  useEffect(() => {
    const data = loadData();
    setFiles(data.files);
    setFolders(data.folders);
    setIsLoaded(true);
  }, []);

  // Save data on changes
  useEffect(() => {
    if (isLoaded) {
      saveData({ files, folders });
    }
  }, [files, folders, isLoaded]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleUpload = (newFile: FileItem) => {
    setFiles(prev => [newFile, ...prev]);
  };

  const handleCreateFolder = (newFolder: Folder) => {
    setFolders(prev => [...prev, newFolder]);
  };

  const handleDeleteFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="min-h-screen">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard 
          user={currentUser} 
          files={files} 
          folders={folders}
          onLogout={handleLogout} 
          onUpload={handleUpload}
          onCreateFolder={handleCreateFolder}
          onDeleteFile={handleDeleteFile}
        />
      )}
    </div>
  );
};

export default App;
