'use client'

import { useState } from 'react'
import { AdminTable } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { generateSlug } from '@/lib/slug'
import { useAdminExams, useSaveExam, useDeleteExam } from '@/hooks/useAdminExams'
import { toast } from 'sonner'

// Function to generate small format slug
const generateSmallSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/[^\w\-]/g, '')     // Remove all non-word chars except -
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .substring(0, 20)             // Limit to 20 characters for small format
    .replace(/-+$/, '')           // Trim - from end of text
}

interface Exam {
  _id?: string
  name: string
  slug: string
  short_name: string
  image_url: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  is_active: boolean
  display_order: number
  hero_section: {
    title: string
    subtitle: string
    image: string
  }
  overview: {
    title: string
    content: string
    key_highlights: string[]
  }
  registration: {
    title: string
    description: string
    bullet_points: string[]
  }
  exam_pattern: {
    title: string
    description: string
    total_duration_mins: number
    score_range: string
    table_data: {
      section: string
      questions: number
      duration_mins: number
    }[]
  }
  exam_dates: {
    title: string
    important_dates: {
      event: string
      date: Date
    }[]
  },
  result_statistics: {
    title: string
    description: string
    passing_criteria: string
    total_marks: number
    passing_marks: number
  },
  actions?: any // Add actions key for the dropdown column
}

