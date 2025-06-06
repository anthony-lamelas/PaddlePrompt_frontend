import React, { useState, useRef, useEffect } from 'react';
import { Send, Waves, Plus } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import { apiCall } from '../config/api';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: "Hello! I'm PaddlePrompt, your concrete canoe proposal assistant. I'm here to help you navigate the waters of canoe design and proposals. What would you like to explore today? 🚣‍♀️",
  isUser: false,
  timestamp: new Date()
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Convert messages to conversation history format for API
  const getConversationHistory = () => {
    return messages
      .filter(msg => msg.id !== '1') // Exclude the initial greeting message
      .map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      }));
  };

  // Function to start a new chat
  const startNewChat = async () => {
    const oldSessionId = sessionId;
    
    // Generate new session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    // Reset messages to initial state
    setMessages([{
      ...INITIAL_MESSAGE,
      timestamp: new Date() // Update timestamp for new chat
    }]);
    
    // Clear typing state
    setIsTyping(false);
    
    // Optional: Clear the old session on the server (helps with memory management)
    try {
      await apiCall('/clear-session', {
        method: 'POST',
        body: JSON.stringify({ session_id: oldSessionId }),
      });
      console.log(`Cleared old session: ${oldSessionId}`);
    } catch (error) {
      console.log('Note: Could not clear old session on server (not critical):', error);
    }
    
    console.log(`Started new chat with session ID: ${newSessionId}`);
  };

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
      // Get conversation history (including the new user message)
      const conversationHistory = [
        ...getConversationHistory(),
        { role: 'user', content: text }
      ];

      // Call the backend with conversation history
      const data = await apiCall('/query', {
        method: 'POST',
        body: JSON.stringify({ 
          question: text,
          session_id: sessionId,
          conversation_history: conversationHistory
        }),
      });
      
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

      <div className="container mx-auto max-w-4xl h-screen flex flex-col relative z-10 p-3">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-indigo-500/15 backdrop-blur-md border-b border-blue-200/50 p-4 shadow-lg rounded-t-2xl">
          <div className="text-center">
            <div className="flex items-center justify-between mb-2">
              {/* Left spacer for symmetry */}
              <div className="w-10"></div>
              
              {/* Center content */}
              <div className="flex items-center justify-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl shadow-lg">
                  <Waves className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  PaddlePrompt
                </h1>
              </div>
              
              {/* New Chat Button */}
              <button
                onClick={startNewChat}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-lg hover:from-emerald-500 hover:to-teal-600 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-medium"
                title="Start New Chat"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Chat</span>
              </button>
            </div>
            <p className="text-slate-600 text-base font-medium mb-2">Your AI-Powered Concrete Canoe Companion</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-500">Ready to help with your canoe proposals</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-gradient-to-r from-white/80 via-blue-50/80 to-cyan-50/80 backdrop-blur-md border-t border-blue-200/50 rounded-b-2xl">
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default Index;
