'use client'

import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
import { SITE_CONTACT } from '@/config/site-config'
import { useContactInfo } from "@/hooks/useContactInfo";

import {
  MapPin,
  GraduationCap,
  DollarSign,
  Clock,
  Award,
  Calendar,
  Phone,
  Mail,
  Globe,
  Users,
  BookOpen,
  CheckCircle,
  Star,
  TrendingUp,
  ArrowRight,
  Building,
  FileText,
  Shield,
  Target,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react'
import RelatedColleges from './RelatedColleges'

interface College {
  _id: string
  name: string
  slug: string
  country_ref: any
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

interface CollegeDetailPageProps {
  slug: string
}

const CollegeDetailPage: React.FC<CollegeDetailPageProps> = ({ slug }) => {
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { openModal } = useFormModal()

  const { phones, emails } = useContactInfo();

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/colleges/${slug}`)
        const result = await response.json()

        if (!result.success) {
          if (response.status === 404) {
            notFound()
          }
          throw new Error(result.message || 'Failed to fetch college')
        }

        setCollege(result.data)
      } catch (error) {
        console.error('Error fetching college:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch college')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchCollege()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Loading College...</p>
        </div>
      </div>
    )
  }

  if (error || !college) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">College Not Found</h2>
          <p className="text-slate-500 mb-6">{error || 'The college you are looking for does not exist.'}</p>
          <Link href="/colleges">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Browse All Colleges
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-700 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={college.banner_url || `https://picsum.photos/seed/${college.slug}/1920/600`}
            alt={college.name}
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {college.country_ref?.name || 'International'}
                </Badge>
                {college.ranking && (
                  <>
                    {typeof college.ranking === 'object' ? (
                      <>
                        {college.ranking.country_ranking && (
                          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                            #{college.ranking.country_ranking} Country Rank
                          </Badge>
                        )}
                        {college.ranking.world_ranking && (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                            #{college.ranking.world_ranking} World Rank
                          </Badge>
                        )}
                      </>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                        #{college.ranking} Ranked
                      </Badge>
                    )}
                  </>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                {college.name}
              </h1>
              <p className="text-xl text-white/90 font-medium max-w-2xl">
                {college.overview?.description || college.about_content?.substring(0, 150)}...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6">
                <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Info className="w-6 h-6 text-green-600" />
                  {college.overview?.title || 'About the Institution'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-slate-600 leading-relaxed text-lg font-medium">
                  {college.overview?.description || college.about_content}
                </p>
              </CardContent>
            </Card>

            {/* Key Information */}
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6">
                <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-600" />
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {college.fees && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg mb-1">Annual Fees</h4>
                        <p className="text-2xl font-bold text-green-600">${college.fees.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  {college.fees_structure?.courses && college.fees_structure.courses.length > 0 && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg mb-1">Annual Fees</h4>
                        <p className="text-2xl font-bold text-green-600">
                          {college.fees_structure.courses[0].annual_tuition_fee}
                        </p>
                      </div>
                    </div>
                  )}
                  {(college.duration || (college.fees_structure?.courses?.[0]?.duration)) && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg mb-1">Program Duration</h4>
                        <p className="text-xl font-bold text-blue-600">
                          {college.duration || college.fees_structure?.courses?.[0]?.duration} years
                        </p>
                      </div>
                    </div>
                  )}
                  {college.establishment_year && (
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 text-lg mb-1">Established</h4>
                        <p className="text-xl font-bold text-purple-600">{college.establishment_year}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-lg mb-1">Location</h4>
                      <p className="text-xl font-bold text-orange-600">{college.country_ref?.name || 'International'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Entrance Exams */}
            {college.exams && college.exams.length > 0 && (
              <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-purple-600" />
                    Accepted Entrance Exams
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex flex-wrap gap-3">
                    {college.exams.map((exam) => (
                      <Badge key={exam} className="bg-purple-100 text-purple-700 hover:bg-purple-100 border-none px-4 py-2 rounded-lg text-sm font-bold">
                        {exam}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Highlights */}
            {college.key_highlights?.features && college.key_highlights.features.length > 0 && (
              <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 px-8 py-6">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Star className="w-6 h-6 text-yellow-600" />
                    {college.key_highlights.title || 'Key Highlights'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {college.key_highlights.description && (
                    <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                      {college.key_highlights.description}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.key_highlights.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <CheckCircle className="w-4 h-4 text-yellow-600" />
                        </div>
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Why Choose Us */}
            {college.why_choose_us?.features && college.why_choose_us.features.length > 0 && (
              <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    {college.why_choose_us.title || 'Why Choose Us'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {college.why_choose_us.description && (
                    <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                      {college.why_choose_us.description}
                    </p>
                  )}
                  <div className="space-y-4">
                    {college.why_choose_us.features.map((feature, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                        <h4 className="font-black text-slate-900 text-lg mb-2">{feature.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Ranking & Recognition */}
            {college.ranking && typeof college.ranking === 'object' && (
              <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Award className="w-6 h-6 text-blue-600" />
                    {college.ranking.title || 'Ranking & Recognition'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {college.ranking.description && (
                    <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                      {college.ranking.description}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {college.ranking.country_ranking && (
                      <div className="text-center bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                        <div className="text-3xl font-black text-yellow-600 mb-2">#{college.ranking.country_ranking}</div>
                        <div className="text-slate-600 font-medium">Country Ranking</div>
                      </div>
                    )}
                    {college.ranking.world_ranking && (
                      <div className="text-center bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="text-3xl font-black text-blue-600 mb-2">#{college.ranking.world_ranking}</div>
                        <div className="text-slate-600 font-medium">World Ranking</div>
                      </div>
                    )}
                  </div>
                  {college.ranking.accreditation && college.ranking.accreditation.length > 0 && (
                    <div>
                      <h4 className="font-black text-slate-900 text-lg mb-3">Accreditations</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.ranking.accreditation.map((acc, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-3 py-1 rounded-lg text-sm font-medium">
                            {acc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Admission Process */}
            {college.admission_process?.steps && college.admission_process.steps.length > 0 && (
              <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    {college.admission_process.title || 'Admission Process'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {college.admission_process.description && (
                    <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                      {college.admission_process.description}
                    </p>
                  )}
                  <div className="space-y-4">
                    {college.admission_process.steps.map((step, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 font-black text-purple-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-700 font-medium">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Documents Required */}
            {college.documents_required?.documents && college.documents_required.documents.length > 0 && (
              <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 px-8 py-6">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-orange-600" />
                    {college.documents_required.title || 'Documents Required'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {college.documents_required.description && (
                    <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                      {college.documents_required.description}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {college.documents_required.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 bg-orange-50 rounded-lg p-3 border border-orange-100">
                        <Shield className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <span className="text-slate-700 font-medium text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fees Structure */}
            {college.fees_structure?.courses && college.fees_structure.courses.length > 0 && (
              <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-green-600" />
                    {college.fees_structure.title || 'Fees Structure'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {college.fees_structure.description && (
                    <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                      {college.fees_structure.description}
                    </p>
                  )}
                  <div className="space-y-4">
                    {college.fees_structure.courses.map((course, index) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <h4 className="font-black text-slate-900 text-sm mb-1">Course</h4>
                            <p className="text-slate-700 font-medium">{course.course_name}</p>
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 text-sm mb-1">Duration</h4>
                            <p className="text-slate-700 font-medium">{course.duration}</p>
                          </div>
                          <div>
                            <h4 className="font-black text-slate-900 text-sm mb-1">Annual Tuition</h4>
                            <p className="text-2xl font-bold text-green-600">{course.annual_tuition_fee}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Campus Highlights */}
            {college.campus_highlights?.highlights && college.campus_highlights.highlights.length > 0 && (
              <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 px-8 py-6">
                  <CardTitle className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Building className="w-6 h-6 text-blue-600" />
                    {college.campus_highlights.title || 'Campus Highlights'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  {college.campus_highlights.description && (
                    <p className="text-slate-600 leading-relaxed text-lg font-medium mb-6">
                      {college.campus_highlights.description}
                    </p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {college.campus_highlights.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Zap className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-slate-700 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - CTA and Related */}
          <div className="space-y-6">
            {/* CTA Card */}
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-green-600 to-emerald-700 text-white">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Ready to Apply?</h3>
                  <p className="text-green-100 mb-6">Get expert guidance for your admission process</p>
                  <div className="space-y-3">
                    <button
                      onClick={openModal}
                      className="w-full bg-white text-green-700 font-black rounded-xl hover:bg-green-50 transition-all duration-300 py-4 px-6"
                    >
                      Start Application
                    </button>
                    <button
                      onClick={openModal}
                      className="w-full bg-white/20 backdrop-blur-sm text-white font-black rounded-xl hover:bg-white/30 transition-all duration-300 py-4 px-6 border border-white/30"
                    >
                      Get Free Consultation
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card className="border-none shadow-lg rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 font-medium">{phones.primary}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 font-medium">{emails.info}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700 font-medium">Global Opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Colleges */}
        <div className="mt-16">
          <RelatedColleges currentCollegeSlug={college.slug} />
        </div>
      </div>

      <FAQ />
    </div>
  )
}

export default CollegeDetailPage
