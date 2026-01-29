'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { getCountrySlug } from "@/lib/normalize"
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getCountryName } from "@/lib/normalize"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, DollarSign, Clock, GraduationCap, Building, Filter, X, ArrowRight, Loader2 } from 'lucide-react'

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

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [filteredColleges, setFilteredColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string>('all')
  const [selectedExam, setSelectedExam] = useState<string>('all')
  const [totalCount, setTotalCount] = useState(0)
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const observer = useRef<IntersectionObserver | null>(null)
  const lastCollegeRef = useRef<HTMLDivElement>(null)

  // Debounce search term (wait 500ms after user stops typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Initial load and when filters change (using debounced search)
  useEffect(() => {
    setPage(1)
    setColleges([])
    fetchColleges(1, true)
  }, [debouncedSearchTerm, selectedCountry, selectedExam])

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    }

    const callback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMore && !loading) {
        setPage(prev => prev + 1)
      }
    }

    observer.current = new IntersectionObserver(callback, options)
    if (lastCollegeRef.current) {
      observer.current.observe(lastCollegeRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [hasMore, loading])

  // Load more data when page changes
  useEffect(() => {
    if (page > 1) {
      fetchColleges(page, false)
    }
  }, [page])

  const fetchColleges = async (pageNum: number, isNewSearch: boolean = false) => {
    try {
      setLoading(true)

      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '12',
        ...(debouncedSearchTerm && { search: debouncedSearchTerm }),
        ...(selectedCountry !== 'all' && { country: selectedCountry }),
        ...(selectedExam !== 'all' && { exam: selectedExam })
      })

      const response = await fetch(`/api/colleges?${params}`)
      const result = await response.json()

      if (result.success) {
        const newColleges = result.data.colleges || []
        const total = result.data.total || 0

        if (isNewSearch) {
          setColleges(newColleges)
          setFilteredColleges(newColleges)
        } else {
          setColleges(prev => [...prev, ...newColleges])
          setFilteredColleges(prev => [...prev, ...newColleges])
        }

        setTotalCount(total)
        setHasMore(newColleges.length === 12 && colleges.length + newColleges.length < total)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const countries = [
    ...new Set(
      colleges
        .map(college => {
          const c = college.country_ref

          if (!c) return null                 // handles null / undefined
          if (typeof c === "string") return c
          if (typeof c === "object") return c.name ?? null

          return null
        })
        .filter(Boolean) // remove nulls
    ),
  ]
  const exams = [...new Set(colleges.flatMap(college => college.exams))]

  if (loading && colleges.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Excellence...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pointer-events-auto">
      {/* Premium Header */}
      <div className="bg-white border-b border-slate-100 relative overflow-hidden pointer-events-auto">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 pointer-events-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none mb-4 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                Global Opportunities
              </Badge>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                FIND YOUR <span className="text-green-600">FUTURE</span>
              </h1>
              <p className="text-slate-500 mt-2 font-medium max-w-md">
                Explore top-rated universities and colleges across 50+ countries with our expert guidance.
              </p>
            </div>
            <div className="bg-white shadow-sm border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-white">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900">{totalCount}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Colleges Found</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 pointer-events-auto">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 p-6 md:p-8 pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center pointer-events-auto">
            <div className="relative group pointer-events-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 group-focus-within:text-green-600 transition-colors" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-slate-50 border-none h-12 rounded-xl focus-visible:ring-2 focus-visible:ring-green-500 font-medium pointer-events-auto"
              />
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-green-500 font-medium pointer-events-auto">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((c) => (
                  <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="h-12 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-green-500 font-medium pointer-events-auto">
                <SelectValue placeholder="Entrance Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                {exams.map((exam) => (
                  <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              onClick={() => { setSearchTerm(''); setSelectedCountry('all'); setSelectedExam('all'); }}
              className="h-12 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl font-bold flex gap-2 pointer-events-auto"
            >
              <X size={16} /> Reset
            </Button>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="py-12 pointer-events-auto">
          {filteredColleges.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">No colleges match your search</h3>
              <p className="text-slate-500">Try changing your filters or searching for something else.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredColleges.map((college, index) => (
                <div
                  key={college._id}
                  ref={index === filteredColleges.length - 1 ? lastCollegeRef : null}
                >
                  <Card className="group border-none py-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white flex flex-col h-full">
                    {/* Image Header */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <img
                        src={college.banner_url || `https://picsum.photos/seed/${college.slug}/600/400`}
                        alt={college.name}
                        width={600}
                        height={400}
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 backdrop-blur-md text-green-700 hover:bg-white border-none px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm">
                          {getCountryName(college.country_ref)}
                        </Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white">
                          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
                            <Building size={16} />
                          </div>
                          <h3 className="font-bold text-lg line-clamp-1 leading-tight group-hover:text-green-400 transition-colors">
                            {college.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-grow">
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-6 font-medium italic">
                        "{college.about_content}"
                      </p>

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

                      <div className="flex flex-wrap gap-2 mb-8">
                        {college.exams.slice(0, 3).map((exam) => (
                          <span key={exam} className="text-[10px] font-bold bg-slate-50 text-slate-600 px-3 py-1 rounded-lg border border-slate-100">
                            {exam}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <Link href={`/colleges/${college.slug}`}>
                          <Button className="w-full h-14 bg-slate-900 hover:bg-green-600 text-white font-black rounded-2xl transition-all duration-300 group/btn flex items-center justify-center gap-2">
                            View Program Details
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}

          {/* Loading indicator for infinite scroll */}
          {loading && colleges.length > 0 && (
            <div className="flex justify-center py-8">
              <div className="flex items-center gap-3 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="font-medium">Loading more colleges...</span>
              </div>
            </div>
          )}

          {/* End of results indicator */}
          {!hasMore && colleges.length > 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 font-medium">
                Showing all {colleges.length} colleges
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}