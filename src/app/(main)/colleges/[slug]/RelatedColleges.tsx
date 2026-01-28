'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCountryName } from "@/lib/normalize"

import { Button } from '@/components/ui/button'
import {
  MapPin,
  DollarSign,
  Clock,
  GraduationCap,
  ArrowRight
} from 'lucide-react'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
  exams: string[]
  fees: number
  duration: string
  establishment_year?: string
  ranking?: string
  banner_url?: string
  about_content: string
  is_active: boolean
  createdAt: string
  updatedAt: string
}

interface RelatedCollegesProps {
  currentCollegeSlug: string
}

export default function RelatedColleges({ currentCollegeSlug }: RelatedCollegesProps) {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRelatedColleges()
  }, [currentCollegeSlug])

  const fetchRelatedColleges = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/colleges/${currentCollegeSlug}/related`)
      const result = await response.json()

      if (result.success) {
        setColleges(result.data)
      } else {
        console.error('Failed to fetch related colleges:', result.message)
      }
    } catch (error) {
      console.error('Error fetching related colleges:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg"></div>
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
                <div className="h-8 bg-gray-200 rounded flex-1"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Related Colleges Found</h3>
        <p className="text-gray-600 mb-4">Check out all colleges for more options</p>
        <Link href="/colleges">
          <Button variant="outline">
            View All Colleges
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {colleges.map((college) => {
        const country = college.country_ref
        const countryName = getCountryName(college.country_ref)

        const countryFlag = typeof country === 'object' ? country.flag : ''

        return (
          <Card key={college._id} className="group hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden rounded-t-lg">
              {college.banner_url ? (
                <img
                  src={college.banner_url}
                  alt={college.name}

                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <GraduationCap className="w-12 h-12 text-blue-600" />
                </div>
              )}

              <div className="absolute top-3 left-3">
                <Badge className="bg-white/90 text-gray-800 border border-gray-200">
                  {countryFlag} {countryName}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                {college.name}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                  <span>${college.fees.toLocaleString()}/year</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{college.duration}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/colleges/${college.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
