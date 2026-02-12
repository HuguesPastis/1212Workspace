
import React from 'react';
import { User } from '../types';
import { COLORS } from '../constants';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const users: User[] = ['Hugues', 'Jan', 'Alain'];

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: COLORS.header }}
    >
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full text-center border-4 border-opacity-20" style={{ borderColor: COLORS.gold }}>
        <div className="mb-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-2 tracking-tighter">
            <span style={{ color: COLORS.gold }}>Pastis</span> <span style={{ color: COLORS.header }}>12/12</span>
          </h1>
          <div className="h-1 w-20 bg-amber-400 mx-auto rounded-full"></div>
        </div>

        <h2 className="text-2xl font-semibold mb-10 text-gray-800">
          Partage de Fichiers
        </h2>

        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-gray-500 mb-2">Se connecter en tant que</p>
          {users.map((user) => (
            <button
              key={user}
              onClick={() => onLogin(user)}
              className="w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
              style={{ backgroundColor: COLORS.gold, color: COLORS.header }}
            >
              <span className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center">
                {user?.charAt(0)}
              </span>
              {user}
            </button>
          ))}
        </div>

        <div className="mt-12 text-xs text-gray-400 uppercase tracking-tighter">
          &copy; 2024 Pastis 12/12 - Propriété Exclusive
        </div>
      </div>
    </div>
  );
};

export default Login;
