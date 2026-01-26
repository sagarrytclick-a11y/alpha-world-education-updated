'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Globe, MapPin, GraduationCap, ArrowUpRight, Compass, Info, X } from 'lucide-react'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
  description: string
  is_active: boolean
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/countries')
        const result = await response.json()
        if (result.success) {
          setCountries(result.data)
          setFilteredCountries(result.data)
        }
      } catch (error) {
        console.error('Error fetching countries:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCountries()
  }, [])

  useEffect(() => {
    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCountries(filtered)
  }, [searchTerm, countries])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-900 font-black uppercase tracking-widest text-xs">Mapping Destinations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              <Globe size={12} /> Global Study Hubs
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tighter leading-[0.9] mb-6">
              WORLD'S TOP <br />
              <span className="text-green-600">DESTINATIONS</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-md">
              Compare global education systems, living costs, and post-study opportunities.
            </p>
          </div>

          {/* Search Bar - High Visibility */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-green-600 transition-colors">
              <Search size={20} />
            </div>
            <Input
              placeholder="Search by name or region..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-7 bg-slate-50 border-none rounded-2xl text-slate-950 font-bold placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-green-600 shadow-sm"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-950"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filteredCountries.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <Compass size={48} className="mx-auto text-slate-300 mb-4 animate-bounce" />
            <h3 className="text-xl font-black text-slate-900">No destinations found</h3>
            <p className="text-slate-500 font-medium">Try searching for a different country or continent.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCountries.map((country) => (
              <Link key={country._id} href={`/countries/${country.slug}`} className="group block">
                <div className="relative h-full bg-white  rounded-[2.5rem] border border-gray-400 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(22,163,74,0.12)] transition-all duration-500 flex flex-col overflow-hidden hover:-translate-y-2">
                  
                  {/* Top Section with Flag */}
                  <div className="p-8 pb-0 flex items-start justify-between">
                    <div className="relative">
                      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        {country.flag}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-1.5 rounded-lg shadow-lg">
                        <GraduationCap size={14} />
                      </div>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-green-600 transition-colors">
                      Explore Page
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="p-8 pt-6 flex-grow">
                    <h2 className="text-3xl font-black text-slate-950 mb-3 group-hover:text-green-600 transition-colors">
                      {country.name}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3 mb-6">
                      {country.description}
                    </p>

                    {/* Features Labels */}
                    <div className="flex flex-wrap gap-2">
                       <span className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black text-slate-600 uppercase tracking-tight flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                         Top Universities
                       </span>
                       <span className="px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100 text-[10px] font-black text-slate-600 uppercase tracking-tight flex items-center gap-1.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                         PR Pathways
                       </span>
                    </div>
                  </div>

                  {/* CTA Footer */}
                  <div className="px-8 py-6 bg-slate-50/50 mt-auto flex items-center justify-between border-t border-slate-50">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-widest group-hover:text-green-600 transition-colors">
                      Learn More
                    </span>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-md group-hover:bg-green-600 group-hover:text-white transition-all">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}