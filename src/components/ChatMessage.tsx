
import React from 'react';
import { User, Bot } from 'lucide-react';

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
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        message.isUser 
          ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
          : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
      }`}>
        {message.isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg ${message.isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block p-4 rounded-2xl shadow-sm ${
          message.isUser
            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-sm'
            : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
