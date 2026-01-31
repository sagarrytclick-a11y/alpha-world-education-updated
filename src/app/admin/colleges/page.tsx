'use client'

import React, { useState, useMemo } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { ComprehensiveCollegeForm } from '@/components/admin/ComprehensiveCollegeForm'
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
import { Plus, GraduationCap, Search, Filter } from 'lucide-react'
import { dummyCountries } from '@/data/dummyData'
import { generateSlug } from '@/lib/slug'
import { useAdminColleges, useAdminCountries, useSaveCollege, useDeleteCollege } from '@/hooks/useAdminColleges'
import { toast } from 'sonner'

interface AdminCountry {
  _id: string
  name: string
  slug: string
  flag: string
}

export interface College {
  _id: string
  name: string
  slug: string
  country_ref: AdminCountry | string
  exams: string[]
  fees?: number
  duration?: string
  establishment_year?: string
  ranking?: string | {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  banner_url?: string
  about_content?: string
  is_active: boolean
  createdAt: string
  updatedAt: string
  
  // Comprehensive structure fields
  overview?: {
    title: string
    description: string
  }
  key_highlights?: {
    title: string
    description: string
    features: string[]
  }
  why_choose_us?: {
    title: string
    description: string
    features: { title: string; description: string }[]
  }
  ranking_section?: {
    title: string
    description: string
    country_ranking: string
    world_ranking: string
    accreditation: string[]
  }
  admission_process?: {
    title: string
    description: string
    steps: string[]
  }
  documents_required?: {
    title: string
    description: string
    documents: string[]
  }
  fees_structure?: {
    title: string
    description: string
    courses: { course_name: string; duration: string; annual_tuition_fee: string }[]
  }
  campus_highlights?: {
    title: string
    description: string
    highlights: string[]
  }
}

export default function CollegesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [collegeToDelete, setCollegeToDelete] = useState<College | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  
  // TanStack Query hooks
  const { data: colleges = [], isLoading: dataLoading, error: collegesError } = useAdminColleges()
  const { data: countries = dummyCountries } = useAdminCountries()
  const saveCollegeMutation = useSaveCollege()
  const deleteCollegeMutation = useDeleteCollege()
  
  const [formData, setFormData] = useState({
    // Basic Info
    name: '',
    slug: '',
    country_ref: '',
    exams: [] as string[],
    banner_url: '',
    is_active: true,

    // Overview
    overview_title: 'Overview',
    overview_description: '',

    // Key Highlights
    key_highlights_title: 'Key Highlights',
    key_highlights_description: '',
    key_highlights_features: [] as string[],

    // Why Choose Us
    why_choose_us_title: 'Why Choose Us',
    why_choose_us_description: '',
    why_choose_us_features: [] as { title: string; description: string }[],

    // Ranking & Recognition
    ranking_title: 'Ranking & Recognition',
    ranking_description: '',
    country_ranking: '',
    world_ranking: '',
    accreditation: [] as string[],

    // Admission Process
    admission_process_title: 'Admission Process',
    admission_process_description: '',
    admission_process_steps: [] as string[],

    // Documents Required
    documents_required_title: 'Documents Required',
    documents_required_description: '',
    documents_required_documents: [] as string[],

    // Fees Structure
    fees_structure_title: 'Fees Structure',
    fees_structure_description: '',
    fees_structure_courses: [] as { course_name: string; duration: string; annual_tuition_fee: string }[],

    // Campus Highlights
    campus_highlights_title: 'Campus Highlights',
    campus_highlights_description: '',
    campus_highlights_highlights: [] as string[],
  })

