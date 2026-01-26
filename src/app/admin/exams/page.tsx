'use client'

import React, { useState, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Plus, FileText, Search } from 'lucide-react'
import { generateSlug } from '@/lib/slug'

export interface Exam {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  applicable_countries: string[]
  is_active: boolean
  display_order: number
  createdAt: string
  updatedAt: string
}


export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [filteredExams, setFilteredExams] = useState<Exam[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [examToDelete, setExamToDelete] = useState<Exam | null>(null)
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_name: '',
    exam_type: 'International',
    conducting_body: '',
    exam_mode: 'Online',
    frequency: 'Monthly',
    description: '',
    applicable_countries: [] as string[],
    is_active: true,
    display_order: 0
  })

  // Fetch exams from API
  useEffect(() => {
    fetchExams()
  }, [])

  const fetchExams = async () => {
    try {
      setDataLoading(true)
      const response = await fetch('/api/admin/exams')
      const result = await response.json()
      
      if (result.success) {
        setExams(result.data)
        setFilteredExams(result.data)
      } else {
        console.error('Failed to fetch exams:', result.message)
      }
    } catch (error) {
      console.error('Error fetching exams:', error)
    } finally {
      setDataLoading(false)
    }
  }

  // Filter exams based on search and type
  React.useEffect(() => {
    let filtered = exams

    if (selectedType !== 'all') {
      filtered = filtered.filter(exam => exam.exam_type === selectedType)
    }

    if (searchTerm) {
      filtered = filtered.filter(exam => 
        exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.short_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredExams(filtered)
  }, [exams, searchTerm, selectedType])

  const columns = [
    {
      key: 'name' as keyof Exam,
      title: 'Exam Name',
      render: (value: string, record: Exam) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{record.short_name}</div>
        </div>
      )
    },
    {
      key: 'exam_type' as keyof Exam,
      title: 'Type',
      render: (value: string) => (
        <Badge variant={
          value === 'academic' ? 'default' : 
          value === 'language' ? 'secondary' : 
          'outline'
        }>
          {value}
        </Badge>
      )
    },
    {
      key: 'exam_mode' as keyof Exam,
      title: 'Mode'
    },
    {
      key: 'is_active' as keyof Exam,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof Exam,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createEditAction((exam: Exam) => {
      setEditingExam(exam)
      setFormData({
        name: exam.name,
        slug: exam.slug,
        short_name: exam.short_name,
        exam_type: exam.exam_type,
        conducting_body: exam.conducting_body,
        exam_mode: exam.exam_mode,
        frequency: exam.frequency,
        description: exam.description,
        applicable_countries: exam.applicable_countries,
        is_active: exam.is_active,
        display_order: exam.display_order
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((exam: Exam) => {
      setExamToDelete(exam)
      setDeleteModalOpen(true)
    })
  ]

  const formFields = [
    {
      name: 'name',
      label: 'Exam Name',
      type: 'text' as const,
      placeholder: 'Enter exam name',
      required: true
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      placeholder: 'exam-slug',
      required: true
    },
    {
      name: 'short_name',
      label: 'Short Name',
      type: 'text' as const,
      placeholder: 'e.g., TOEFL, IELTS, SAT',
      required: true
    },
    {
      name: 'exam_type',
      label: 'Exam Type',
      type: 'select' as const,
      options: [
        { value: 'National', label: 'National' },
        { value: 'State', label: 'State' },
        { value: 'University', label: 'University' },
        { value: 'International', label: 'International' }
      ],
      required: true
    },
    {
      name: 'conducting_body',
      label: 'Conducting Body',
      type: 'text' as const,
      placeholder: 'Enter conducting body',
      required: true
    },
    {
      name: 'exam_mode',
      label: 'Exam Mode',
      type: 'select' as const,
      options: [
        { value: 'Online', label: 'Online' },
        { value: 'Offline', label: 'Offline' },
        { value: 'Hybrid', label: 'Hybrid' }
      ],
      required: true
    },
    {
      name: 'frequency',
      label: 'Frequency',
      type: 'select' as const,
      options: [
        { value: 'Once a year', label: 'Once a year' },
        { value: 'Twice a year', label: 'Twice a year' },
        { value: 'Quarterly', label: 'Quarterly' },
        { value: 'Monthly', label: 'Monthly' }
      ],
      required: true
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter exam description',
      required: true
    },
    {
      name: 'is_active',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'true', label: 'Active' },
        { value: 'false', label: 'Inactive' }
      ],
      required: true
    }
  ]

  const handleAddExam = () => {
    setEditingExam(null)
    setFormData({
      name: '',
      slug: '',
      short_name: '',
      exam_type: 'International',
      conducting_body: '',
      exam_mode: 'Online',
      frequency: 'Monthly',
      description: '',
      applicable_countries: [],
      is_active: true,
      display_order: 0
    })
    setIsModalOpen(true)
  }

  const handleSaveExam = async () => {
    setLoading(true)
    
    try {
      const url = editingExam ? `/api/admin/exams/${editingExam._id}` : '/api/admin/exams'
      const method = editingExam ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchExams() // Refresh data
        setIsModalOpen(false)
      } else {
        console.error('Failed to save exam:', result.message)
        alert('Failed to save exam: ' + result.message)
      }
    } catch (error) {
      console.error('Error saving exam:', error)
      alert('Error saving exam')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteExam = async () => {
    if (!examToDelete) return
    
    setLoading(true)
    
    try {
      const response = await fetch(`/api/admin/exams/${examToDelete._id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchExams() // Refresh data
        setDeleteModalOpen(false)
        setExamToDelete(null)
      } else {
        console.error('Failed to delete exam:', result.message)
        alert('Failed to delete exam: ' + result.message)
      }
    } catch (error) {
      console.error('Error deleting exam:', error)
      alert('Error deleting exam')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="space-y-6">
        {/* Filters and Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Exams</h2>
            <p className="text-sm text-gray-500">
              {filteredExams.length} of {exams.length} exams
            </p>
          </div>
          <Button onClick={handleAddExam} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Exam</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by exam name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="academic">Academic</option>
              <option value="language">Language</option>
              <option value="professional">Professional</option>
            </select>
          </div>
        </div>

        {/* Exams Table */}
        <AdminTable
          data={filteredExams}
          columns={columns}
          actions={actions}
          loading={dataLoading}
          emptyMessage="No exams found. Add your first exam to get started."
        />

        {/* Add/Edit Modal */}
        <AdminModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={editingExam ? 'Edit Exam' : 'Add New Exam'}
          description={editingExam ? 'Update exam information' : 'Add a new exam to the system'}
          onConfirm={handleSaveExam}
          loading={loading}
          size="lg"
        >
          <AdminForm
            fields={formFields}
            data={formData}
            onChange={(field, value) => {
              setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                // Auto-generate slug when name changes and slug is empty or being edited for the first time
                ...(field === 'name' && (!prev.slug || prev.slug === generateSlug(prev.name)) ? {
                  slug: generateSlug(value as string)
                } : {})
              }))
            }}
            loading={loading}
          />
        </AdminModal>

        {/* Delete Confirmation Modal */}
        <AdminModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          title="Delete Exam"
          description={`Are you sure you want to delete "${examToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteExam}
          loading={loading}
          size="sm"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FileText className="h-4 w-4" />
            <span>{examToDelete?.name}</span>
          </div>
        </AdminModal>
      </div>
    </div>
  )
}
