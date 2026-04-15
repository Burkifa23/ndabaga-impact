"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

import { blogPostSchema, type BlogPostFormValues } from "@/lib/blog-schema"
import { upsertBlogPost, deleteBlogPost } from "@/app/actions/manage-blog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image_url: string | null
  status: string
  published_date: string | null
  created_at: string
}

export default function BlogPostsClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    setPosts(initialPosts)
  }, [initialPosts])

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      image_url: "",
      status: "draft",
    },
  })

  const titleValue = form.watch("title")

  useEffect(() => {
    if (titleValue && !editingId) {
      const generatedSlug = titleValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "")
      form.setValue("slug", generatedSlug)
    }
  }, [titleValue, editingId, form])

  const handleOpenNew = () => {
    setEditingId(null)
    form.reset({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "",
      image_url: "",
      status: "draft",
    })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (post: BlogPost) => {
    setEditingId(post.id)
    form.reset({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      image_url: post.image_url || "",
      status: post.status as "draft" | "published",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return
    try {
      const result = await deleteBlogPost(id)
      if (result.success) {
        toast.success("Post deleted successfully")
        setPosts(posts.filter((p) => p.id !== id))
        router.refresh()
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("An unexpected error occurred.")
    }
  }

  const onSubmit = async (data: BlogPostFormValues) => {
    const result = await upsertBlogPost(data)
    if (result.success) {
      toast.success(editingId ? "Post updated successfully!" : "Post created successfully!")
      setIsDialogOpen(false)
      router.refresh()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Blog</h1>
          <p className="text-gray-500">Manage news, impact stories, and program updates.</p>
        </div>
        <Button onClick={handleOpenNew} className="bg-black hover:bg-gray-800 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <Card className="border-none bg-white shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No posts yet. Click "New Post" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      {post.image_url ? (
                        <div className="w-12 h-12 rounded-md border overflow-hidden bg-gray-100">
                          <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-md border bg-gray-100 flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900">{post.title}</div>
                      <div className="text-xs text-gray-500 font-mono mt-0.5">/blog/{post.slug}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50">
                        {post.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          post.status === "published"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-none"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none"
                        }
                      >
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {post.published_date
                        ? format(new Date(post.published_date), "MMM d, yyyy")
                        : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(post)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(post.id, post.title)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 ml-1"
                      >
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
            <DialogTitle>{editingId ? "Edit Post" : "Create New Post"}</DialogTitle>
            <DialogDescription>
              Compose and publish content for the Ndabaga blog.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Youth Digital Summit 2026" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Slug</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-sm">
                              /blog/
                            </span>
                            <Input
                              className="pl-14 font-mono text-sm"
                              placeholder="youth-digital-summit"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>Auto-generated from title.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="News">News</SelectItem>
                            <SelectItem value="Impact Stories">Impact Stories</SelectItem>
                            <SelectItem value="Program Updates">Program Updates</SelectItem>
                            <SelectItem value="Events">Events</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft (Hidden)</SelectItem>
                            <SelectItem value="published">Published (Live)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/cover.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-20"
                        placeholder="A brief summary displayed on the blog listing page."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormDescription>Full article body. Paragraph breaks are preserved.</FormDescription>
                    <FormControl>
                      <Textarea
                        className="min-h-[200px]"
                        placeholder="Write the full article content here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end gap-3 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {editingId ? "Save Changes" : "Publish Post"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
