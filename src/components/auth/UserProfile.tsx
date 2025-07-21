import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useAuthStore } from '@/store/auth'
import { AlertCircle, Loader2, User, Save } from 'lucide-react'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  academic_level: z.enum(['undergraduate', 'graduate', 'phd', 'professor', 'researcher']).optional(),
  research_interests: z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

const academicLevelOptions = [
  { value: 'undergraduate', label: 'Undergraduate Student' },
  { value: 'graduate', label: 'Graduate Student' },
  { value: 'phd', label: 'PhD Student' },
  { value: 'professor', label: 'Professor' },
  { value: 'researcher', label: 'Researcher' },
] as const

export function UserProfile() {
  const { user, updateProfile, loading, error, clearError } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      academic_level: user?.academic_level || undefined,
      research_interests: user?.research_interests?.join(', ') || '',
    },
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true)
      setSuccessMessage(null)
      clearError()
      
      const updateData: any = {}
      
      if (data.name !== undefined) updateData.name = data.name
      if (data.academic_level !== undefined) updateData.academic_level = data.academic_level
      if (data.research_interests !== undefined) {
        updateData.research_interests = data.research_interests
          .split(',')
          .map(interest => interest.trim())
          .filter(interest => interest.length > 0)
      }
      
      await updateProfile(updateData)
      setSuccessMessage('Profile updated successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      // Error is handled by the store
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <User className="h-6 w-6" />
          User Profile
        </CardTitle>
        <CardDescription>
          Manage your profile information and research preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {successMessage && (
          <Alert className="mb-4">
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground">Email</div>
          <div className="font-medium">{user.email}</div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      disabled={isSubmitting || loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="academic_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting || loading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your academic level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {academicLevelOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="research_interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Interests</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your research interests (comma-separated)"
                      {...field}
                      disabled={isSubmitting || loading}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm text-muted-foreground">
                    Separate multiple interests with commas (e.g., Machine Learning, Natural Language Processing, Computer Vision)
                  </div>
                </FormItem>
              )}
            />
            
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating profile...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Update Profile
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}