import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  bio?: string
  avatar?: string
  intentTags: string[]
  isActive: boolean
  isPublic: boolean
  profileLink?: string
  createdAt: string
}

interface Connection {
  id: string
  initiatorId: string
  receiverId: string
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'BLOCKED'
  connectionMessage?: string
  initiatorSharedInfo: boolean
  receiverSharedInfo: boolean
  createdAt: string
}

interface Message {
  id: string
  connectionId: string
  senderId: string
  receiverId: string
  content: string
  type: 'TEXT' | 'INFO_SHARE_REQUEST' | 'INFO_SHARED'
  isRead: boolean
  createdAt: string
}

interface AuthState {
  token: string | null
  user: User | null
  isAuthenticated: boolean
  setAuth: (token: string, user: User) => void
  setUser: (user: User) => void
  logout: () => void
}

interface ConnectionsState {
  connections: Connection[]
  setConnections: (connections: Connection[]) => void
  addConnection: (connection: Connection) => void
  updateConnection: (id: string, updates: Partial<Connection>) => void
}

interface MessagesState {
  messages: Message[]
  setMessages: (messages: Message[]) => void
  addMessage: (message: Message) => void
  markAsRead: (messageIds: string[]) => void
}

interface NotificationState {
  notifications: any[]
  unreadCount: number
  setNotifications: (notifications: any[]) => void
  markNotificationAsRead: (notificationIds: string[]) => void
  clearNotifications: () => void
}

// Main app store combining all states
export const useAppStore = create<AuthState & ConnectionsState & MessagesState & NotificationState>()(
  persist(
    (set, get) => ({
      // Auth state
      token: null,
      user: null,
      isAuthenticated: false,
      
      setAuth: (token: string, user: User) => set({ 
        token, 
        user, 
        isAuthenticated: true 
      }),
      
      setUser: (user: User) => set({ user }),
      
      logout: () => set({ 
        token: null, 
        user: null, 
        isAuthenticated: false,
        connections: [],
        messages: [],
        notifications: [],
        unreadCount: 0
      }),

      // Connections state
      connections: [],
      setConnections: (connections: Connection[]) => set({ connections }),
      addConnection: (connection: Connection) => set((state) => ({ 
        connections: [...state.connections, connection] 
      })),
      updateConnection: (id: string, updates: Partial<Connection>) => set((state) => ({ 
        connections: state.connections.map(conn => 
          conn.id === id ? { ...conn, ...updates } : conn
        )
      })),

      // Messages state  
      messages: [],
      setMessages: (messages: Message[]) => set({ messages }),
      addMessage: (message: Message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      markAsRead: (messageIds: string[]) => set((state) => ({
        messages: state.messages.map(msg =>
          messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
        )
      })),

      // Notifications state
      notifications: [],
      unreadCount: 0,
      setNotifications: (notifications: any[]) => set({ notifications }),
      markNotificationAsRead: (notificationIds: string[]) => set((state) => ({
        notifications: state.notifications.map(notif =>
          notificationIds.includes(notif.id) ? { ...notif, isRead: true } : notif
        ),
        unreadCount: Math.max(0, state.unreadCount - notificationIds.length)
      })),
      clearNotifications: () => set({ notifications: [], unreadCount: 0 })
    }),
    {
      name: 'therive-store',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      })
    }
  )
)

// Separate stores for non-persisted data
export const useConnectionsStore = create<ConnectionsState>((set) => ({
  connections: [],
  setConnections: (connections: Connection[]) => set({ connections }),
  addConnection: (connection: Connection) => set((state) => ({ 
    connections: [...state.connections, connection] 
  })),
  updateConnection: (id: string, updates: Partial<Connection>) => set((state) => ({ 
    connections: state.connections.map(conn => 
      conn.id === id ? { ...conn, ...updates } : conn
    )
  }))
}))

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  addMessage: (message: Message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),
  markAsRead: (messageIds: string[]) => set((state) => ({
    messages: state.messages.map(msg =>
      messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
    )
  }))
})) 