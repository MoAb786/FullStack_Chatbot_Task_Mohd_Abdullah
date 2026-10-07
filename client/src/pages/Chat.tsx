import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import type { ChatMessage } from '../types';
import {
  INITIAL_BOT_MESSAGE,
  QUICK_PROMPTS,
  CATEGORIZED_PROMPTS,
  matchChatIntent,
} from '../data/chatbot';

const SESSION_CHAT_KEY = 'dronetv_chat_history_v1';

export const Chat: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const displayedPrompts =
    selectedCategory === 'All'
      ? QUICK_PROMPTS
      : CATEGORIZED_PROMPTS.find((c) => c.category === selectedCategory)?.prompts || QUICK_PROMPTS;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_CHAT_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history:', e);
    }
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const promptQuery = searchParams.get('prompt');
    if (promptQuery) {
      handleSendMessage(promptQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
    }, 400);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: "Session reset. Welcome to DroneTV Aero. I am your automated flight operations and course advisor. How can I assist your mission today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleActionClick = (action?: ChatMessage['action']) => {
    if (!action) return;
    if (action.type === 'enquiry') {
      const interestParam = action.payload ? `?interest=${encodeURIComponent(action.payload)}` : '';
      navigate(`/contact${interestParam}`);
    }
  };

  return (
    <div className="flex flex-col w-full bg-canvas py-8 sm:py-10 px-4 min-h-[calc(100vh-4rem)]">
      {/* Background Top Context */}
      <div className="max-w-4xl mx-auto w-full mb-6 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-container-lowest border border-hairline text-mute">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-body">
            AERO ASSISTANT ENGINE v1.2 ACTIVE
          </span>
          <span className="text-hairline">|</span>
          <span className="font-mono text-[11px] text-mute uppercase">DETERMINISTIC INTENT</span>
        </div>
        <h1 className="text-[24px] sm:text-[28px] font-semibold text-ink tracking-tight">
          Interactive Lead &amp; Operations Copilot
        </h1>
      </div>

      {/* Main Assistant Console (Width: 100% on small mobile, up to 600px on desktop) */}
      <div className="w-full max-w-[620px] mx-auto h-[740px] sm:h-[780px] bg-surface-container-lowest border border-hairline rounded-2xl flex flex-col relative overflow-hidden shadow-2xl">
        {/* 1. Header Component */}
        <div className="px-4 py-3 bg-surface-container-lowest border-b border-hairline flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-hairline bg-surface-container-low flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-ink text-[18px]">terminal</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-[14px] text-ink font-semibold tracking-tight">
                  DroneTV Assistant
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-hairline bg-surface-container-low font-mono-eyebrow text-[10px] text-ink">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  ONLINE
                </span>
              </div>
              <span className="text-[11px] text-mute font-normal">
                Flight &amp; Lead Rule Engine v1.2
              </span>
            </div>
          </div>

          {/* Controls: Reset, Close */}
          <div className="flex items-center gap-1 text-mute">
            <button
              onClick={handleResetChat}
              className="w-7 h-7 rounded hover:bg-surface-container hover:text-ink flex items-center justify-center transition-colors"
              title="Reset Session"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
            </button>
            <Link
              to="/"
              className="w-7 h-7 rounded hover:bg-surface-container hover:text-red-500 flex items-center justify-center transition-colors"
              title="Close Assistant"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </Link>
          </div>
        </div>

        {/* System Banner Subhead */}
        <div className="bg-surface-container-low px-4 py-1.5 border-b border-hairline flex items-center justify-between text-[11px] text-mute shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-mute text-[13px]">lock</span>
            <span className="font-mono-eyebrow uppercase tracking-wider text-[10px]">
              AES-256 Flight Telemetry Link
            </span>
          </div>
          <span className="font-mono-eyebrow text-[10px] text-mute">NODE: SFO-9</span>
        </div>

        {/* 2. Conversation Stream */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 text-[13px] leading-relaxed scroll-smooth bg-canvas">
          <div className="flex items-center justify-center my-1">
            <span className="px-2.5 py-0.5 rounded-full border border-hairline bg-surface-container-low font-mono-eyebrow text-[10px] text-mute uppercase">
              SESSION ACTIVE
            </span>
          </div>

          {messages.map((msg) => (
            <React.Fragment key={msg.id}>
              {msg.sender === 'bot' ? (
                <div className="flex items-start gap-2.5 max-w-[92%]">
                  <div className="w-6 h-6 rounded-full border border-hairline bg-ink text-canvas shrink-0 flex items-center justify-center mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">smart_toy</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="bg-surface-container-lowest border border-hairline text-ink p-3.5 rounded-xl rounded-tl-xs shadow-2xs whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>
                    {msg.action && (
                      <div className="border border-hairline bg-surface-container-lowest p-3 rounded-lg flex flex-col gap-2 mt-1">
                        <div className="flex items-center gap-1.5 text-ink">
                          <span className="material-symbols-outlined text-[15px] text-mute">info</span>
                          <span className="font-mono-eyebrow text-[10px] uppercase font-medium tracking-wide">
                            Rule Action Trigger
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleActionClick(msg.action)}
                          className="inline-flex items-center justify-between w-full px-3 py-2 rounded-md bg-ink text-canvas text-[12px] font-medium hover:opacity-90 transition-opacity shadow-2xs"
                        >
                          <span>{msg.action.label}</span>
                          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                        </button>
                      </div>
                    )}
                    <span className="font-mono-eyebrow text-[10px] text-mute ml-0.5">
                      {msg.timestamp} • BOT RULE AUTO-INIT
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-end justify-end gap-2.5 ml-auto max-w-[85%]">
                  <div className="flex flex-col items-end gap-1">
                    <div className="bg-ink text-canvas px-3.5 py-2.5 rounded-xl rounded-tr-xs shadow-xs font-normal text-[13px] leading-snug whitespace-pre-wrap">
                      {msg.text}
                    </div>
                    <span className="font-mono-eyebrow text-[10px] text-mute mr-0.5">
                      {msg.timestamp} • TRANSMITTED
                    </span>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 max-w-[80%] pt-1">
              <div className="w-6 h-6 rounded-full border border-hairline bg-ink text-canvas shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[13px]">smart_toy</span>
              </div>
              <div className="bg-surface-container-lowest border border-hairline px-3 py-2 rounded-xl flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-mute animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-mute animate-bounce" style={{ animationDelay: '180ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-mute animate-bounce" style={{ animationDelay: '360ms' }}></span>
                </div>
                <span className="font-mono-eyebrow text-[10px] text-mute ml-1">
                  Assistant is preparing guidance...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Predefined Category Tabs & Quick Reply Chips */}
        <div className="px-4 py-2.5 border-t border-hairline bg-surface-container-low shrink-0 space-y-2">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-0.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`shrink-0 text-[11px] font-mono-eyebrow uppercase px-2.5 py-1 rounded-md transition-all ${
                selectedCategory === 'All'
                  ? 'bg-ink text-canvas font-semibold shadow-2xs'
                  : 'bg-surface-container-lowest text-mute hover:text-ink border border-hairline'
              }`}
            >
              All Topics ({QUICK_PROMPTS.length})
            </button>
            {CATEGORIZED_PROMPTS.map((cat) => (
              <button
                key={cat.category}
                type="button"
                onClick={() => setSelectedCategory(cat.category)}
                className={`shrink-0 text-[11px] font-mono-eyebrow uppercase px-2.5 py-1 rounded-md flex items-center gap-1.5 transition-all ${
                  selectedCategory === cat.category
                    ? 'bg-ink text-canvas font-semibold shadow-2xs'
                    : 'bg-surface-container-lowest text-mute hover:text-ink border border-hairline'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">{cat.icon}</span>
                <span>{cat.category.split('&')[0]}</span>
              </button>
            ))}
          </div>

          {/* Quick Prompts Chips Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {displayedPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full border border-hairline bg-surface-container-lowest hover:bg-ink hover:text-canvas text-ink text-[12px] transition-colors shrink-0 shadow-2xs flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[13px] text-mute">chat_bubble_outline</span>
                <span>{prompt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Input Bar & Actions */}
        <div className="p-3.5 bg-surface-container-lowest border-t border-hairline shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about pilot courses, eligibility, fees, payloads..."
                className="w-full bg-surface-container-low border border-hairline rounded-lg px-3.5 py-2 text-[13px] text-ink placeholder:text-mute focus:outline-hidden focus:border-ink transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="h-9 w-9 rounded-lg bg-ink text-canvas flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity shadow-xs shrink-0 cursor-pointer"
              aria-label="Send"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

