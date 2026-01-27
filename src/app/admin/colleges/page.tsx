'use client'

import React, { useState, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
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
import { Plus, GraduationCap, Search, Filter } from 'lucide-react'
import { dummyCountries } from '@/data/dummyData'
import { generateSlug } from '@/lib/slug'

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
  fees: number
  duration: string
  establishment_year?: string
  ranking?: string
  banner_url: string
  about_content: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [filteredColleges, setFilteredColleges] = useState<College[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCollege, setEditingCollege] = useState<College | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [collegeToDelete, setCollegeToDelete] = useState<College | null>(null)
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    country: '',
    exams: [] as string[],
    fees: '',
    duration: '',
    establishment_year: '',
    ranking: '',
    banner_url: '',
    about: '',
    is_active: true
  })
  const [countries, setCountries] = useState(dummyCountries)

  // Fetch colleges and countries from API
  useEffect(() => {
    fetchColleges()
    fetchCountries()
  }, [])

  const fetchColleges = async () => {
    try {
      setDataLoading(true)
      const response = await fetch('/api/admin/colleges')
      const result = await response.json()
      
      if (result.success) {
        setColleges(result.data)
        setFilteredColleges(result.data)
      } else {
        console.error('Failed to fetch colleges:', result.message)
      }
    } catch (error) {
      console.error('Error fetching colleges:', error)
    } finally {
      setDataLoading(false)
    }
  }

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/admin/countries')
      const result = await response.json()
      
      if (result.success) {
        setCountries(result.data)
      } else {
        console.error('Failed to fetch countries:', result.message)
      }
    } catch (error) {
      console.error('Error fetching countries:', error)
    }
  }

  // Filter colleges based on search and country
  React.useEffect(() => {
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

    setFilteredColleges(filtered)
  }, [colleges, searchTerm, selectedCountry])

  const columns = [
    {
      key: 'name' as keyof College,
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
      key: 'exams' as keyof College,
      title: 'Exams',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value.slice(0, 2).map((exam, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {exam}
            </Badge>
          ))}
          {value.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 2}
            </Badge>
          )}
        </div>
      )
    },
    {
      key: 'fees' as keyof College,
      title: 'Fees',
      render: (value: number) => (
        <div className="font-medium">
          ${value.toLocaleString()}/year
        </div>
      )
    },
    {
      key: 'duration' as keyof College,
      title: 'Duration'
    },
    {
      key: 'establishment_year' as keyof College,
      title: 'Est. Year',
      render: (value: string) => value || '-'
    },
    {
      key: 'ranking' as keyof College,
      title: 'Ranking',
      render: (value: string) => value || '-'
    },
    {
      key: 'is_active' as keyof College,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof College,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createEditAction((college: College) => {
      setEditingCollege(college)
      setFormData({
        name: college.name,
        slug: college.slug,
        country: !college.country_ref 
          ? ''
          : typeof college.country_ref === 'string' 
            ? college.country_ref 
            : college.country_ref.slug || '',
        exams: college.exams,
        fees: college.fees.toString(),
        duration: college.duration,
        establishment_year: college.establishment_year || '',
        ranking: college.ranking || '',
        banner_url: college.banner_url || '',
        about: college.about_content,
        is_active: college.is_active
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((college: College) => {
      setCollegeToDelete(college)
      setDeleteModalOpen(true)
    })
  ]

  const formFields = [
    {
      name: 'name',
      label: 'College Name',
      type: 'text' as const,
      placeholder: 'Enter college name',
      required: true
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      placeholder: 'college-slug',
      required: true
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select' as const,
      options: [
        { value: 'select-country', label: 'Select a country' },
        ...countries.map(country => ({
          value: country.slug,
          label: country.name
        }))
      ],
      required: true
    },
    {
      name: 'exams',
      label: 'Required Exams',
      type: 'tags' as const,
      placeholder: 'Add exam requirements',
      description: 'Add exams like SAT, TOEFL, IELTS, etc.'
    },
    {
      name: 'fees',
      label: 'Annual Fees (USD)',
      type: 'number' as const,
      placeholder: '50000',
      required: true
    },
    {
      name: 'duration',
      label: 'Duration',
      type: 'text' as const,
      placeholder: '4 years',
      required: true
    },
    {
      name: 'establishment_year',
      label: 'Establishment Year',
      type: 'text' as const,
      placeholder: 'e.g., 1850, 1995'
    },
    {
      name: 'ranking',
      label: 'College Ranking',
      type: 'text' as const,
      placeholder: 'e.g., 150th nationally, 500th globally'
    },
    {
      name: 'banner_url',
      label: 'Cover Image URL',
      type: 'text' as const,
      placeholder: 'https://example.com/cover-image.jpg',
      description: 'Enter college cover image URL'
    },
    {
      name: 'about',
      label: 'About College',
      type: 'textarea' as const,
      placeholder: 'Enter college description',
      required: true
    },
  ]

  const handleAddCollege = () => {
    setEditingCollege(null)
    setFormData({
      name: '',
      slug: '',
      country: '',
      exams: [],
      fees: '',
      duration: '',
      establishment_year: '',
      ranking: '',
      banner_url: '',
      about: '',
      is_active: true
    })
    setIsModalOpen(true)
  }

  const handleSaveCollege = async () => {
    setLoading(true)
    
    try {
      console.log('🚀 Starting college save process...')
      console.log('📝 Form data:', formData)
      console.log('🔍 Required fields check:')
      console.log('- name:', formData.name)
      console.log('- slug:', formData.slug)
      console.log('- country:', formData.country)
      console.log('- fees:', formData.fees)
      console.log('- duration:', formData.duration)
      console.log('- about:', formData.about)
      console.log('- exams:', formData.exams)
      console.log('🌍 Available countries:', countries.map(c => ({ name: c.name, slug: c.slug })))
      
      // Validate country selection
      if (formData.country === 'select-country' || !formData.country) {
        alert('Please select a valid country')
        setLoading(false)
        return
      }

      const isEditing = editingCollege !== null
      const url = isEditing 
        ? `/api/admin/colleges/${editingCollege._id}` 
        : '/api/admin/colleges'
      const method = isEditing ? 'PUT' : 'POST'
      
      console.log('🌐 API URL:', url)
      console.log('🔧 HTTP Method:', method)
      
      const payload = {
        name: formData.name,
        slug: formData.slug,
        country_ref: formData.country,
        exams: formData.exams,
        fees: parseInt(formData.fees),
        duration: formData.duration,
        establishment_year: formData.establishment_year,
        ranking: formData.ranking,
        banner_url: formData.banner_url,
        about_content: formData.about,
        is_active: formData.is_active
      }
      
      console.log('📦 Request payload:', payload)
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        console.error('❌ API Error:', result)
        
        // Handle specific country not found error
        if (result.message === 'Country not found' && result.availableCountries) {
          const countryList = result.availableCountries.map((c: { flag: string; name: string; slug: string }) => `${c.flag} ${c.name} (${c.slug})`).join('\n')
          alert(`Country not found! Available countries:\n\n${countryList}\n\nPlease select a valid country from the dropdown.`)
        } else {
          alert(`Error: ${result.message || 'Failed to save college'}`)
        }
        return
      }
      
      console.log('✅ Success:', result)
      
      await fetchColleges()
      setIsModalOpen(false)
      setEditingCollege(null)
      
    } catch (error) {
      console.error('❌ Error saving college:', error)
      console.error('💥 Error stack:', error instanceof Error ? error.stack : 'No stack available')
      alert('Error saving college: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCollege = async () => {
    if (!collegeToDelete) return
    
    setLoading(true)
    
    try {
      const response = await fetch(`/api/admin/colleges/${collegeToDelete._id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchColleges() // Refresh data
        setDeleteModalOpen(false)
        setCollegeToDelete(null)
      } else {
        console.error('Failed to delete college:', result.message)
        alert('Failed to delete college: ' + result.message)
      }
    } catch (error) {
      console.error('Error deleting college:', error)
      alert('Error deleting college')
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
          loading={loading}
          size="xl"
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
          title="Delete College"
          description={`Are you sure you want to delete "${collegeToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteCollege}
          loading={loading}
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
