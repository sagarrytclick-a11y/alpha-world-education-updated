'use client'

import React from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormModal } from '@/context/FormModalContext'
import FAQ from "@/app/Components/FAQ"
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

interface CollegeDetailPageProps {
  college?: College | null
}

export default function CollegeDetailPage({ college }: CollegeDetailPageProps) {
  // Add null check to prevent undefined errors
  if (!college) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">College Not Found</h1>
          <p className="text-slate-500 mb-6">
            The college you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/colleges"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            ← Back to Colleges
          </Link>
        </div>
      </div>
    )
  }

  const { openModal } = useFormModal();
  // const country = college.country_ref
  const country = college.country_ref

  const countryName =
    country && typeof country === "object"
      ? country.name
      : country || ""

  const countryFlag =
    country && typeof country === "object"
      ? country.flag
      : ""


  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        {college.banner_url ? (
          <>
            <img
              src={college.banner_url}
              alt={college.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-blue-600" />
        )}

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-green-500 text-white border-none px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider">
                  {countryFlag} {countryName}
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Active & Enrolling
                </Badge>
                {college.ranking && (
                  <Badge className="bg-yellow-500 text-white border-none px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider">
                    <Star className="w-4 h-4 mr-2" />
                    Rank #{college.ranking}
                  </Badge>
                )}
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[0.9] mb-6">
                {college.name}
              </h1>

              <p className="text-xl text-white/90 max-w-3xl mb-8 font-medium leading-relaxed">
                {(college.about_content?.substring(0, 200) ?? "")}...
              </p>


              <div className="flex flex-wrap gap-6">
                <div className="flex items-center text-white">
                  <Calendar className="w-5 h-5 mr-3 text-green-400" />
                  <span className="font-bold">Est. {college.establishment_year || 'N/A'}</span>
                </div>
                <div className="flex items-center text-white">
                  <Clock className="w-5 h-5 mr-3 text-blue-400" />
                  <span className="font-bold">{college.duration}</span>
                </div>
                <div className="flex items-center text-white">
                  <Award className="w-5 h-5 mr-3 text-yellow-400" />
                  <span className="font-bold">{college.exams.length} Required Exams</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats Bar */}
      <div className="bg-white border-b border-slate-100 relative -mt-20 z-10">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">
                  ${college.fees.toLocaleString()}
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Annual Fees</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {college.duration}
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Duration</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {college.exams.length}
                </div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Required Exams</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {college.createdAt
                    ? new Date(college.createdAt).getFullYear()
                    : "—"}
                </div>

                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Added Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Section */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-green-600" />
                  </div>
                  About {college.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">
                    {college.about_content}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Required Exams */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  Required Entrance Exams
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="flex flex-wrap gap-3">
                  {college.exams.map((exam, index) => (
                    <Badge key={index} className="bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all">
                      {exam}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Information */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                    <Info className="w-6 h-6 text-blue-600" />
                  </div>
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 mb-1">Location</div>
                        <div className="text-slate-600 font-medium">{countryFlag} {countryName}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 mb-1">Establishment Year</div>
                        <div className="text-slate-600 font-medium">{college.establishment_year || 'Not Available'}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 mb-1">Course Duration</div>
                        <div className="text-slate-600 font-medium">{college.duration}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <DollarSign className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 mb-1">Annual Fees</div>
                        <div className="text-3xl font-black text-slate-900">
                          ₹{college.fees.toLocaleString("en-US")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 mb-1">Ranking</div>
                        <div className="text-slate-600 font-medium">{college.ranking || 'Not Available'}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 mb-1">Status</div>
                        <div className="text-slate-600 font-medium">Active & Enrolling</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Features */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  Why Choose {college.name}?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900 mb-2">World-Class Education</div>
                      <div className="text-slate-600 font-medium">Internationally recognized programs and faculty</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900 mb-2">Diverse Community</div>
                      <div className="text-slate-600 font-medium">Students from over 100 countries</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900 mb-2">Modern Facilities</div>
                      <div className="text-slate-600 font-medium">State-of-the-art infrastructure and labs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-black text-slate-900 mb-2">Career Support</div>
                      <div className="text-slate-600 font-medium">Excellent placement opportunities</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-8">


            {/* Enhanced CTA Card */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-green-600 to-blue-600">
              <CardContent className="p-8 text-white">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-3">
                    Ready to Apply to {college.name}?
                  </h3>
                  <p className="text-white/90 font-medium">
                    Start your journey to excellence in {countryName}
                  </p>
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-black">${college.fees.toLocaleString()}</div>
                      <div className="text-xs text-white/80">Annual Fee</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black">{college.duration}</div>
                      <div className="text-xs text-white/80">Duration</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={openModal}
                    className="w-full bg-white text-green-600 hover:bg-green-50 font-black rounded-2xl h-14 group"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Advisor
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    onClick={openModal}
                    variant="outline"
                    className="w-full bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 font-black rounded-2xl h-14"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Request Information
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Dynamic College Stats */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-xl font-black text-slate-900">College Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">College ID</span>
                  <span className="font-black text-slate-900 text-sm">{college._id}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Status</span>
                  <span className={`font-black text-sm px-3 py-1 rounded-full ${college.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {college.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Required Exams</span>
                  <span className="font-black text-slate-900">{college.exams.length}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Global Ranking</span>
                  <span className="font-black text-slate-900">#{college.ranking || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-600 font-medium">Added Date</span>
                  <span className="font-black text-slate-900">
                    {college.createdAt
                      ? new Date(college.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-600 font-medium">Last Updated</span>
                  <span className="font-black text-slate-900">
                    {college.createdAt
                      ? new Date(college.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      : "—"}
                  </span>
                </div>
              </CardContent>
            </Card>



            {/* Enhanced Contact Info */}
            <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-xl font-black text-slate-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-slate-600 font-medium p-3 bg-slate-50 rounded-xl">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-medium p-3 bg-slate-50 rounded-xl">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>admissions@{college.slug}.edu</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-medium p-3 bg-slate-50 rounded-xl">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span>www.{college.slug}.edu</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-medium p-3 bg-slate-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span>{countryFlag} {countryName}</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-medium p-3 bg-slate-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-slate-600" />
                  <span>Est. {college.establishment_year || 'Not Available'}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Colleges Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Related Colleges</h2>
              <p className="text-slate-600 font-medium">Similar institutions you might be interested in</p>
            </div>
            <Link href="/colleges">
              <Button className="bg-slate-900 hover:bg-green-600 text-white font-black rounded-2xl px-8 group">
                View All Colleges
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <RelatedColleges currentCollegeSlug={college.slug} />
        </div>
      </div>
      <FAQ />
    </div>
  )
}
