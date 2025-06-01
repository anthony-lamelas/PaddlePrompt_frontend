
import React from 'react';
import { User, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-start space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''} animate-fade-in`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-all hover:scale-105 ${
        message.isUser 
          ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white shadow-blue-200' 
          : 'bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-500 text-white shadow-cyan-200'
      }`}>
        {message.isUser ? <User size={14} /> : <Bot size={14} />}
        {!message.isUser && (
          <Sparkles size={6} className="absolute -top-0.5 -right-0.5 text-yellow-300 animate-pulse" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-lg ${message.isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-3 rounded-xl shadow-md backdrop-blur-sm transition-all hover:shadow-lg ${
          message.isUser
            ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-br-md shadow-blue-200'
            : 'bg-gradient-to-br from-white/90 to-blue-50/90 text-slate-800 rounded-bl-md border border-blue-100/50 shadow-cyan-100'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.text}</p>
        </div>
        <p className={`text-xs text-slate-500 mt-1 font-medium ${message.isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
