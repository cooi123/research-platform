import { useEffect, useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CreateProjectDialog } from '@/components/projects/CreateProjectDialog'
import { EditProjectDialog } from '@/components/projects/EditProjectDialog'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { useProjectStore } from '@/store/projects'
import type { ResearchProject } from '@/types'
import { 
  FolderOpen, 
  Search, 
  Filter, 
  AlertCircle,
  Loader2
} from 'lucide-react'

export function Projects() {
  const { 
    projects, 
    loading, 
    error, 
    fetchProjects, 
    deleteProject, 
    archiveProject,
    clearError 
  } = useProjectStore()

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [editingProject, setEditingProject] = useState<ResearchProject | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Filter projects based on search and status
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [projects, searchTerm, statusFilter])

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      try {
        await deleteProject(id)
      } catch (error) {
        // Error handled by store
      }
    }
  }

  const handleArchiveProject = async (id: string) => {
    try {
      await archiveProject(id)
    } catch (error) {
      // Error handled by store
    }
  }

  const handleEditProject = (project: ResearchProject) => {
    setEditingProject(project)
    setEditDialogOpen(true)
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">Organize your research into projects</p>
        </div>
        <CreateProjectDialog />
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button variant="ghost" size="sm" onClick={clearError}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading projects...</span>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {projects.length === 0 ? 'No projects yet' : 'No projects found'}
          </h3>
          <p className="text-gray-600 mb-4">
            {projects.length === 0 
              ? 'Create your first research project to get started.'
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
          {projects.length === 0 && <CreateProjectDialog />}
        </div>
      )}

      {/* Projects Grid */}
      {!loading && filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onArchive={handleArchiveProject}
              onDelete={handleDeleteProject}
            />
          ))}
        </div>
      )}

      {/* Edit Project Dialog */}
      <EditProjectDialog
        project={editingProject}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  )
}