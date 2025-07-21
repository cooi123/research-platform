import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { useProjectStore } from '@/store/projects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    FolderOpen,
    FileText,
    Search,
    BookOpen,
    Lightbulb,
    TrendingUp,
    Clock,
    Star
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
    const { user } = useAuthStore()
    const { projects, fetchProjects } = useProjectStore()

    // Fetch projects on component mount
    useEffect(() => {
        fetchProjects()
    }, [fetchProjects])

    const quickActions = [
        {
            title: 'Create Project',
            description: 'Start a new research project',
            icon: FolderOpen,
            href: '/projects',
            color: 'bg-blue-50 text-blue-600',
        },
        {
            title: 'Search Papers',
            description: 'Find relevant research papers',
            icon: Search,
            href: '/search',
            color: 'bg-green-50 text-green-600',
        },
        {
            title: 'Generate Ideas',
            description: 'Get AI-powered research ideas',
            icon: Lightbulb,
            href: '/ideas',
            color: 'bg-yellow-50 text-yellow-600',
        },
        {
            title: 'Reading List',
            description: 'Continue reading saved papers',
            icon: BookOpen,
            href: '/reading',
            color: 'bg-purple-50 text-purple-600',
        },
    ]

    // Calculate real stats from project data
    const activeProjects = projects.filter(p => p.status === 'active').length
    const completedProjects = projects.filter(p => p.status === 'completed').length

    const stats = [
        {
            title: 'Projects',
            value: projects.length.toString(),
            icon: FolderOpen,
            change: `${activeProjects} active`,
        },
        {
            title: 'Papers Read',
            value: '0', // Placeholder until papers are implemented
            icon: FileText,
            change: 'Coming soon',
        },
        {
            title: 'Ideas Generated',
            value: '0', // Placeholder until ideas are implemented
            icon: Lightbulb,
            change: 'Coming soon',
        },
        {
            title: 'Completed',
            value: completedProjects.toString(),
            icon: Clock,
            change: 'projects finished',
        },
    ]

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {user?.name || 'Researcher'}!
                </h2>
                <p className="text-blue-100 mb-4">
                    Ready to advance your research? Here's what you can do today.
                </p>
                <div className="flex gap-3">
                    <Button variant="secondary" asChild>
                        <Link to="/search">
                            <Search className="mr-2 h-4 w-4" />
                            Search Papers
                        </Link>
                    </Button>
                    <Button variant="secondary" asChild>
                        <Link to="/ideas">
                            <Lightbulb className="mr-2 h-4 w-4" />
                            Generate Ideas
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <Card key={stat.title}>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                                    </div>
                                    <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <Icon className="h-6 w-6 text-gray-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-4 gap-6">
                    {quickActions.map((action) => {
                        const Icon = action.icon
                        return (
                            <Card key={action.title} className="hover:shadow-md transition-shadow cursor-pointer">
                                <Link to={action.href}>
                                    <CardContent className="p-6">
                                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${action.color}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                                        <p className="text-sm text-gray-600">{action.description}</p>
                                    </CardContent>
                                </Link>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Recent Activity
                        </CardTitle>
                        <CardDescription>Your latest research activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium">Added paper to "Machine Learning" project</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium">Generated 3 new research ideas</p>
                                    <p className="text-xs text-gray-500">1 day ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm font-medium">Completed reading "Neural Networks in NLP"</p>
                                    <p className="text-xs text-gray-500">2 days ago</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Trending Topics
                        </CardTitle>
                        <CardDescription>Popular research areas this week</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { topic: 'Large Language Models', papers: 156 },
                                { topic: 'Computer Vision', papers: 89 },
                                { topic: 'Reinforcement Learning', papers: 67 },
                                { topic: 'Quantum Computing', papers: 45 },
                                { topic: 'Bioinformatics', papers: 34 },
                            ].map((item) => (
                                <div key={item.topic} className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{item.topic}</span>
                                    <span className="text-xs text-gray-500">{item.papers} papers</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}