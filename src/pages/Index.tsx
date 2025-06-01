
import React, { useState, useRef, useEffect } from 'react';
import { Send, Waves } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm PaddlePrompt, your concrete canoe proposal assistant. I'm here to help you navigate the waters of canoe design and proposals. What would you like to explore today? 🚣‍♀️",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Replace with your actual backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer || "I'm sorry, I couldn't process your request at the moment.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting to my knowledge base. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-100/30 to-cyan-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto max-w-5xl h-screen flex flex-col relative z-10 p-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-indigo-500/15 backdrop-blur-md border-b border-blue-200/50 p-6 shadow-lg rounded-t-3xl">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-3">
              <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-xl">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PaddlePrompt
              </h1>
            </div>
            <p className="text-slate-600 text-lg font-medium mb-3">Your AI-Powered Concrete Canoe Companion</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-500">Ready to help with your canoe proposals</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-6 bg-gradient-to-r from-white/80 via-blue-50/80 to-cyan-50/80 backdrop-blur-md border-t border-blue-200/50 rounded-b-3xl">
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default Index;
