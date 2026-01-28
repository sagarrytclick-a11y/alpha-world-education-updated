'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useFormModal } from '@/context/FormModalContext'
import { 
  Calendar,
  Globe,
  Building,
  Monitor,
  Clock,
  FileText,
  ArrowLeft,
  Users,
  Award,
  BookOpen,
  Target,
  CheckCircle,
  MapPin,
  ArrowRight
} from 'lucide-react'

interface Country {
  _id: string
  name: string
  slug: string
  flag: string
}

interface Exam {
  _id: string
  name: string
  slug: string
  short_name: string
  exam_type: string
  conducting_body: string
  exam_mode: string
  frequency: string
  description: string
  applicable_countries: Country[]
  is_active: boolean
  display_order: number
  createdAt: string
  updatedAt: string
}

const ExamPage = () => {
  const params = useParams()
  const slug = params.slug as string
  const [exam, setExam] = useState<Exam | null>(null)
  const [loading, setLoading] = useState(true)
  const { openModal } = useFormModal()

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/exams/${slug}`)
        const result = await response.json()
        
        if (result.success) {
          setExam(result.data)
        } else {
          console.error('Exam not found:', result.message)
        }
      } catch (error) {
        console.error('Error fetching exam:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchExam()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading Exam...</p>
        </div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={32} className="text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Exam not found</h3>
          <p className="text-slate-500 font-medium">The exam you're looking for doesn't exist.</p>
          <Link href="/exams">
            <Button className="mt-4 bg-green-600 hover:bg-green-700">
              Back to Exams
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const examInfo = [
    {
      icon: Building,
      label: 'Conducting Body',
      value: exam.conducting_body,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: Monitor,
      label: 'Exam Mode',
      value: exam.exam_mode,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      icon: Calendar,
      label: 'Frequency',
      value: exam.frequency,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: Globe,
      label: 'Exam Type',
      value: exam.exam_type,
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ]

  const benefits = [
    'Global Recognition',
    'University Admissions',
    'Scholarship Opportunities',
    'Career Advancement',
    'Skill Assessment',
    'International Opportunities'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/exams">
            <Button variant="ghost" className="mb-4 text-slate-500 hover:text-green-600 font-bold flex gap-2">
              <ArrowLeft size={16} />
              Back to Exams
            </Button>
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {exam.exam_type}
            </Badge>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {exam.exam_mode}
            </Badge>
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              {exam.frequency}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
            {exam.name}
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-medium">
            {exam.description}
          </p>
        </div>
      </div>

      {/* Exam Information */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {examInfo.map((info, index) => (
            <Card key={index} className="border-none shadow-lg rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className={`${info.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className={`w-8 h-8 ${info.color}`} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{info.label}</p>
                <p className="text-lg font-bold text-slate-900">{info.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Description Section */}
        <Card className="border-none shadow-lg rounded-2xl mb-12">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">About {exam.short_name}</h2>
            </div>
            <div className="prose prose-lg max-w-none">
              <p className="text-slate-700 leading-relaxed font-medium">
                {exam.description}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card className="border-none shadow-lg rounded-2xl mb-12">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Key Benefits</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="font-semibold text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Applicable Countries */}
        {exam.applicable_countries.length > 0 && (
          <Card className="border-none shadow-lg rounded-2xl mb-12">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Applicable Countries</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {exam.applicable_countries.map((country) => (
                  <Link
                    key={country._id}
                    href={`/countries/${country.slug}`}
                    className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <p className="font-semibold text-slate-900">{country.name}</p>
                      <p className="text-sm text-slate-500">View study options</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <Card className="border-none bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl overflow-hidden text-white">
          <CardContent className="p-10 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black mb-4">Ready to Ace {exam.short_name}?</h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Get expert guidance and comprehensive preparation to excel in your {exam.name} and achieve your study abroad dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={openModal}
                className="bg-white text-green-600 hover:bg-green-50 font-black rounded-2xl h-14 px-8 text-lg"
              >
                Get Expert Guidance
              </Button>
              <Link 
               href={'/blogs'}
                className="border-white/20 flex items-center gap-2 justify-center bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl h-14 px-8 text-lg"
              >
                Explore Latest Blogs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ExamPage
