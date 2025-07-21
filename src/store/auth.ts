import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import type { UserProfile, AuthState, LoginCredentials, RegisterCredentials } from '../types'

interface AuthStore extends AuthState {
  // Actions
  signIn: (credentials: LoginCredentials) => Promise<void>
  signUp: (credentials: RegisterCredentials) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>
  initialize: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      session: null,
      loading: true,
      error: null,

      // Actions
      signIn: async (credentials: LoginCredentials) => {
        try {
          set({ loading: true, error: null })
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) throw error

          // Fetch user profile
          if (data.user) {
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single()

            if (profileError) {
              console.warn('Profile not found, user may need to complete setup')
            }

            set({
              user: profile || {
                id: data.user.id,
                email: data.user.email!,
                created_at: data.user.created_at,
                updated_at: data.user.updated_at || data.user.created_at,
              },
              session: data.session,
              loading: false,
            })
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to sign in',
            loading: false 
          })
          throw error
        }
      },

      signUp: async (credentials: RegisterCredentials) => {
        try {
          set({ loading: true, error: null })
          
          const { data, error } = await supabase.auth.signUp({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) throw error

          // Create user profile
          if (data.user) {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                email: credentials.email,
                name: credentials.name,
                academic_level: credentials.academic_level,
                research_interests: credentials.research_interests || [],
              })

            if (profileError) throw profileError

            // Fetch the created profile
            const { data: profile, error: fetchError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single()

            if (fetchError) throw fetchError

            set({
              user: profile,
              session: data.session,
              loading: false,
            })
          }
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to sign up',
            loading: false 
          })
          throw error
        }
      },

      signOut: async () => {
        try {
          set({ loading: true, error: null })
          
          const { error } = await supabase.auth.signOut()
          if (error) throw error

          set({
            user: null,
            session: null,
            loading: false,
          })
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to sign out',
            loading: false 
          })
          throw error
        }
      },

      updateProfile: async (profileUpdates: Partial<UserProfile>) => {
        try {
          const { user } = get()
          if (!user) throw new Error('No user logged in')

          set({ loading: true, error: null })

          const { data, error } = await supabase
            .from('profiles')
            .update(profileUpdates)
            .eq('id', user.id)
            .select()
            .single()

          if (error) throw error

          set({
            user: data,
            loading: false,
          })
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to update profile',
            loading: false 
          })
          throw error
        }
      },

      initialize: async () => {
        try {
          set({ loading: true, error: null })

          // Get current session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession()
          
          if (sessionError) throw sessionError

          if (session?.user) {
            // Fetch user profile
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profileError) {
              console.warn('Profile not found:', profileError)
            }

            set({
              user: profile || {
                id: session.user.id,
                email: session.user.email!,
                created_at: session.user.created_at,
                updated_at: session.user.updated_at || session.user.created_at,
              },
              session,
              loading: false,
            })
          } else {
            set({
              user: null,
              session: null,
              loading: false,
            })
          }

          // Listen for auth changes
          supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()

              set({
                user: profile || {
                  id: session.user.id,
                  email: session.user.email!,
                  created_at: session.user.created_at,
                  updated_at: session.user.updated_at || session.user.created_at,
                },
                session,
                loading: false,
              })
            } else if (event === 'SIGNED_OUT') {
              set({
                user: null,
                session: null,
                loading: false,
              })
            }
          })
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to initialize auth',
            loading: false 
          })
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'research-platform-auth', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist certain parts of the state
      partialize: (state) => ({
        user: state.user,
        session: state.session,
        // Don't persist loading and error states
      }),
    }
  )
)