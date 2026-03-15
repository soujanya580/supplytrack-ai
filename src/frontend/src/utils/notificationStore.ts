import { create } from "zustand";

export type NotifType = "approve" | "reject" | "create" | "view" | "info";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotifType;
  time: string;
  read: boolean;
}

interface NotificationStore {
  notifications: AppNotification[];
  addNotification: (title: string, message: string, type: NotifType) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  addNotification: (title, message, type) => {
    const notif: AppNotification = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: false,
    };
    set((state) => ({
      notifications: [notif, ...state.notifications].slice(0, 50),
    }));
  },
  markRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
