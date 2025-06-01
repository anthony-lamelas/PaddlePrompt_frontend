
import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start space-x-3 animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-500 text-white shadow-md relative">
        <Bot size={14} />
        <Sparkles size={6} className="absolute -top-0.5 -right-0.5 text-yellow-300 animate-pulse" />
      </div>

      {/* Typing Animation */}
      <div className="bg-gradient-to-br from-white/90 to-blue-50/90 rounded-xl rounded-bl-md border border-blue-100/50 shadow-md backdrop-blur-sm p-3">
        <div className="flex space-x-2 items-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-slate-500 font-medium ml-2">Thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