export default function SimpleExamsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<Exam | null>(null)
  const [activeTab, setActiveTab] = useState('basic')

  const [formData, setFormData] = useState<Exam>({
    name: '',
    slug: '',
    short_name: '',
    image_url: '',
    exam_type: 'International',
    conducting_body: '',
    exam_mode: 'Online',
    frequency: 'Monthly',
    description: '',
    is_active: true,
    display_order: 0,
    hero_section: {
      title: '',
      subtitle: '',
      image: ''
    },
    overview: {
      title: 'Overview',
      content: '',
      key_highlights: [] as string[]
    },
    registration: {
      title: 'Registration',
      description: '',
      bullet_points: [] as string[]
    },
    exam_pattern: {
      title: 'Exam Pattern',
      description: '',
      total_duration_mins: 120,
      score_range: '0-100',
      table_data: [] as Array<{section: string, questions: number, duration_mins: number}>
    },
    exam_dates: {
      title: 'Important Dates',
      important_dates: [] as Array<{event: string, date: Date}>
    },
    result_statistics: {
      title: 'Result Statistics',
      description: '',
      passing_criteria: '',
      total_marks: 100,
      passing_marks: 40
    }
  })
  
  // TanStack Query hooks
  const { data: exams = [], isLoading: dataLoading } = useAdminExams()
  const saveExamMutation = useSaveExam()
  const deleteExamMutation = useDeleteExam()


  const handleSaveExam = async () => {
    console.log('=== EXAM DATA ===')
    console.log(JSON.stringify(formData, null, 2))
    
    try {
      const payload = {
        ...formData,
        ...(editingExam && { _id: editingExam._id })
      }
      
      await saveExamMutation.mutateAsync(payload)
      toast.success('Exam saved successfully!')
      setIsModalOpen(false)
      setEditingExam(null)
    } catch (error) {
      console.error('Error saving exam:', error)
      toast.error('Error saving exam: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleAddExam = () => {
    setEditingExam(null)
    setFormData({
      name: '',
      slug: '',
      short_name: '',
      image_url: '',
      exam_type: 'International',
      conducting_body: '',
      exam_mode: 'Online',
      frequency: 'Monthly',
      description: '',
      is_active: true,
      display_order: 0,
      hero_section: {
        title: '',
        subtitle: '',
        image: ''
      },
      overview: {
        title: 'Overview',
        content: '',
        key_highlights: []
      },
      registration: {
        title: 'Registration',
        description: '',
        bullet_points: []
      },
      exam_pattern: {
        title: 'Exam Pattern',
        description: '',
        total_duration_mins: 120,
        score_range: '0-100',
        table_data: [] as Array<{section: string, questions: number, duration_mins: number}>
      },
      exam_dates: {
        title: 'Important Dates',
        important_dates: []
      },
      result_statistics: {
        title: 'Result Statistics',
        description: '',
        passing_criteria: '',
        total_marks: 100,
        passing_marks: 40
      }
    })
    setActiveTab('basic')
    setIsModalOpen(true)
  }

  const basicFields = [
    { name: 'name', label: 'Exam Name', type: 'text' as const, required: true },
    { name: 'slug', label: 'Slug', type: 'text' as const, required: true },
    { name: 'short_name', label: 'Short Name', type: 'text' as const, required: true },
    { name: 'image_url', label: 'Image URL', type: 'text' as const, required: false },
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
    { name: 'conducting_body', label: 'Conducting Body', type: 'text' as const, required: true },
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
    { name: 'description', label: 'Description', type: 'textarea' as const, required: true }
  ]

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
      render: (value: string) => <Badge variant="outline">{value}</Badge>
    },
    {
      key: 'conducting_body' as keyof Exam,
      title: 'Conducting Body'
    },
    {
      key: 'is_active' as keyof Exam,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? "default" : "secondary"}>
          {value ? 'Active' : 'Inactive'}
        </Badge>
      )
    },
    {
      key: 'actions' as keyof Exam,
      title: 'Actions',
      render: (value: any, record: Exam) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setEditingExam(record)
                setFormData({
                  name: record.name,
                  slug: record.slug,
                  short_name: record.short_name,
                  image_url: record.image_url || '',
                  exam_type: record.exam_type,
                  conducting_body: record.conducting_body,
                  exam_mode: record.exam_mode,
                  frequency: record.frequency,
                  description: record.description,
                  is_active: record.is_active,
                  display_order: record.display_order,
                  hero_section: record.hero_section,
                  overview: record.overview,
                  registration: record.registration,
                  exam_pattern: record.exam_pattern,
                  exam_dates: record.exam_dates,
                  result_statistics: record.result_statistics
                })
                setActiveTab('basic')
                setIsModalOpen(true)
              }}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // View functionality - could open a read-only modal or navigate to detail page
                console.log('View exam:', record)
                alert(`Viewing exam: ${record.name}`)
              }}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                if (confirm(`Are you sure you want to delete "${record.name}"?`)) {
                  try {
                    await deleteExamMutation.mutateAsync(record._id!)
                    toast.success('Exam deleted successfully!')
                  } catch (error) {
                    toast.error('Error deleting exam')
                  }
                }
              }}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Simple Exams Management</h2>
        <Button onClick={handleAddExam}>
          <Plus className="h-4 w-4 mr-2" />
          Add Exam
        </Button>
      </div>

      <AdminTable
        data={exams}
        columns={columns}
        loading={false}
      />

      <AdminModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        title="Manage Exam"
        showFooter={false}
        size="xl"
      >
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="registration">Registration</TabsTrigger>
            <TabsTrigger value="pattern">Pattern</TabsTrigger>
            <TabsTrigger value="dates">Dates</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <AdminForm
              fields={basicFields}
              data={formData as unknown as Record<string, unknown>}
              onChange={(name, value) => {
                setFormData(prev => ({ ...prev, [name]: value }))
                // Only auto-generate slug when name changes, using small format
                if (name === 'name') {
                  const slug = generateSmallSlug(value as string)
                  setFormData(prev => ({ ...prev, slug: slug }))
                }
              }}
            />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Hero Title</label>
              <Input
                value={formData.hero_section.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
              <Input
                value={formData.hero_section.subtitle}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, subtitle: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hero Image</label>
              <Input
                value={formData.hero_section.image}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  hero_section: { ...prev.hero_section, image: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Overview Title</label>
              <Input
                value={formData.overview.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Overview Content</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={4}
                value={formData.overview.content}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, content: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Key Highlights</label>
              {formData.overview.key_highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...formData.overview.key_highlights]
                      newHighlights[index] = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        overview: { ...prev.overview, key_highlights: newHighlights }
                      }))
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newHighlights = formData.overview.key_highlights.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        overview: { ...prev.overview, key_highlights: newHighlights }
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  overview: { ...prev.overview, key_highlights: [...prev.overview.key_highlights, ''] }
                }))}
              >
                Add Highlight
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="registration" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Registration Title</label>
              <Input
                value={formData.registration.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Registration Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.registration.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, description: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Bullet Points</label>
              {formData.registration.bullet_points.map((point, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...formData.registration.bullet_points]
                      newPoints[index] = e.target.value
                      setFormData(prev => ({
                        ...prev,
                        registration: { ...prev.registration, bullet_points: newPoints }
                      }))
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newPoints = formData.registration.bullet_points.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        registration: { ...prev.registration, bullet_points: newPoints }
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  registration: { ...prev.registration, bullet_points: [...prev.registration.bullet_points, ''] }
                }))}
              >
                Add Bullet Point
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pattern" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Pattern Title</label>
              <Input
                value={formData.exam_pattern.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Pattern Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.exam_pattern.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, description: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Duration (Minutes)</label>
              <Input
                type="number"
                value={formData.exam_pattern.total_duration_mins}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, total_duration_mins: parseInt(e.target.value) || 120 }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Score Range</label>
              <Input
                value={formData.exam_pattern.score_range}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, score_range: e.target.value }
                }))}
                placeholder="e.g., 0-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Table Data</label>
              {formData.exam_pattern.table_data.map((row, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Section"
                    value={row.section}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, section: e.target.value }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }))
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Questions"
                    value={row.questions}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, questions: parseInt(e.target.value) || 0 }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }))
                    }}
                  />
                  <Input
                    type="number"
                    placeholder="Duration (mins)"
                    value={row.duration_mins}
                    onChange={(e) => {
                      const newTableData = [...formData.exam_pattern.table_data]
                      newTableData[index] = { ...row, duration_mins: parseInt(e.target.value) || 0 }
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }))
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newTableData = formData.exam_pattern.table_data.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        exam_pattern: { ...prev.exam_pattern, table_data: newTableData }
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  exam_pattern: { ...prev.exam_pattern, table_data: [...prev.exam_pattern.table_data, { section: '', questions: 0, duration_mins: 0 }] }
                }))}
              >
                Add Row
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="dates" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Dates Title</label>
              <Input
                value={formData.exam_dates.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  exam_dates: { ...prev.exam_dates, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Important Dates</label>
              {formData.exam_dates.important_dates.map((date, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Event"
                    value={date.event}
                    onChange={(e) => {
                      const newDates = [...formData.exam_dates.important_dates]
                      newDates[index] = { ...date, event: e.target.value }
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }))
                    }}
                  />
                  <Input
                    type="date"
                    value={date.date ? new Date(date.date).toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const newDates = [...formData.exam_dates.important_dates]
                      newDates[index] = { ...date, date: new Date(e.target.value) }
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }))
                    }}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newDates = formData.exam_dates.important_dates.filter((_, i) => i !== index)
                      setFormData(prev => ({
                        ...prev,
                        exam_dates: { ...prev.exam_dates, important_dates: newDates }
                      }))
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  exam_dates: { ...prev.exam_dates, important_dates: [...prev.exam_dates.important_dates, { event: '', date: new Date() }] }
                }))}
              >
                Add Date
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Results Title</label>
              <Input
                value={formData.result_statistics.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, title: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Results Description</label>
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                value={formData.result_statistics.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, description: e.target.value }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Passing Criteria</label>
              <Input
                value={formData.result_statistics.passing_criteria}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, passing_criteria: e.target.value }
                }))}
                placeholder="e.g., 40% or 160/400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Marks</label>
              <Input
                type="number"
                value={formData.result_statistics.total_marks}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, total_marks: parseInt(e.target.value) || 100 }
                }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Passing Marks</label>
              <Input
                type="number"
                value={formData.result_statistics.passing_marks}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  result_statistics: { ...prev.result_statistics, passing_marks: parseInt(e.target.value) || 40 }
                }))}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveExam} disabled={saveExamMutation.isPending}>
            {saveExamMutation.isPending ? 'Saving...' : 'Save Exam'}
          </Button>
        </div>
      </AdminModal>
    </div>
  )
}
