"use client";

import { useState } from "react";
import { Check, MoreHorizontal, Bell } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "15m",
    unread: false,
  },
  {
    id: "2",
    title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "15m",
    unread: true,
  },
  {
    id: "3",
    title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "2m",
    unread: true,
  },
  {
    id: "4",
   title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "2m",
    unread: true,
  },
  {
    id: "5",
   title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "2m",
    unread: true,
  },
  {
    id: "6",
   title: "Welcome to PrivaSync",
    body: "This is a very good project. Love to IITK.",
    time: "2m",
    unread: true,
  },
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const markAllRead = (): void => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleMenu = (id: string): void => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const markOneRead = (id: string): void => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
    setOpenMenuId(null);
  };

  const removeOne = (id: string): void => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="w-full max-w-md ml-auto h-full rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <button className="flex items-center gap-1 text-black-700 font-semibold text-sm hover:text-cyan-800">
          All Notifications
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={markAllRead}
            title="Mark all as read"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
          >
            <Check size={14} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="max-h-[520px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-gray-400">
            <Bell size={28} />
            <p className="text-sm">You&apos;re all caught up</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`relative flex gap-3 px-5 py-4 transition-colors ${
                n.unread ? "bg-cyan-50/60" : "bg-white"
              }`}
            >
              <div className="w-2 pt-1.5 shrink-0">
                {n.unread && (
                  <span className="block w-2 h-2 rounded-full bg-cyan-600" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                <p className="text-sm text-gray-500 mt-1 leading-snug">{n.body}</p>
              </div>

              <div className="flex flex-col items-end shrink-0 pl-2">
                <span className="text-xs text-gray-400">{n.time}</span>
                <div className="relative mt-1.5">
                  <button
                    onClick={() => toggleMenu(n.id)}
                    className="text-cyan-500 hover:text-cyan-700 px-1"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                  {openMenuId === n.id && (
                    <div className="absolute right-0 mt-1 w-40 rounded-lg border border-gray-200 bg-white shadow-md z-10 text-sm overflow-hidden">
                      {n.unread && (
                        <button
                          onClick={() => markOneRead(n.id)}
                          className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => removeOne(n.id)}
                        className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
