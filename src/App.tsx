import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { queryClient } from './lib/queryClient'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { AuthWrapper } from './components/auth/AuthWrapper'
import { UserProfile } from './components/auth/UserProfile'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Dashboard } from './pages/Dashboard'
import { Projects } from './pages/Projects'
import { Papers } from './pages/Papers'
import './App.css'

// Placeholder components for routes that aren't implemented yet
function SearchPage() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Search</h2>
      <p className="text-gray-600">Search functionality coming soon...</p>
    </div>
  )
}

function ReadingPage() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Reading</h2>
      <p className="text-gray-600">Reading interface coming soon...</p>
    </div>
  )
}

function IdeasPage() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Research Ideas</h2>
      <p className="text-gray-600">AI-powered idea generation coming soon...</p>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
      <p className="text-gray-600">App settings coming soon...</p>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/auth"
              element={<AuthWrapper />}
            />
            
            {/* Protected Dashboard Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute fallback={<Navigate to="/auth" replace />}>
                  <DashboardLayout title="Dashboard">
                    <Dashboard />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/projects"
              element={
                <ProtectedRoute fallback={<Navigate to="/auth" replace />}>
                  <DashboardLayout title="Projects">
                    <Projects />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/papers"
              element={
                <ProtectedRoute fallback={<Navigate to="/auth" replace />}>
                  <DashboardLayout title="Papers">
                    <Papers />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/search"
              element={
                <ProtectedRoute fallback={<Navigate to="/auth" replace />}>
                  <DashboardLayout title="Search">
                    <SearchPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/reading"
              element={
                <ProtectedRoute fallback={<Navigate to="/auth" replace />}>
                  <DashboardLayout title="Reading">
                    <ReadingPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/ideas"
              element={
                <ProtectedRoute fallback={<Navigate to="/auth" replace />}>
                  <DashboardLayout title="Research Ideas">
                    <IdeasPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/settings"
              element={
                <ProtectedRoute fallback={<Navigate to="/auth" replace />}>
                  <DashboardLayout title="Settings">
                    <SettingsPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            
            {/* Profile Route (separate layout) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute fallback={<Navigate to="/auth" replace />}>
                  <div className="min-h-screen bg-gray-50 py-12">
                    <UserProfile />
                  </div>
                </ProtectedRoute>
              }
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