  // Filter colleges based on search and country using useMemo
  const filteredColleges = useMemo(() => {
    let filtered = colleges

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(college => {
        if (!college.country_ref) return false
        const countrySlug = typeof college.country_ref === 'string' 
          ? college.country_ref 
          : college.country_ref.slug
        return countrySlug === selectedCountry
      })
    }

    if (searchTerm) {
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [colleges, searchTerm, selectedCountry])

  const columns = [
    {
      key: 'name',
      title: 'College Name',
      render: (value: string, record: College) => {
        const countryName = !record.country_ref 
          ? 'No country'
          : typeof record.country_ref === 'string' 
            ? record.country_ref 
            : record.country_ref.name || 'Unknown country'
        
        return (
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-gray-500">{countryName}</div>
          </div>
        )
      }
    },
    {
      key: 'exams',
      title: 'Exams',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value?.slice(0, 2).map((exam, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {exam}
            </Badge>
          ))}
          {value?.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'fees',
      title: 'Fees',
      render: (value: number, record: College) => {
        if (record.fees_structure && record.fees_structure.courses.length > 0) {
          return record.fees_structure.courses[0].annual_tuition_fee || 'N/A'
        }
        return value ? `$${value.toLocaleString()}/year` : 'N/A'
      }
    },
    {
      key: 'duration',
      title: 'Duration',
      render: (value: string, record: College) => {
        if (record.fees_structure && record.fees_structure.courses.length > 0) {
          return record.fees_structure.courses[0].duration || 'N/A'
        }
        return value || 'N/A'
      }
    },
    {
      key: 'banner_url',
      title: 'Banner',
      render: (value: string) => {
        if (!value) return 'N/A'
        return (
          <a 
            href={value} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            View Banner
          </a>
        )
      }
    },
    {
      key: 'establishment_year',
      title: 'Est. Year',
      render: (value: string) => value || '-'
    },
    {
      key: 'ranking',
      title: 'Ranking',
      render: (value: string) => {
        if (!value || value === 'N/A' || value === 'n/a') return value || '-'
        
        // Check if it's a simple string that's not JSON
        if (typeof value === 'string' && !value.startsWith('{') && !value.startsWith('[')) {
          return value
        }
        
        try {
          const rankingData = typeof value === 'string' ? JSON.parse(value.trim()) : value
          
          return (
            <div className="space-y-1">
              {rankingData.country_ranking && (
                <div className="text-sm">
                  <span className="text-gray-500">Country:</span> #{rankingData.country_ranking}
                </div>
              )}
              {rankingData.world_ranking && (
                <div className="text-sm">
                  <span className="text-gray-500">World:</span> #{rankingData.world_ranking}
                </div>
              )}
              {rankingData.accreditation && rankingData.accreditation.length > 0 && (
                <div className="text-xs text-gray-400">
                  {rankingData.accreditation.length} accreditation(s)
                </div>
              )}
            </div>
          )
        } catch (error) {
          console.error('Error parsing ranking data:', error)
          return <span className="text-xs text-gray-400">Invalid data</span>
        }
      }
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createEditAction((college: College) => {
      console.log('🔍 DEBUG: Loading college for edit:', college)
      console.log('🔍 DEBUG: college.ranking type:', typeof college.ranking)
      console.log('🔍 DEBUG: college.ranking value:', college.ranking)
      
      setEditingCollege(college)
      
      // Properly extract all existing data when editing
      const extractedRanking = typeof college.ranking === 'object' && college.ranking !== null 
        ? college.ranking 
        : {
            title: 'Ranking & Recognition',
            description: '',
            country_ranking: college.ranking || '',
            world_ranking: '',
            accreditation: []
          }
      
      const extractedFeesStructure = college.fees_structure || {
        title: "Fees Structure",
        description: "",
        courses: college.fees ? [{
          course_name: "Program",
          duration: college.duration || "N/A",
          annual_tuition_fee: `$${college.fees.toLocaleString()}`
        }] : []
      }
      
      // Initialize form with ALL existing college data
      setFormData({
        // Basic Info
        name: college.name || '',
        slug: college.slug || '',
        country_ref: !college.country_ref 
          ? ''
          : typeof college.country_ref === 'string' 
            ? college.country_ref 
            : college.country_ref.slug || '',
        exams: college.exams || [],
        banner_url: college.banner_url || '',
        is_active: college.is_active ?? true,

        // Overview - load existing data
        overview_title: college.overview?.title || 'Overview',
        overview_description: college.overview?.description || college.about_content || '',

        // Key Highlights - load existing data
        key_highlights_title: college.key_highlights?.title || 'Key Highlights',
        key_highlights_description: college.key_highlights?.description || '',
        key_highlights_features: college.key_highlights?.features || [],

        // Why Choose Us - load existing data
        why_choose_us_title: college.why_choose_us?.title || 'Why Choose Us',
        why_choose_us_description: college.why_choose_us?.description || '',
        why_choose_us_features: college.why_choose_us?.features || [],

        // Ranking & Recognition - load existing data
        ranking_title: extractedRanking.title || 'Ranking & Recognition',
        ranking_description: extractedRanking.description || '',
        country_ranking: extractedRanking.country_ranking || '',
        world_ranking: extractedRanking.world_ranking || '',
        accreditation: extractedRanking.accreditation || [],

        // Admission Process - load existing data
        admission_process_title: college.admission_process?.title || 'Admission Process',
        admission_process_description: college.admission_process?.description || '',
        admission_process_steps: college.admission_process?.steps || [],

        // Documents Required - load existing data
        documents_required_title: college.documents_required?.title || 'Documents Required',
        documents_required_description: college.documents_required?.description || '',
        documents_required_documents: college.documents_required?.documents || [],

        // Fees Structure - load existing data
        fees_structure_title: extractedFeesStructure.title || 'Fees Structure',
        fees_structure_description: extractedFeesStructure.description || '',
        fees_structure_courses: extractedFeesStructure.courses || [],

        // Campus Highlights - load existing data
        campus_highlights_title: college.campus_highlights?.title || 'Campus Highlights',
        campus_highlights_description: college.campus_highlights?.description || '',
        campus_highlights_highlights: college.campus_highlights?.highlights || [],
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((college: College) => {
      setCollegeToDelete(college)
      setDeleteModalOpen(true)
    })
  ]

  const handleAddCollege = () => {
    setEditingCollege(null)
    setFormData({
      // Basic Info
      name: '',
      slug: '',
      country_ref: '',
      exams: [] as string[],
      banner_url: '',
      is_active: true,

      // Overview
      overview_title: 'Overview',
      overview_description: '',

      // Key Highlights
      key_highlights_title: 'Key Highlights',
      key_highlights_description: '',
      key_highlights_features: [] as string[],

      // Why Choose Us
      why_choose_us_title: 'Why Choose Us',
      why_choose_us_description: '',
      why_choose_us_features: [] as { title: string; description: string }[],

      // Ranking & Recognition
      ranking_title: 'Ranking & Recognition',
      ranking_description: '',
      country_ranking: '',
      world_ranking: '',
      accreditation: [] as string[],

      // Admission Process
      admission_process_title: 'Admission Process',
      admission_process_description: '',
      admission_process_steps: [] as string[],

      // Documents Required
      documents_required_title: 'Documents Required',
      documents_required_description: '',
      documents_required_documents: [] as string[],

      // Fees Structure
      fees_structure_title: 'Fees Structure',
      fees_structure_description: '',
      fees_structure_courses: [] as { course_name: string; duration: string; annual_tuition_fee: string }[],

      // Campus Highlights
      campus_highlights_title: 'Campus Highlights',
      campus_highlights_description: '',
      campus_highlights_highlights: [] as string[],
    })
    setIsModalOpen(true)
  }

  const handleSaveCollege = async () => {
    try {
      console.log('🚀 Starting college save process...')
      console.log('📝 Form data:', formData)
      
      // Comprehensive validation
      const validationErrors: string[] = []
      
      // Basic Info Validation
      if (!formData.name?.trim()) validationErrors.push('College name is required')
      if (!formData.slug?.trim()) validationErrors.push('College slug is required')
      if (!formData.country_ref || formData.country_ref === 'select-country') validationErrors.push('Please select a valid country')
      
      // Overview Validation
      if (!formData.overview_description?.trim()) validationErrors.push('Overview description is required')
      
      // Key Highlights Validation
      if (!formData.key_highlights_description?.trim()) validationErrors.push('Key highlights description is required')
      if (!formData.key_highlights_features?.length) validationErrors.push('At least one key highlight feature is required')
      
      // Why Choose Us Validation
      if (!formData.why_choose_us_description?.trim()) validationErrors.push('Why choose us description is required')
      if (!formData.why_choose_us_features?.length) validationErrors.push('At least one why choose us feature is required')
      
      // Ranking Validation
      if (!formData.ranking_description?.trim()) validationErrors.push('Ranking description is required')
      if (!formData.country_ranking?.trim() && !formData.world_ranking?.trim()) {
        validationErrors.push('At least country ranking or world ranking is required')
      }
      
      // Admission Process Validation
      if (!formData.admission_process_description?.trim()) validationErrors.push('Admission process description is required')
      if (!formData.admission_process_steps?.length) validationErrors.push('At least one admission step is required')
      
      // Documents Required Validation
      if (!formData.documents_required_description?.trim()) validationErrors.push('Documents required description is required')
      if (!formData.documents_required_documents?.length) validationErrors.push('At least one required document is needed')
      
      // Fees Structure Validation
      if (!formData.fees_structure_description?.trim()) validationErrors.push('Fees structure description is required')
      if (!formData.fees_structure_courses?.length) validationErrors.push('At least one course with fees is required')
      
      // Campus Highlights Validation
      if (!formData.campus_highlights_description?.trim()) validationErrors.push('Campus highlights description is required')
      if (!formData.campus_highlights_highlights?.length) validationErrors.push('At least one campus highlight is required')
      
      // Exams Validation
      if (!formData.exams?.length) validationErrors.push('At least one required exam is needed')
      
      // Banner URL Validation (optional but if provided, should be valid)
      if (formData.banner_url?.trim()) {
        try {
          new URL(formData.banner_url)
        } catch {
          validationErrors.push('Banner URL must be a valid URL')
        }
      }
      
      if (validationErrors.length > 0) {
        toast.error(`Please complete the following required fields:\n\n${validationErrors.map((error, index) => `${index + 1}. ${error}`).join('\n')}`)
        return
      }

      const payload = {
        name: formData.name,
        slug: formData.slug,
        country_ref: formData.country_ref,
        exams: formData.exams,
        banner_url: formData.banner_url,
        is_active: formData.is_active,

        // Comprehensive structure
        overview: {
          title: formData.overview_title,
          description: formData.overview_description
        },
        key_highlights: {
          title: formData.key_highlights_title,
          description: formData.key_highlights_description,
          features: formData.key_highlights_features
        },
        why_choose_us: {
          title: formData.why_choose_us_title,
          description: formData.why_choose_us_description,
          features: formData.why_choose_us_features
        },
        ranking: {
          title: formData.ranking_title,
          description: formData.ranking_description,
          country_ranking: formData.country_ranking,
          world_ranking: formData.world_ranking,
          accreditation: formData.accreditation
        },
        
        // Debug ranking data
        ranking_debug: {
          country_ranking_type: typeof formData.country_ranking,
          country_ranking_value: formData.country_ranking,
          world_ranking_type: typeof formData.world_ranking,
          world_ranking_value: formData.world_ranking,
          accreditation_type: typeof formData.accreditation,
          accreditation_value: formData.accreditation
        },
        admission_process: {
          title: formData.admission_process_title,
          description: formData.admission_process_description,
          steps: formData.admission_process_steps
        },
        documents_required: {
          title: formData.documents_required_title,
          description: formData.documents_required_description,
          documents: formData.documents_required_documents
        },
        fees_structure: {
          title: formData.fees_structure_title,
          description: formData.fees_structure_description,
          courses: formData.fees_structure_courses
        },
        campus_highlights: {
          title: formData.campus_highlights_title,
          description: formData.campus_highlights_description,
          highlights: formData.campus_highlights_highlights
        },

        // Legacy fields for backward compatibility
        about_content: formData.overview_description,
        
        // Include ID for editing
        ...(editingCollege && { _id: editingCollege._id })
      }
      
      console.log('📦 Request payload:', payload)
      console.log('🔍 DEBUG: Ranking object being sent:', payload.ranking)
      console.log('🔍 DEBUG: Ranking field types:', {
        country_ranking: typeof payload.ranking.country_ranking,
        world_ranking: typeof payload.ranking.world_ranking,
        accreditation: typeof payload.ranking.accreditation
      })
      
      await saveCollegeMutation.mutateAsync(payload)
      
      toast.success(editingCollege ? 'College updated successfully!' : 'College created successfully!')
      setIsModalOpen(false)
      setEditingCollege(null)
      
    } catch (error) {
      console.error('❌ Error saving college:', error)
      console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack available')
      toast.error('Error saving college: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleDeleteCollege = async () => {
    if (!collegeToDelete) return
    
    try {
      await deleteCollegeMutation.mutateAsync(collegeToDelete._id)
      toast.success('College deleted successfully!')
      setDeleteModalOpen(false)
      setCollegeToDelete(null)
    } catch (error) {
      console.error('Error deleting college:', error)
      toast.error('Error deleting college')
    }
  }

  return (
    <div>
    <div className="space-y-6">
      {/* Filters and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Colleges</h2>
            <p className="text-sm text-gray-500">
              {filteredColleges.length} of {colleges.length} colleges
            </p>
          </div>
          <Button onClick={handleAddCollege} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add College</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by college name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="w-full sm:w-48">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {dummyCountries.map((country) => (
                  <SelectItem key={country.id} value={country.slug}>
                    {country.flag} {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Colleges Table */}
        <AdminTable
          data={filteredColleges}
          columns={columns}
          actions={actions}
          loading={dataLoading}
          emptyMessage="No colleges found. Add your first college to get started."
        />

        {/* Add/Edit Modal */}
        <AdminModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={editingCollege ? 'Edit College' : 'Add New College'}
          description={editingCollege ? 'Update college information' : 'Add a new college to the system'}
          onConfirm={handleSaveCollege}
          loading={saveCollegeMutation.isPending}
          size="xl"
        >
          <ComprehensiveCollegeForm
            data={formData}
            countries={countries.map((c, index) => ({ 
              ...c, 
              _id: (c as any)._id || (c as any).id || `country-${index}` 
            }))}
            onChange={(field: string, value: any) => {
              setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                // Auto-generate slug when name changes and slug is empty or being edited for the first time
                ...(field === 'name' && (!prev.slug || prev.slug === generateSlug(prev.name)) ? {
                  slug: generateSlug(value as string)
                } : {})
              }))
            }}
            loading={saveCollegeMutation.isPending}
          />
        </AdminModal>

        {/* Delete Confirmation Modal */}
        <AdminModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          title="Delete College"
          description={`Are you sure you want to delete "${collegeToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteCollege}
          loading={deleteCollegeMutation.isPending}
          size="sm"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <GraduationCap className="h-4 w-4" />
            <span>{collegeToDelete?.name}</span>
          </div>
        </AdminModal>
      </div>
    </div>
  )
}
