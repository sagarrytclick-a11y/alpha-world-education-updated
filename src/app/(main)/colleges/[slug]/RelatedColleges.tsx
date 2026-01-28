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
  ArrowRight,
  Award
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
          <Card key={college._id} className="group border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all duration-300 py-0">
            <div className="relative h-56 overflow-hidden">
              {college.banner_url ? (
                <img
                  src={college.banner_url}
                  alt={college.name}

                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                  <GraduationCap className="w-16 h-16 text-white/80" />
                </div>
              )}

              <div className="absolute top-3 left-3">
                <Badge className="bg-white/90 text-gray-800 border border-gray-200">
              
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/95 backdrop-blur-sm text-gray-800 border border-gray-200 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  {countryFlag} {countryName}
                </Badge>
              </div>
              
              {college.ranking && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-500 text-white border-none px-3 py-1.5 rounded-full text-sm font-black shadow-lg">
                    <Award className="w-3 h-3 mr-1" />
                    #{college.ranking}
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-8">
              <h3 className="text-xl font-black text-gray-900 mb-3 line-clamp-2 leading-tight">
                {college.name}
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center mr-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-sm">${college.fees ? college.fees.toLocaleString() : 'N/A'}/year</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm">{college.duration || 'N/A'} years </span>
                  </div>
                </div>
              </div>

              {college.exams && college.exams.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">Required Exams</div>
                  <div className="flex flex-wrap gap-2">
                    {college.exams.slice(0, 3).map((exam, index) => (
                      <Badge key={index} className="bg-slate-50 text-slate-700 border border-slate-200 px-3 py-1 rounded-lg text-xs font-medium">
                        {exam}
                      </Badge>
                    ))}
                    {college.exams.length > 3 && (
                      <Badge className="bg-slate-100 text-slate-500 border border-slate-200 px-3 py-1 rounded-lg text-xs font-medium">
                        +{college.exams.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Link href={`/colleges/${college.slug}`} className="flex-1">
                  <Button className="w-full bg-slate-900 hover:bg-green-600 text-white font-black rounded-xl h-12 transition-all duration-300 group">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
