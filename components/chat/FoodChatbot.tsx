'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function FoodChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your food assistant. What would you like to order?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#ff6229',
          color: 'white',
          padding: '16px',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '60px',
          height: '60px',
        }}
        aria-label="Open chat"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e5e7eb',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#ff6229',
          color: 'white',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
          Food Assistant
        </h2>
        <button
          onClick={e => {
            e.preventDefault();
            setIsOpen(false);
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

      <div
        style={{
          flex: 1,
          padding: '1rem',
          overflowY: 'auto',
          height: '60vh',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((message, index) => (
            <div key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor:
                      message.role === 'user' ? '#ff6229' : '#f3f4f6',
                    color: message.role === 'user' ? 'white' : '#1f2937',
                  }}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(e);
        }}
        style={{
          padding: '1rem',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '0.5rem',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
            outline: 'none',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
          }}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          style={{
            backgroundColor: '#ff6229',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            padding: '0 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: isLoading || !input.trim() ? 0.5 : 1,
            pointerEvents: isLoading || !input.trim() ? 'none' : 'auto',
          }}
        >
          <Send style={{ width: '16px', height: '16px' }} />
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
