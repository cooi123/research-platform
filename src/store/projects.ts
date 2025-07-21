import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { supabase } from '../lib/supabase'
import { useAuthStore } from './auth'
import type { ResearchProject } from '../types'

interface ProjectFilters {
  status?: 'draft' | 'active' | 'completed' | 'archived'
  search?: string
  tags?: string[]
}

interface ProjectStore {
  // State
  projects: ResearchProject[]
  currentProject: ResearchProject | null
  loading: boolean
  error: string | null
  filters: ProjectFilters

  // Actions
  fetchProjects: () => Promise<void>
  createProject: (project: Omit<ResearchProject, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => Promise<ResearchProject>
  updateProject: (id: string, updates: Partial<ResearchProject>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  archiveProject: (id: string) => Promise<void>
  setCurrentProject: (project: ResearchProject | null) => void
  setFilters: (filters: Partial<ProjectFilters>) => void
  clearError: () => void
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      // Initial State
      projects: [],
      currentProject: null,
      loading: false,
      error: null,
      filters: {},

      // Actions
      fetchProjects: async () => {
        try {
          set({ loading: true, error: null })
          // In createProject function (what you're already doing)
          const { data: { user } } = await supabase.auth.getUser()
          if (!user) throw new Error('User not authenticated')

          // Option 1: Let RLS handle user filtering automatically
          const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq("user_id", user.id)
            .order('updated_at', { ascending: false })

          if (error) throw error

          set({ projects: data || [], loading: false })
        } catch (error: any) {
          set({
            error: error.message || 'Failed to fetch projects',
            loading: false
          })
        }
      },

      createProject: async (projectData) => {
        try {
          set({ loading: true, error: null })

          // Get current user
          const { data: { user } } = await supabase.auth.getUser()
          if (!user) throw new Error('User not authenticated')

          const { data, error } = await supabase
            .from('projects')
            .insert({
              ...projectData,
              user_id: user.id,
            })
            .select()
            .single()

          if (error) throw error

          // Add to local state
          set(state => ({
            projects: [data, ...state.projects],
            loading: false
          }))

          return data
        } catch (error: any) {
          set({
            error: error.message || 'Failed to create project',
            loading: false
          })
          throw error
        }
      },

      updateProject: async (id, updates) => {
        try {
          set({ loading: true, error: null })

          const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

          if (error) throw error

          // Update local state
          set(state => ({
            projects: state.projects.map(p => p.id === id ? data : p),
            currentProject: state.currentProject?.id === id ? data : state.currentProject,
            loading: false
          }))
        } catch (error: any) {
          set({
            error: error.message || 'Failed to update project',
            loading: false
          })
          throw error
        }
      },

      deleteProject: async (id) => {
        try {
          set({ loading: true, error: null })

          const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

          if (error) throw error

          // Remove from local state
          set(state => ({
            projects: state.projects.filter(p => p.id !== id),
            currentProject: state.currentProject?.id === id ? null : state.currentProject,
            loading: false
          }))
        } catch (error: any) {
          set({
            error: error.message || 'Failed to delete project',
            loading: false
          })
          throw error
        }
      },

      archiveProject: async (id) => {
        try {
          await get().updateProject(id, { status: 'archived' })
        } catch (error) {
          throw error
        }
      },

      setCurrentProject: (project) => {
        set({ currentProject: project })
      },

      setFilters: (newFilters) => {
        set(state => ({
          filters: { ...state.filters, ...newFilters }
        }))
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'research-platform-projects', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist certain parts of the state
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject,
        filters: state.filters,
        // Don't persist loading and error states
      }),
    }
  )
)