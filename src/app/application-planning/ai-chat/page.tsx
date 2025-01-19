"use client"; // If you're using Next.js App Router
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  Bot,
  User,
  Loader,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import styles from "~/styles/ApplicationPlanning/AI-Chat.module.css";

const UniversityQA = () => {
  const router = useRouter(); // If you need routing
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hello! I'm your university application assistant. I can help you with any questions about college applications, essays, requirements, or university selection. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How do I write a compelling personal statement?",
    "What are the key components of a strong application?",
    "How important are extracurricular activities?",
    "What SAT/ACT scores do top universities expect?",
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      type: "user" as const,
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content:
            "This is a simulated response. Connect this to your actual AI backend for real responses.",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Outer Container */}
      <div className={styles.chatContainer}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>
            <Bot size={32} color="#2563eb" />
            University Application Assistant
          </h1>
        </div>

        {/* Chat Container */}
        <div ref={chatContainerRef} className={styles.chatMessages}>
          {/* Suggested Questions (only shown at start) */}
          {messages.length === 1 && (
            <div className="grid gap-3 mb-6">
              <p className="text-gray-500 mb-2">
                Suggested questions to get started:
              </p>
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputMessage(question);
                    handleSend();
                  }}
                  className="p-3 bg-gray-50 border border-gray-200 rounded-md text-left transition-colors duration-200 hover:bg-gray-100 hover:border-gray-300"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Messages */}
          {messages.map((message, index) => {
            const isBot = message.type === "bot";
            return (
              <div
                key={index}
                className={`${styles.messageWrapper} ${
                  isBot ? styles.messageAlignmentBot : styles.messageAlignmentUser
                }`}
              >
                {/* Bot Icon */}
                {isBot && (
                  <div className={styles.blueCircle}>
                    <Bot size={20} color="white" />
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`
                    ${styles.messageBase} 
                    ${isBot ? styles.botMessage : styles.userMessage}
                  `}
                >
                  {message.content}

                  {/* Thumbs for bot only */}
                  {isBot && (
                    <div className={styles.feedbackContainer}>
                      <button className={styles.feedbackButton}>
                        <ThumbsUp size={16} />
                      </button>
                      <button className={styles.feedbackButton}>
                        <ThumbsDown size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {/* User Icon */}
                {!isBot && (
                  <div className={styles.blueCircle}>
                    <User size={20} color="white" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className={styles.blueCircle}>
                <Bot size={20} color="white" />
              </div>
              <div
                className={`${styles.messageBase} ${styles.botMessage} rounded-tl-[4px]`}
              >
                <Loader size={20} className="animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className={styles.inputArea}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Type your question here..."
              className={styles.textInput}
            />
            <button onClick={handleSend} className={styles.sendButton}>
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityQA;
