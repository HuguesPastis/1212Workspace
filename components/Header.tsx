
import React from 'react';
import { User } from '../types';
import { COLORS } from '../constants';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: COLORS.header }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={onLogout}>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md border-2 transition-transform group-hover:scale-110"
              style={{ backgroundColor: COLORS.gold, color: COLORS.header, borderColor: COLORS.accent }}
            >
              12
            </div>
            <h1 className="text-2xl font-serif tracking-tight text-white">
              Pastis 12/12
            </h1>
          </div>

          {/* Bouton Accueil */}
          <button 
            onClick={onLogout}
            className="hidden md:flex items-center gap-2 text-white hover:text-[#ddb857] transition-colors font-medium text-sm border-l border-gray-600 pl-8 h-6"
            aria-label="Retour à l'accueil"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Accueil
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Membre Distillerie</span>
            <span className="text-white font-medium text-sm">{user}</span>
          </div>
          
          <button 
            onClick={onLogout}
            className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 shadow-md flex items-center gap-2"
            style={{ backgroundColor: COLORS.secondary, color: 'white' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Quitter
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
