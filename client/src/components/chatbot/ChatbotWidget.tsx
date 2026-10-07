import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { ChatMessage } from '../../types';
import {
  INITIAL_BOT_MESSAGE,
  QUICK_PROMPTS,
  matchChatIntent,
} from '../../data/chatbot';

const SESSION_CHAT_KEY = 'dronetv_chat_history_v1';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_CHAT_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load chat history:', e);
    }
    return [INITIAL_BOT_MESSAGE];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide floating widget if user is directly on the dedicated full-page /chat route
  const isDedicatedChatPage = location.pathname === '/chat';

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_CHAT_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history:', e);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate natural response latency
    setTimeout(() => {
      const { response, action } = matchChatIntent(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "Conversation reset. Hello! I'm DroneTV's AI Support Assistant. What can I assist you with today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleActionClick = (action?: ChatMessage['action']) => {
    if (!action) return;
    if (action.type === 'enquiry') {
      const interestParam = action.payload ? `?interest=${encodeURIComponent(action.payload)}` : '';
      setIsOpen(false);
      navigate(`/contact${interestParam}`);
    }
  };

  if (isDedicatedChatPage) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Chat Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-canvas shadow-xl hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 border border-hairline"
          aria-label="Open DroneTV AI Assistant"
        >
          <span className="material-symbols-outlined text-[26px]">smart_toy</span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white"></span>
          </span>
          {/* Tooltip on hover */}
          <div className="absolute right-16 px-3 py-1.5 rounded-md bg-surface-container-lowest border border-hairline text-ink text-[12px] font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
            Ask DroneTV AI Assistant
          </div>
        </button>
      )}

      {/* Expanded Chat Widget Window */}
      {isOpen && (
        <div className="relative flex flex-col w-[calc(100vw-2rem)] sm:w-[400px] h-[560px] max-h-[85vh] bg-surface-container-lowest border border-hairline rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-hairline bg-surface-container-low">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-canvas">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-ink flex items-center gap-1.5">
                  DroneTV Assistant
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" title="Online" />
                </h3>
                <p className="text-[11px] text-mute">Predefined Aviation &amp; Pilot Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 text-mute hover:text-ink hover:bg-surface-container rounded-md transition-colors"
                title="Reset conversation"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-mute hover:text-ink hover:bg-surface-container rounded-md transition-colors"
                aria-label="Close chat"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-hairline bg-surface-container-lowest overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.slice(0, 4).map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full bg-surface-container-low text-body hover:bg-ink hover:text-canvas transition-colors border border-hairline"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-canvas">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-end gap-1.5 max-w-[86%]">
                  {msg.sender === 'bot' && (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-canvas text-[12px]">
                      <span className="material-symbols-outlined text-[13px]">smart_toy</span>
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl text-[13px] leading-relaxed shadow-2xs whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-ink text-canvas rounded-br-xs'
                        : 'bg-surface-container-lowest text-ink border border-hairline rounded-bl-xs'
                    }`}
                  >
                    {msg.text}

                    {/* Action CTA pill inside bot messages */}
                    {msg.sender === 'bot' && msg.action && (
                      <div className="mt-3 pt-2 border-t border-hairline">
                        <button
                          onClick={() => handleActionClick(msg.action)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-ink text-canvas text-[12px] font-medium hover:opacity-90 transition-opacity w-full justify-center shadow-xs"
                        >
                          <span className="material-symbols-outlined text-[14px]">send</span>
                          {msg.action.label}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-mute px-1 mt-0.5">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 max-w-[80%]">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-canvas">
                  <span className="material-symbols-outlined text-[13px]">smart_toy</span>
                </div>
                <div className="p-3 bg-surface-container-lowest border border-hairline rounded-2xl rounded-bl-xs shadow-2xs">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 bg-mute rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 bg-mute rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 bg-mute rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-hairline bg-surface-container-lowest flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about pilot courses, services..."
              className="flex-1 text-[13px] px-3.5 py-2 bg-surface-container-low border border-hairline rounded-lg text-ink placeholder:text-mute focus:outline-hidden focus:border-ink transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-canvas hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs shrink-0"
              aria-label="Send message"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
