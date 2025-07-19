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
  senderId: string
  receiverId: string
  connectionId: string
  content: string
  messageType: 'TEXT' | 'INFO_SHARE_REQUEST' | 'INFO_SHARED'
  isRead: boolean
  createdAt: string
}

interface AppState {
  // Auth state
  user: User | null
  isAuthenticated: boolean
  token: string | null

  // UI state
  loading: boolean
  error: string | null

  // Data state
  connections: Connection[]
  messages: Message[]
  users: User[]

  // Actions
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  
  // Connection actions
  addConnection: (connection: Connection) => void
  updateConnection: (id: string, updates: Partial<Connection>) => void
  
  // Message actions
  addMessage: (message: Message) => void
  markMessageAsRead: (id: string) => void
  
  // User actions
  updateUser: (updates: Partial<User>) => void
  setUsers: (users: User[]) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,
      error: null,
      connections: [],
      messages: [],
      users: [],

      // Auth actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      logout: () => set({
        user: null,
        isAuthenticated: false,
        token: null,
        connections: [],
        messages: [],
        users: []
      }),

      // Connection actions
      addConnection: (connection) => set(state => ({
        connections: [...state.connections, connection]
      })),
      updateConnection: (id, updates) => set(state => ({
        connections: state.connections.map(conn =>
          conn.id === id ? { ...conn, ...updates } : conn
        )
      })),

      // Message actions
      addMessage: (message) => set(state => ({
        messages: [...state.messages, message]
      })),
      markMessageAsRead: (id) => set(state => ({
        messages: state.messages.map(msg =>
          msg.id === id ? { ...msg, isRead: true } : msg
        )
      })),

      // User actions
      updateUser: (updates) => set(state => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
      setUsers: (users) => set({ users })
    }),
    {
      name: 'therive-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      })
    }
  )
) 