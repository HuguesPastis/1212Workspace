
import React, { useState, useRef } from 'react';
import { Folder, FileItem, User } from '../types';
import { COLORS } from '../constants';

interface UploadModalProps {
  onClose: () => void;
  onUpload: (files: FileItem[]) => void;
  folders: Folder[];
  currentFolderId: string | null;
  currentUser: User;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUpload, folders, currentFolderId, currentUser }) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(currentFolderId);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPendingFiles(Array.from(e.target.files));
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleUploadSubmit = async () => {
    if (pendingFiles.length === 0) return;
    
    setIsProcessing(true);
    try {
      const uploadedItems: FileItem[] = await Promise.all(pendingFiles.map(async (file) => {
        const base64Data = await convertToBase64(file);
        return {
          id: 'file_' + Date.now() + Math.random().toString(36).substr(2, 4),
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64Data,
          folderId: selectedFolderId,
          uploadedBy: currentUser || 'Inconnu',
          uploadedAt: new Date().toISOString(),
          comments: []
        };
      }));
      onUpload(uploadedItems);
    } catch (error) {
      alert("Une erreur est survenue lors du chargement des fichiers.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Charger des fichiers</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Folder Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Dossier de destination</label>
            <select 
              className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 outline-none"
              value={selectedFolderId || ''}
              onChange={(e) => setSelectedFolderId(e.target.value || null)}
            >
              <option value="">Archives Globales</option>
              {folders.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>

          {/* File Picker */}
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all group"
          >
            <input 
              type="file" 
              multiple 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
            />
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📤</div>
            <p className="text-gray-600 font-medium">Cliquez pour sélectionner des fichiers</p>
            <p className="text-xs text-gray-400 mt-1">Tous formats acceptés (PDF, Excel, Images...)</p>
          </div>

          {/* Pending Files List */}
          {pendingFiles.length > 0 && (
            <div className="max-h-32 overflow-y-auto space-y-2">
              {pendingFiles.map((f, i) => (
                <div key={i} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                  <span className="truncate flex-1 pr-4">{f.name}</span>
                  <span className="text-gray-400">{(f.size / 1024).toFixed(0)} KB</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button 
            disabled={pendingFiles.length === 0 || isProcessing}
            onClick={handleUploadSubmit}
            className="px-8 py-2.5 rounded-xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
            style={{ backgroundColor: COLORS.gold, color: COLORS.header }}
          >
            {isProcessing ? 'Traitement...' : `Uploader ${pendingFiles.length > 0 ? `(${pendingFiles.length})` : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
