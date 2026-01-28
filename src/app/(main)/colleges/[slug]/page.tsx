import { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
  const college = await getCollegeBySlug(slug)
  if (!college) notFound()

  return <CollegeDetailPage college={college} />
}