'use client'

import React, { useState, useMemo } from 'react'
import { AdminTable, createEditAction, createDeleteAction, createViewAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, FileText, Search, Eye } from 'lucide-react'
import { generateSlug } from '@/lib/slug'
import { useAdminBlogs, useSaveBlog, useDeleteBlog } from '@/hooks/useAdminBlogs'
import { toast } from 'sonner'

export interface Blog {
  _id: string
  title: string
  slug: string
  category: string
  tags: string[]
  content: string
  image: string
  related_exams: string[]
  is_active: boolean
  createdAt: string
  updatedAt: string
}

export default function BlogsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  
  // TanStack Query hooks
  const { data: blogs = [], isLoading: dataLoading } = useAdminBlogs()
  const saveBlogMutation = useSaveBlog()
  const deleteBlogMutation = useDeleteBlog()
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    tags: [] as string[],
    content: '',
    image: '',
    related_exams: [] as string[],
    is_active: true
  })


  // Filter blogs based on search, category, and status using useMemo
  const filteredBlogs = useMemo(() => {
    let filtered = blogs

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => blog.category === selectedCategory)
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(blog => blog.is_active === (selectedStatus === 'published'))
    }

    if (searchTerm) {
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [blogs, searchTerm, selectedCategory, selectedStatus])

  const columns = [
    {
      key: 'title' as keyof Blog,
      title: 'Title',
      render: (value: string, record: Blog) => (
        <div className="max-w-md">
          <div className="font-medium text-gray-900 line-clamp-1">{value}</div>
          <div className="text-sm text-gray-500">{record.category}</div>
        </div>
      )
    },
    {
      key: 'tags' as keyof Blog,
      title: 'Tags',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {value.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 3}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'is_active' as keyof Blog,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'published' : 'draft'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof Blog,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createViewAction((blog: Blog) => {
      // In a real app, this would open a view modal or navigate to view page
      alert(`View blog: ${blog.title}`)
    }),
    createEditAction((blog: Blog) => {
      setEditingBlog(blog)
      setFormData({
        title: blog.title,
        slug: blog.slug,
        category: blog.category,
        tags: blog.tags,
        content: blog.content,
        image: blog.image || '',
        related_exams: blog.related_exams,
        is_active: blog.is_active
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((blog: Blog) => {
      setBlogToDelete(blog)
      setDeleteModalOpen(true)
    })
  ]

  // Hardcoded educational categories for college and education-related blogs
  const educationalCategories = [
    'College Admissions',
    'Study Abroad', 
    'Exam Preparation',
    'Scholarships & Financial Aid',
    'Career Guidance',
    'University Reviews',
    'Course Selection',
    'Student Life',
    'Education News',
    'Application Tips'
  ]

  const formFields = [
    {
      name: 'title',
      label: 'Blog Title',
      type: 'text' as const,
      placeholder: 'Enter blog title',
      required: true
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      placeholder: 'blog-slug',
      required: true
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select' as const,
      options: [
        { value: 'select-category', label: 'Select a category' },
        ...educationalCategories.map(cat => ({ value: cat, label: cat }))
      ],
      required: true
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'tags' as const,
      placeholder: 'Add tags',
      description: 'Add relevant tags for better categorization'
    },
    {
      name: 'related_exams',
      label: 'Related Exams',
      type: 'tags' as const,
      placeholder: 'Add related exams',
      description: 'Add exams related to this blog post'
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea' as const,
      placeholder: 'Write your blog content here...',
      required: true,
      description: 'Supports rich text formatting (in production)'
    },
    {
      name: 'image',
      label: 'Image URL',
      type: 'text' as const,
      placeholder: 'Enter image URL',
      description: 'Add an image URL for your blog post'
    },
  ]

  const handleAddBlog = () => {
    setEditingBlog(null)
    setFormData({
      title: '',
      slug: '',
      category: '',
      tags: [],
      content: '',
      image: '',
      related_exams: [],
      is_active: true
    })
    setIsModalOpen(true)
  }

  const handleSaveBlog = async () => {
    try {
      const payload = {
        ...formData,
        ...(editingBlog && { _id: editingBlog._id })
      }
      
      await saveBlogMutation.mutateAsync(payload)
      toast.success(editingBlog ? 'Blog post updated successfully!' : 'Blog post created successfully!')
      setIsModalOpen(false)
      setEditingBlog(null)
    } catch (error) {
      console.error('Error saving blog:', error)
      toast.error('Error saving blog: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleDeleteBlog = async () => {
    if (!blogToDelete) return
    
    try {
      await deleteBlogMutation.mutateAsync(blogToDelete._id)
      toast.success('Blog post deleted successfully!')
      setDeleteModalOpen(false)
      setBlogToDelete(null)
    } catch (error) {
      console.error('Error deleting blog:', error)
      toast.error('Error deleting blog')
    }
  }

  return (
    <div>
    <div className="space-y-6">
      {/* Filters and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Blog Posts</h2>
            <p className="text-sm text-gray-500">
              {filteredBlogs.length} of {blogs.length} posts
            </p>
          </div>
          <Button onClick={handleAddBlog} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Blog Post</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {educationalCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-48">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Blogs Table */}
        <AdminTable
          data={filteredBlogs}
          columns={columns}
          actions={actions}
          loading={dataLoading}
          emptyMessage="No blog posts found. Create your first blog post to get started."
        />

        {/* Add/Edit Modal */}
        <AdminModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
          description={editingBlog ? 'Update blog post information' : 'Create a new blog post'}
          onConfirm={handleSaveBlog}
          loading={saveBlogMutation.isPending}
          size="xl"
        >
          <AdminForm
            fields={formFields}
            data={formData}
            onChange={(field, value) => {
              setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                // Auto-generate slug when title changes and slug is empty or being edited for the first time
                ...(field === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title)) ? {
                  slug: generateSlug(value as string)
                } : {})
              }))
            }}
            loading={saveBlogMutation.isPending}
          />
        </AdminModal>

        {/* Delete Confirmation Modal */}
        <AdminModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          title="Delete Blog Post"
          description={`Are you sure you want to delete "${blogToDelete?.title}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteBlog}
          loading={deleteBlogMutation.isPending}
          size="sm"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            <span>{blogToDelete?.title}</span>
          </div>
        </AdminModal>
      </div>
    </div>
  )
}
