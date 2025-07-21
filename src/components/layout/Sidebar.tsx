import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  FolderOpen, 
  FileText, 
  Search, 
  BookOpen, 
  Lightbulb,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface SidebarProps {
  className?: string
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
}

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FolderOpen,
  },
  {
    title: 'Papers',
    href: '/papers',
    icon: FileText,
  },
  {
    title: 'Search',
    href: '/search',
    icon: Search,
  },
  {
    title: 'Reading',
    href: '/reading',
    icon: BookOpen,
  },
  {
    title: 'Ideas',
    href: '/ideas',
    icon: Lightbulb,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar({ className, collapsed = false, onCollapsedChange }: SidebarProps) {
  const location = useLocation()
  
  const handleToggleCollapsed = () => {
    onCollapsedChange?.(!collapsed)
  }

  return (
    <div
      className={cn(
        'flex flex-col bg-white border-r border-gray-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-900">Research Platform</h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleCollapsed}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  collapsed && 'px-2',
                  isActive && 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                )}
              >
                <Icon className={cn('h-4 w-4', !collapsed && 'mr-2')} />
                {!collapsed && <span>{item.title}</span>}
              </Button>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}