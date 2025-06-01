
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
    <div className={`flex items-start space-x-6 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''} animate-fade-in`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl transition-all hover:scale-105 ${
        message.isUser 
          ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white shadow-blue-200' 
          : 'bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-500 text-white shadow-cyan-200'
      }`}>
        {message.isUser ? <User size={24} /> : <Bot size={24} />}
        {!message.isUser && (
          <Sparkles size={10} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-2xl ${message.isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-6 rounded-3xl shadow-xl backdrop-blur-sm transition-all hover:shadow-2xl ${
          message.isUser
            ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white rounded-br-lg shadow-blue-200'
            : 'bg-gradient-to-br from-white/90 to-blue-50/90 text-slate-800 rounded-bl-lg border border-blue-100/50 shadow-cyan-100'
        }`}>
          <p className="text-lg leading-relaxed whitespace-pre-wrap font-medium">{message.text}</p>
        </div>
        <p className={`text-sm text-slate-500 mt-3 font-medium ${message.isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
