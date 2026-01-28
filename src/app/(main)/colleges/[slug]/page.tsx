import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCollegeBySlug } from '@/lib/colleges'
import CollegeDetailPage from './CollegeDetailPage'

interface CollegePageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CollegePageProps): Promise<Metadata> {
  const { slug } = await params
  const college = await getCollegeBySlug(slug)

  if (!college) return { title: 'College Not Found' }

  return {
    title: `${college.name} - AlphaWorld Education`,
    description: college.about_content?.substring(0, 160) || 'Learn more about this college',
  }
}

export default async function CollegePage({ params }: CollegePageProps) {
  const { slug } = await params
  
  try {
    const college = await getCollegeBySlug(slug)
    
    if (!college) {
      console.log("❌ College not found in production, slug:", slug)
      notFound()
    }

    return <CollegeDetailPage college={college} />
  } catch (error) {
    console.error("💥 Production error loading college:", error)
    
    // Fallback for production - show a user-friendly error page
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Unable to Load College</h1>
          <p className="text-slate-500 mb-6">
            We're having trouble loading this college information. Please try again later.
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
}
