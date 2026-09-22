"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon } from "lucide-react"
import { toast } from "sonner"
import { format } from "date-fns"

import { gallerySchema, type GalleryFormValues } from "@/lib/gallery-schema"
import { upsertGalleryImage, deleteGalleryImage } from "@/app/actions/manage-gallery"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type GalleryImageType = {
  id: string | number
  title: string | null
  category: string | null
  image_url: string
  created_at: string
}

export default function GalleryClient({ initialImages }: { initialImages: GalleryImageType[] }) {
  const router = useRouter()
  const [images, setImages] = useState<GalleryImageType[]>(initialImages)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | number | null>(null)

  useEffect(() => {
    setImages(initialImages)
  }, [initialImages])

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      category: "",
      image_url: "",
    },
  })

  const handleOpenNew = () => {
    setEditingId(null)
    form.reset({
      title: "",
      category: "",
      image_url: "",
    })
    setIsDialogOpen(true)
  }

  const handleOpenEdit = (image: GalleryImageType) => {
    setEditingId(image.id)
    form.reset({
      id: image.id,
      title: image.title || "",
      category: image.category || "",
      image_url: image.image_url,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string | number) => {
    if (!window.confirm("Delete this image? This cannot be undone.")) return
    try {
      const result = await deleteGalleryImage(id)
      if (result.success) {
        toast.success("Image deleted successfully")
        setImages(images.filter((img) => img.id !== id))
        router.refresh()
      } else {
        toast.error(result.error)
      }
    } catch {
      toast.error("An unexpected error occurred.")
    }
  }

  const onSubmit = async (data: GalleryFormValues) => {
    const result = await upsertGalleryImage(data)
    if (result.success) {
      toast.success(editingId ? "Image updated successfully!" : "Image added successfully!")
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gallery</h1>
          <p className="text-gray-500">Manage images displayed in the public gallery.</p>
        </div>
        <Button onClick={handleOpenNew} className="bg-black hover:bg-gray-800 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Image
        </Button>
      </div>

      <Card className="border-none bg-white shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-24">Image</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Added On</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No images yet. Click "Add Image" to upload one.
                  </TableCell>
                </TableRow>
              ) : (
                images.map((img) => (
                  <TableRow key={img.id}>
                    <TableCell>
                      <div className="w-16 h-16 rounded-md border overflow-hidden bg-gray-100">
                        <img src={img.image_url} alt={img.title || "Gallery image"} className="w-full h-full object-cover" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-semibold text-gray-900">{img.title || "Untitled"}</div>
                    </TableCell>
                    <TableCell>
                      {img.category ? (
                        <Badge variant="outline" className="bg-gray-50">{img.category}</Badge>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {img.created_at ? format(new Date(img.created_at), "MMM d, yyyy") : "—"}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(img)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(img.id)}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Image" : "Add Gallery Image"}</DialogTitle>
            <DialogDescription>
              Provide an image URL and optional details.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image.jpg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Community meeting" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Workshops, Field Work" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end gap-3 border-t mt-6">
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
                  {editingId ? "Save Changes" : "Add Image"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
