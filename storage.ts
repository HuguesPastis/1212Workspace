
import { StorageData } from './types';

const STORAGE_KEY = 'pastis_12_12_storage';

export const loadData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Erreur lors du chargement des données Pastis 12/12:", error);
  }
  return { files: [], folders: [] };
};

export const saveData = (data: StorageData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des données Pastis 12/12:", error);
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      alert("Erreur: Espace de stockage saturé. Impossible de sauvegarder ce fichier.");
    }
  }
};
