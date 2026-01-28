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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="group">
            <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 rounded-[2rem] overflow-hidden animate-pulse">
              <div className="absolute inset-0 bg-slate-200 animate-pulse" />
              <div className="absolute top-4 left-4 w-24 h-6 bg-white/80 rounded-full animate-pulse" />
            </div>
            <div className="p-6 bg-white rounded-b-[2rem] shadow-sm">
              <div className="h-6 bg-slate-200 rounded-lg mb-3 animate-pulse" />
              <div className="h-4 bg-slate-100 rounded-lg mb-4 w-3/4 animate-pulse" />
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="h-10 bg-slate-100 rounded-xl animate-pulse" />
                <div className="h-10 bg-slate-100 rounded-xl animate-pulse" />
              </div>
              <div className="h-12 bg-slate-900 rounded-2xl animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (colleges.length === 0) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[3rem] border-2 border-dashed border-slate-200">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <GraduationCap className="w-10 h-10 text-slate-300" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">No Related Colleges Found</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Explore our complete collection of top-ranked universities worldwide
        </p>
        <Link href="/colleges">
          <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl h-14 flex items-center gap-3 transition-all duration-300 group">
            Explore All Colleges
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {colleges.map((college) => {
        const country = college.country_ref
        const countryName = getCountryName(college.country_ref)
        const countryFlag = typeof country === 'object' ? country.flag : ''

        return (
          <div key={college._id} className="group">
            <div className="relative overflow-hidden rounded-t-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 bg-white">
              <div className="h-56">
                {college.banner_url ? (
                  <img
                    src={college.banner_url}
                    alt={college.name}
                    className="w-full h-full object-cover "
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 text-green-600" />
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-md text-green-700 hover:bg-white border-none px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter shadow-sm">
                  {countryFlag} {countryName}
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-3 text-white">
                  {/* <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="font-bold text-lg line-clamp-1 leading-tight group-hover:text-green-400 transition-colors">
                    {college.name}
                  </h3> */}
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-b-[2rem] shadow-sm">
              <h3 className="font-bold text-xl text-slate-900 mb-4 line-clamp-2 leading-tight">
                {college.name}
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Yearly Fees</span>
                  <div className="flex items-center text-green-600 font-black text-lg">
                    <DollarSign size={16} />
                    <span>{college.fees.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                  <div className="flex items-center text-slate-700 font-black text-lg">
                    <Clock size={16} className="mr-1 text-slate-400" />
                    <span>{college.duration} years</span>
                  </div>
                </div>
              </div>

              <Link href={`/colleges/${college.slug}`} className="block">
                <Button className="w-full h-14 bg-slate-900 hover:bg-green-600 text-white font-black rounded-2xl transition-all duration-300 group/btn flex items-center justify-center gap-2">
                  View Program Details
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
