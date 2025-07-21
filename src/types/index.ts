import type { AcademicLevel } from './database'

import type { Project } from './database'

import type { Profile } from './database'

// Re-export database types for consistency
export type {
  Database,
  Profile,
  Project,
  Paper,
  PaperEmbedding,
  ProjectPaper,
  Agent,
  Task,
  AgentExecution,
  GeneratedContent,
  UserPreference,
  ResearchHistory,
  SharedContent,
  Note,
  ProfileInsert,
  ProjectInsert,
  PaperInsert,
  PaperEmbeddingInsert,
  ProjectPaperInsert,
  AgentInsert,
  TaskInsert,
  AgentExecutionInsert,
  GeneratedContentInsert,
  UserPreferenceInsert,
  ResearchHistoryInsert,
  SharedContentInsert,
  NoteInsert,
  ProfileUpdate,
  ProjectUpdate,
  PaperUpdate,
  PaperEmbeddingUpdate,
  ProjectPaperUpdate,
  AgentUpdate,
  TaskUpdate,
  AgentExecutionUpdate,
  GeneratedContentUpdate,
  UserPreferenceUpdate,
  ResearchHistoryUpdate,
  SharedContentUpdate,
  NoteUpdate,
  AcademicLevel,
  ProjectStatus,
  AgentType,
  AgentStatus,
  TaskStatus,
  ExecutionStatus,
  ContentType,
  ActionType,
  EntityType,
  SharedContentType,
  Permission,
  NoteEntityType,
} from './database'

// Application-specific types that extend database types
export interface UserProfile extends Profile { }

export interface ResearchProject extends Project {
  // Add computed properties if needed
  user_id: string // Ensure this matches the database schema
}

// Authentication types
export interface AuthState {
  user: UserProfile | null
  session: any | null
  loading: boolean
  error: string | null
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name: string
  academic_level: AcademicLevel
  research_interests?: string[]
}

// Legacy User interface for backward compatibility
export interface User {
  id: string
  email: string
  name: string
  role: 'researcher' | 'admin'
  created_at: string
  updated_at: string
}