"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState<string[]>(["Chat 1", "Chat 2"]);
  const [activeChat, setActiveChat] = useState<string>("Chat 1");

  const handleNewChat = () => {
    const newChat = `Chat ${chats.length + 1}`;
    setChats([...chats, newChat]);
    setActiveChat(newChat);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-64 bg-gray-100 border-r p-4 flex flex-col transition-all duration-300">
          <h2 className="text-lg font-bold mb-4 text-[#6c47ff] flex justify-between items-center">
            💬 Chats
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </h2>
          <nav className="flex-1 overflow-y-auto space-y-2">
            {chats.map((chat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChat(chat)}
                className={`w-full text-left p-2 rounded-lg ${
                  activeChat === chat
                    ? "bg-[#6c47ff] text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {chat}
              </button>
            ))}
          </nav>
          <button
            onClick={handleNewChat}
            className="bg-[#6c47ff] text-white w-full py-2 rounded-lg mt-4"
          >
            ➕ New Chat
          </button>
        </aside>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 h-16 shadow-md bg-white">
          <div className="flex items-center gap-4">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-[#6c47ff] font-bold text-lg"
              >
                ☰
              </button>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-[#6c47ff]">
              🚀 TechHub AI
            </h1>
          </div>
          <div className="flex gap-4">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        {/* Chat Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <h2 className="text-lg font-semibold mb-2">Active: {activeChat}</h2>
          {children}
        </main>
      </div>
    </div>
  );
}
