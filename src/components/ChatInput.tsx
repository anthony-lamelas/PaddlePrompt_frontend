
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

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
      <div className="flex items-end space-x-3 bg-white/90 backdrop-blur-md rounded-xl border border-blue-200/50 shadow-lg p-3 focus-within:ring-2 focus-within:ring-cyan-400/50 focus-within:border-cyan-300 transition-all hover:shadow-xl">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me about concrete canoe proposals, design tips, or regulations..."
          disabled={disabled}
          className="flex-1 resize-none border-none outline-none bg-transparent text-slate-800 placeholder-slate-500 max-h-24 min-h-[24px] leading-6 font-medium text-sm"
          rows={1}
        />
        
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all transform ${
            message.trim() && !disabled
              ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 shadow-lg hover:shadow-xl hover:scale-105 shadow-blue-200'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
