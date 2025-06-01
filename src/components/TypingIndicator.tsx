
import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-6 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-16 h-16 rounded-3xl flex items-center justify-center bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-500 text-white shadow-xl shadow-cyan-200 relative">
        <Bot size={24} />
        <Sparkles size={10} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
      </div>

      {/* Typing Animation */}
      <div className="bg-gradient-to-br from-white/90 to-blue-50/90 rounded-3xl rounded-bl-lg border border-blue-100/50 shadow-xl backdrop-blur-sm p-7">
        <div className="flex space-x-3 items-center">
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-lg text-slate-500 font-medium ml-3">Thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
