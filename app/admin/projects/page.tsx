"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"

import { createClient } from "@/lib/supabase/client"
import { projectSchema, type ProjectFormValues } from "@/lib/project-schema"
import { upsertProject, toggleFeaturedProject, deleteProject } from "@/app/actions/projects"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"

export default function AdminProjects() {
  const supabase = createClient()
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      category: "",
      status: "draft",
      image_url: "",
      is_featured: false,
    },
  })

  const titleValue = form.watch("title")

  // Auto-generate slug dynamically only during creation (not editing)
  useEffect(() => {
    if (titleValue && !editingId) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      form.setValue("slug", generatedSlug)
    }
  }, [titleValue, editingId, form])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setProjects(data || [])
    } catch (error: any) {
      toast.error("Failed to load projects: " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleOpenNew = () => {
    setEditingId(null)
    form.reset({
      title: "",
      slug: "",
      description: "",
      content: "",
      category: "",
      status: "draft",
      image_url: "",
      is_featured: false,
    })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (project: any) => {
    setEditingId(project.id)
    form.reset({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      content: project.content || "",
      category: project.category,
      status: project.status,
      image_url: project.image_url || "",
      is_featured: project.is_featured,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return
    
    try {
      const result = await deleteProject(id)
      if (result.success) {
        toast.success("Project deleted successfully")
        setProjects(projects.filter(p => p.id !== id))
      } else {
        toast.error(result.error)
      }
    } catch (e) {
      toast.error("An unexpected error occurred.")
    }
  }

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    // Optimistic UI updates
    setProjects(projects.map(p => p.id === id ? { ...p, is_featured: !currentStatus } : p))
    
    const result = await toggleFeaturedProject(id, !currentStatus)
    if (!result.success) {
      toast.error("Failed to update featured status: " + result.error)
      // Revert optimism
      setProjects(projects.map(p => p.id === id ? { ...p, is_featured: currentStatus } : p))
    } else {
      toast.success(`Project ${!currentStatus ? 'featured' : 'unfeatured'} globally`)
    }
  }

  const onSubmit = async (data: ProjectFormValues) => {
    const result = await upsertProject(data)
    
    if (result.success) {
      toast.success(editingId ? "Project updated successfully!" : "New project launched successfully!")
      setIsDialogOpen(false)
      fetchProjects() // Refresh table cleanly
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Projects</h1>
          <p className="text-gray-500">Manage all internal programs, active modules, and completed initiatives.</p>
        </div>
        <Button onClick={handleOpenNew} className="bg-black hover:bg-gray-800 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm border-none bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-16">Cover</TableHead>
                <TableHead>Title & Slug</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Featured</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : projects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No projects found. Click "New Project" to add one.
                  </TableCell>
                </TableRow>
              ) : (
                projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      {project.image_url ? (
                        <div className="w-12 h-12 rounded-md border overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-md border bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900">{project.title}</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">/{project.slug}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50">{project.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          project.status === 'Published' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : 
                          project.status === 'Archived' ? 'bg-gray-200 text-gray-800 hover:bg-gray-200 border-none' : 
                          'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none'
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      <div className="flex justify-center w-full">
                        <Switch 
                          checked={project.is_featured} 
                          onCheckedChange={() => handleToggleFeatured(project.id, project.is_featured)} 
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(project)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id, project.title)} className="text-red-600 hover:text-red-800 hover:bg-red-50 ml-1">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Project" : "Create New Project"}</DialogTitle>
            <DialogDescription>Define the core metadata and long-form content for this project instance.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Title & Slug Pair */}
                <div className="space-y-6">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl><Input placeholder="Digital Skills Bootcamp 2026" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="slug" render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">/</span>
                          <Input className="pl-6 font-mono text-sm" placeholder="digital-skills-bootcamp" {...field} />
                        </div>
                      </FormControl>
                      <FormDescription>Auto-formats your title dynamically.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Categories & Status Pair */}
                <div className="space-y-6">
                  <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select prefix="category" onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a grouping" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Digital Skills">Digital Skills</SelectItem>
                          <SelectItem value="Leadership">Leadership</SelectItem>
                          <SelectItem value="Agriculture">Agriculture</SelectItem>
                          <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                          <SelectItem value="General">General Initiative</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select prefix="status" onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Lifecycle Phase" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Draft">Draft (Hidden)</SelectItem>
                          <SelectItem value="Published">Published (Active)</SelectItem>
                          <SelectItem value="Archived">Archived (Past)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>

              <FormField control={form.control} name="image_url" render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Image URL (Optional)</FormLabel>
                  <FormControl><Input placeholder="https://example.com/cover.jpg" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl><Textarea className="h-20" placeholder="A brief one-paragraph summary appearing on cards." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem>
                  <FormLabel>Long-Form Content</FormLabel>
                  <FormDescription>Supports formatting variables for detailed multi-paragraph rendering.</FormDescription>
                  <FormControl><Textarea className="min-h-[200px]" placeholder="Full detailed breakdown of the initiative, timeline, and impact..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="is_featured" render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Feature on Homepage</FormLabel>
                    <FormDescription>
                      Displays this project prominently within the global application hero components.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )} />
              
              <div className="pt-4 flex justify-end gap-3 border-t">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={form.formState.isSubmitting} className="bg-black text-white hover:bg-gray-800">
                  {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingId ? "Save Changes" : "Deploy Project"}
                </Button>
              </div>

            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
