"use client";

import { useState } from "react";

const conversations = [
  { id: 1, name: "John Doe", avatar: "JD", lastMessage: "Hey, I have a question about my order", time: "2 min ago", unread: 3, status: "online" },
  { id: 2, name: "Jane Smith", avatar: "JS", lastMessage: "Thanks for the quick response!", time: "15 min ago", unread: 0, status: "offline" },
  { id: 3, name: "Mike Wilson", avatar: "MW", lastMessage: "When will my hoodie be shipped?", time: "1 hour ago", unread: 1, status: "online" },
  { id: 4, name: "Sarah Brown", avatar: "SB", lastMessage: "Perfect, I'll wait for the tracking number", time: "3 hours ago", unread: 0, status: "offline" },
  { id: 5, name: "Tom Davis", avatar: "TD", lastMessage: "Can I change my order address?", time: "5 hours ago", unread: 2, status: "offline" },
];

const messages = [
  { id: 1, sender: "customer", text: "Hey, I have a question about my order #4523", time: "10:30 AM" },
  { id: 2, sender: "agent", text: "Hi John! I'd be happy to help. What would you like to know about your order?", time: "10:32 AM" },
  { id: 3, sender: "customer", text: "I ordered the Logo Hoodie but I'm wondering if I can change the size from M to L?", time: "10:33 AM" },
  { id: 4, sender: "agent", text: "Let me check the status of your order. One moment please!", time: "10:34 AM" },
  { id: 5, sender: "customer", text: "Thank you!", time: "10:34 AM" },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Messages</h1>
        <p className="text-foreground/50 mt-1">Communicate with your customers.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden h-[calc(100vh-220px)] flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 cursor-pointer border-b border-border/50 hover:bg-border/20 transition-colors ${
                  selectedConversation.id === conv.id ? "bg-accent/10" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                      {conv.avatar}
                    </div>
                    {conv.status === "online" && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-card rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{conv.name}</span>
                      <span className="text-xs text-foreground/50">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-foreground/60 truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <span className="ml-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-xs text-background font-medium">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                  {selectedConversation.avatar}
                </div>
                {selectedConversation.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-card rounded-full" />
                )}
              </div>
              <div>
                <div className="font-medium">{selectedConversation.name}</div>
                <div className="text-xs text-foreground/50">{selectedConversation.status === "online" ? "Online" : "Offline"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
                <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
                <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-md px-4 py-2 rounded-2xl ${
                    msg.sender === "agent"
                      ? "bg-accent text-background rounded-br-sm"
                      : "bg-border rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "agent" ? "text-background/60" : "text-foreground/40"}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-border/30 transition-colors">
                <svg className="w-5 h-5 text-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
              />
              <button className="p-2.5 bg-accent rounded-lg hover:bg-accent-hover transition-colors">
                <svg className="w-5 h-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

