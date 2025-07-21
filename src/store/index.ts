import { create } from 'zustand'
import type { User, ResearchProject, Agent, Task, AgentExecution } from '../types'

interface AppState {
  // User state
  user: User | null
  setUser: (user: User | null) => void
  
  // Projects state
  projects: ResearchProject[]
  setProjects: (projects: ResearchProject[]) => void
  currentProject: ResearchProject | null
  setCurrentProject: (project: ResearchProject | null) => void
  
  // Agents state
  agents: Agent[]
  setAgents: (agents: Agent[]) => void
  
  // Tasks state
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  
  // Executions state
  executions: AgentExecution[]
  setExecutions: (executions: AgentExecution[]) => void
  
  // UI state
  loading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  // User state
  user: null,
  setUser: (user) => set({ user }),
  
  // Projects state
  projects: [],
  setProjects: (projects) => set({ projects }),
  currentProject: null,
  setCurrentProject: (currentProject) => set({ currentProject }),
  
  // Agents state
  agents: [],
  setAgents: (agents) => set({ agents }),
  
  // Tasks state
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  
  // Executions state
  executions: [],
  setExecutions: (executions) => set({ executions }),
  
  // UI state
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}))