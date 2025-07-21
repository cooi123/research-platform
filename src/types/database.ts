// Database interface types that match the Supabase schema exactly

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          academic_level: 'undergraduate' | 'graduate' | 'phd' | 'professor' | 'researcher' | null
          research_interests: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          academic_level?: 'undergraduate' | 'graduate' | 'phd' | 'professor' | 'researcher' | null
          research_interests?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          academic_level?: 'undergraduate' | 'graduate' | 'phd' | 'professor' | 'researcher' | null
          research_interests?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          user_id: string
          status: 'draft' | 'active' | 'completed' | 'archived'
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          user_id: string
          status?: 'draft' | 'active' | 'completed' | 'archived'
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          user_id?: string
          status?: 'draft' | 'active' | 'completed' | 'archived'
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      papers: {
        Row: {
          id: string
          title: string
          abstract: string | null
          authors: Json | null
          doi: string | null
          url: string | null
          publication_date: string | null
          journal: string | null
          citation_count: number
          credibility_score: number | null
          added_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          abstract?: string | null
          authors?: Json | null
          doi?: string | null
          url?: string | null
          publication_date?: string | null
          journal?: string | null
          citation_count?: number
          credibility_score?: number | null
          added_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          abstract?: string | null
          authors?: Json | null
          doi?: string | null
          url?: string | null
          publication_date?: string | null
          journal?: string | null
          citation_count?: number
          credibility_score?: number | null
          added_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "papers_added_by_fkey"
            columns: ["added_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      paper_embeddings: {
        Row: {
          id: string
          paper_id: string | null
          embedding: string | null // vector type
          created_at: string
        }
        Insert: {
          id?: string
          paper_id?: string | null
          embedding?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          paper_id?: string | null
          embedding?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "paper_embeddings_paper_id_fkey"
            columns: ["paper_id"]
            isOneToOne: false
            referencedRelation: "papers"
            referencedColumns: ["id"]
          }
        ]
      }
      project_papers: {
        Row: {
          id: string
          project_id: string | null
          paper_id: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id?: string | null
          paper_id?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string | null
          paper_id?: string | null
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_papers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_papers_paper_id_fkey"
            columns: ["paper_id"]
            isOneToOne: false
            referencedRelation: "papers"
            referencedColumns: ["id"]
          }
        ]
      }
      agents: {
        Row: {
          id: string
          name: string
          description: string | null
          type: 'research_ideas' | 'paper_analysis' | 'content_generation' | 'search_rag' | null
          config: Json | null
          status: 'idle' | 'running' | 'error' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type?: 'research_ideas' | 'paper_analysis' | 'content_generation' | 'search_rag' | null
          config?: Json | null
          status?: 'idle' | 'running' | 'error' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: 'research_ideas' | 'paper_analysis' | 'content_generation' | 'search_rag' | null
          config?: Json | null
          status?: 'idle' | 'running' | 'error' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          agent_id: string | null
          project_id: string | null
          user_id: string | null
          status: 'pending' | 'in_progress' | 'completed' | 'failed'
          progress: number
          result: Json | null
          error_message: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          agent_id?: string | null
          project_id?: string | null
          user_id?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'failed'
          progress?: number
          result?: Json | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          agent_id?: string | null
          project_id?: string | null
          user_id?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'failed'
          progress?: number
          result?: Json | null
          error_message?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      agent_executions: {
        Row: {
          id: string
          agent_id: string | null
          task_id: string | null
          status: 'queued' | 'running' | 'completed' | 'failed'
          progress: number
          logs: Json
          result: Json | null
          error: string | null
          started_at: string | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          agent_id?: string | null
          task_id?: string | null
          status?: 'queued' | 'running' | 'completed' | 'failed'
          progress?: number
          logs?: Json
          result?: Json | null
          error?: string | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          agent_id?: string | null
          task_id?: string | null
          status?: 'queued' | 'running' | 'completed' | 'failed'
          progress?: number
          logs?: Json
          result?: Json | null
          error?: string | null
          started_at?: string | null
          completed_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_executions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_executions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          }
        ]
      }
      generated_content: {
        Row: {
          id: string
          paper_id: string | null
          project_id: string | null
          user_id: string | null
          type: 'summary' | 'podcast' | 'infographic' | 'video_script' | null
          content: Json | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          paper_id?: string | null
          project_id?: string | null
          user_id?: string | null
          type?: 'summary' | 'podcast' | 'infographic' | 'video_script' | null
          content?: Json | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          paper_id?: string | null
          project_id?: string | null
          user_id?: string | null
          type?: 'summary' | 'podcast' | 'infographic' | 'video_script' | null
          content?: Json | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "generated_content_paper_id_fkey"
            columns: ["paper_id"]
            isOneToOne: false
            referencedRelation: "papers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_content_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_content_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          preference_key: string
          preference_value: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          preference_key: string
          preference_value?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          preference_key?: string
          preference_value?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      research_history: {
        Row: {
          id: string
          user_id: string
          action_type: 'search' | 'paper_view' | 'paper_add' | 'summary_generate' | 'content_transform'
          entity_type: 'paper' | 'project' | 'search_query' | 'content'
          entity_id: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action_type: 'search' | 'paper_view' | 'paper_add' | 'summary_generate' | 'content_transform'
          entity_type: 'paper' | 'project' | 'search_query' | 'content'
          entity_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action_type?: 'search' | 'paper_view' | 'paper_add' | 'summary_generate' | 'content_transform'
          entity_type?: 'paper' | 'project' | 'search_query' | 'content'
          entity_id?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "research_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shared_content: {
        Row: {
          id: string
          content_type: 'project' | 'paper' | 'summary' | 'generated_content'
          content_id: string
          shared_by: string
          shared_with: string | null
          share_token: string | null
          permissions: 'view' | 'comment' | 'edit'
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          content_type: 'project' | 'paper' | 'summary' | 'generated_content'
          content_id: string
          shared_by: string
          shared_with?: string | null
          share_token?: string | null
          permissions?: 'view' | 'comment' | 'edit'
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          content_type?: 'project' | 'paper' | 'summary' | 'generated_content'
          content_id?: string
          shared_by?: string
          shared_with?: string | null
          share_token?: string | null
          permissions?: 'view' | 'comment' | 'edit'
          expires_at?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shared_content_shared_by_fkey"
            columns: ["shared_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shared_content_shared_with_fkey"
            columns: ["shared_with"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notes: {
        Row: {
          id: string
          user_id: string
          entity_type: 'paper' | 'project' | 'generated_content'
          entity_id: string
          title: string | null
          content: string
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          entity_type: 'paper' | 'project' | 'generated_content'
          entity_id: string
          title?: string | null
          content: string
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          entity_type?: 'paper' | 'project' | 'generated_content'
          entity_id?: string
          title?: string | null
          content?: string
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_papers: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          id: string
          paper_id: string
          similarity: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Type helpers for easier usage
export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"])
  ? (Database["public"]["Tables"])[PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

// Specific table type exports for convenience
export type Profile = Tables<'profiles'>
export type Project = Tables<'projects'>
export type Paper = Tables<'papers'>
export type PaperEmbedding = Tables<'paper_embeddings'>
export type ProjectPaper = Tables<'project_papers'>
export type Agent = Tables<'agents'>
export type Task = Tables<'tasks'>
export type AgentExecution = Tables<'agent_executions'>
export type GeneratedContent = Tables<'generated_content'>
export type UserPreference = Tables<'user_preferences'>
export type ResearchHistory = Tables<'research_history'>
export type SharedContent = Tables<'shared_content'>
export type Note = Tables<'notes'>

// Insert types
export type ProfileInsert = TablesInsert<'profiles'>
export type ProjectInsert = TablesInsert<'projects'>
export type PaperInsert = TablesInsert<'papers'>
export type PaperEmbeddingInsert = TablesInsert<'paper_embeddings'>
export type ProjectPaperInsert = TablesInsert<'project_papers'>
export type AgentInsert = TablesInsert<'agents'>
export type TaskInsert = TablesInsert<'tasks'>
export type AgentExecutionInsert = TablesInsert<'agent_executions'>
export type GeneratedContentInsert = TablesInsert<'generated_content'>
export type UserPreferenceInsert = TablesInsert<'user_preferences'>
export type ResearchHistoryInsert = TablesInsert<'research_history'>
export type SharedContentInsert = TablesInsert<'shared_content'>
export type NoteInsert = TablesInsert<'notes'>

// Update types
export type ProfileUpdate = TablesUpdate<'profiles'>
export type ProjectUpdate = TablesUpdate<'projects'>
export type PaperUpdate = TablesUpdate<'papers'>
export type PaperEmbeddingUpdate = TablesUpdate<'paper_embeddings'>
export type ProjectPaperUpdate = TablesUpdate<'project_papers'>
export type AgentUpdate = TablesUpdate<'agents'>
export type TaskUpdate = TablesUpdate<'tasks'>
export type AgentExecutionUpdate = TablesUpdate<'agent_executions'>
export type GeneratedContentUpdate = TablesUpdate<'generated_content'>
export type UserPreferenceUpdate = TablesUpdate<'user_preferences'>
export type ResearchHistoryUpdate = TablesUpdate<'research_history'>
export type SharedContentUpdate = TablesUpdate<'shared_content'>
export type NoteUpdate = TablesUpdate<'notes'>

// Enum types for better type safety
export type AcademicLevel = 'undergraduate' | 'graduate' | 'phd' | 'professor' | 'researcher'
export type ProjectStatus = 'draft' | 'active' | 'completed' | 'archived'
export type AgentType = 'research_ideas' | 'paper_analysis' | 'content_generation' | 'search_rag'
export type AgentStatus = 'idle' | 'running' | 'error' | 'completed'
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed'
export type ExecutionStatus = 'queued' | 'running' | 'completed' | 'failed'
export type ContentType = 'summary' | 'podcast' | 'infographic' | 'video_script'
export type ActionType = 'search' | 'paper_view' | 'paper_add' | 'summary_generate' | 'content_transform'
export type EntityType = 'paper' | 'project' | 'search_query' | 'content'
export type SharedContentType = 'project' | 'paper' | 'summary' | 'generated_content'
export type Permission = 'view' | 'comment' | 'edit'
export type NoteEntityType = 'paper' | 'project' | 'generated_content'