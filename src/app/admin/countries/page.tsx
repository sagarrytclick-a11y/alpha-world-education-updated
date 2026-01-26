'use client'

import React, { useState, useEffect } from 'react'
import { AdminTable, createEditAction, createDeleteAction } from '@/components/admin/AdminTable'
import { AdminModal } from '@/components/admin/AdminModal'
import { AdminForm } from '@/components/admin/AdminForm'
import { Button } from '@/components/ui/button'
import { Plus, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { generateSlug } from '@/lib/slug'

export interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  meta_title: string
  meta_description: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null)
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    flag: '',
    description: '',
    meta_title: '',
    meta_description: '',
    is_active: true
  })

  // Fetch countries from API
  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      setDataLoading(true)
      const response = await fetch('/api/admin/countries')
      const result = await response.json()
      
      if (result.success) {
        setCountries(result.data)
      } else {
        console.error('Failed to fetch countries:', result.message)
      }
    } catch (error) {
      console.error('Error fetching countries:', error)
    } finally {
      setDataLoading(false)
    }
  }

  const columns = [
    {
      key: 'name' as keyof Country,
      title: 'Country Name',
      render: (value: string, record: Country) => (
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{record.flag}</span>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'slug' as keyof Country,
      title: 'Slug'
    },
    {
      key: 'is_active' as keyof Country,
      title: 'Status',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'secondary'}>
          {value ? 'active' : 'inactive'}
        </Badge>
      )
    },
    {
      key: 'createdAt' as keyof Country,
      title: 'Created',
      render: (value: string) => {
        const date = new Date(value)
        return date.toLocaleDateString('en-US')
      }
    }
  ]

  const actions = [
    createEditAction((country: Country) => {
      setEditingCountry(country)
      setFormData({
        name: country.name,
        slug: country.slug,
        flag: country.flag,
        description: country.description,
        meta_title: country.meta_title,
        meta_description: country.meta_description,
        is_active: country.is_active
      })
      setIsModalOpen(true)
    }),
    createDeleteAction((country: Country) => {
      setCountryToDelete(country)
      setDeleteModalOpen(true)
    })
  ]

  const formFields = [
    {
      name: 'name',
      label: 'Country Name',
      type: 'text' as const,
      placeholder: 'Enter country name',
      required: true
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text' as const,
      placeholder: 'country-slug',
      required: true
    },
    {
      name: 'flag',
      label: 'Flag Emoji',
      type: 'text' as const,
      placeholder: '🇺🇸',
      description: 'Enter the flag emoji (e.g., 🇺🇸, 🇬🇧, 🇨🇦)'
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      placeholder: 'Enter country description',
      required: true
    },
    {
      name: 'meta_title',
      label: 'Meta Title',
      type: 'text' as const,
      placeholder: 'Meta title for SEO'
    },
    {
      name: 'meta_description',
      label: 'Meta Description',
      type: 'textarea' as const,
      placeholder: 'Meta description for SEO'
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

  const handleAddCountry = () => {
    setEditingCountry(null)
    setFormData({
      name: '',
      slug: '',
      flag: '',
      description: '',
      meta_title: '',
      meta_description: '',
      is_active: true
    })
    setIsModalOpen(true)
  }

  const handleSaveCountry = async () => {
    setLoading(true)
    
    try {
      const url = editingCountry ? `/api/admin/countries/${editingCountry._id}` : '/api/admin/countries'
      const method = editingCountry ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchCountries() // Refresh data
        setIsModalOpen(false)
      } else {
        console.error('Failed to save country:', result.message)
        alert('Failed to save country: ' + result.message)
      }
    } catch (error) {
      console.error('Error saving country:', error)
      alert('Error saving country')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCountry = async () => {
    if (!countryToDelete) return
    
    setLoading(true)
    
    try {
      const response = await fetch(`/api/admin/countries/${countryToDelete._id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      
      if (result.success) {
        await fetchCountries() // Refresh data
        setDeleteModalOpen(false)
        setCountryToDelete(null)
      } else {
        console.error('Failed to delete country:', result.message)
        alert('Failed to delete country: ' + result.message)
      }
    } catch (error) {
      console.error('Error deleting country:', error)
      alert('Error deleting country')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
    <div className="space-y-6">
      {/* Header with Add button */}
      <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Countries</h2>
            <p className="text-sm text-gray-500">
              {countries.length} countries total
            </p>
          </div>
          <Button onClick={handleAddCountry} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Country</span>
          </Button>
        </div>

        {/* Countries Table */}
        <AdminTable
          data={countries}
          columns={columns}
          actions={actions}
          loading={dataLoading}
          emptyMessage="No countries found. Add your first country to get started."
        />

        {/* Add/Edit Modal */}
        <AdminModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          title={editingCountry ? 'Edit Country' : 'Add New Country'}
          description={editingCountry ? 'Update country information' : 'Add a new country to the system'}
          onConfirm={handleSaveCountry}
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
          title="Delete Country"
          description={`Are you sure you want to delete "${countryToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteCountry}
          loading={loading}
          size="sm"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Globe className="h-4 w-4" />
            <span>{countryToDelete?.name}</span>
          </div>
        </AdminModal>
      </div>
    </div>
  )
}
