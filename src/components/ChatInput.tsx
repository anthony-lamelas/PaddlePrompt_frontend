
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-end space-x-6 bg-white/90 backdrop-blur-md rounded-3xl border border-blue-200/50 shadow-2xl p-6 focus-within:ring-4 focus-within:ring-cyan-400/50 focus-within:border-cyan-300 transition-all hover:shadow-3xl">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about concrete canoe proposals, design tips, or regulations..."
          disabled={disabled}
          className="flex-1 resize-none border-none outline-none bg-transparent text-slate-800 placeholder-slate-500 max-h-40 min-h-[32px] leading-7 font-medium text-lg"
          rows={1}
        />
        
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="flex-shrink-0 w-14 h-14 rounded-3xl flex items-center justify-center transition-all bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
          >
            <Mic size={22} />
          </button>
          
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`flex-shrink-0 w-16 h-16 rounded-3xl flex items-center justify-center transition-all transform ${
              message.trim() && !disabled
                ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 shadow-2xl hover:shadow-3xl hover:scale-105 shadow-blue-200'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
