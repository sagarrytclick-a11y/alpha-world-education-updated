import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Trophy, DollarSign, Calendar, ArrowUpRight,
  FileText, Award, Clock, CheckCircle, Building2, User, MessageCircle, Eye,
  ArrowRight
} from 'lucide-react';

// --- Interfaces ---

interface UniversityCardProps {
  name: string;
  image: string;
  location: string;
  ranking?: string;
  fees?: number;
  duration?: string;
  establishment_year?: string;
  slug: string;
  country?: string;
  about?: string;
  exams?: string[];
}

interface ExamCardProps {
  name: string;
  short_name?: string;
  exam_type?: string;
  conducting_body?: string;
  exam_mode?: string;
  frequency?: string;
  description?: string;
  slug: string;
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  author: string;
  author_avatar?: string;
  published_at: string;
  read_time: number;
  views?: number;
  comments?: number;
  slug: string;
  image?: string;
  category?: string;
}

// --- Component 1: University Card (Clean White Design) ---

const UniversityCard = ({ name, image, location, ranking, fees, duration, establishment_year, slug, country, about, exams }: UniversityCardProps) => (
  <Link href={`/colleges/${slug}`} className="group block h-full">
    <div className="relative h-full bg-white rounded-xl border-2 border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(22,163,74,0.12)] hover:border-green-400 transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-1">
      <div className="relative h-40 w-full overflow-hidden">
        <img src={image || "/next.svg"} alt={name} className="object-cover transition-transform duration-700 group-hover:scale-110" />
        {ranking && (
          <div className="absolute top-3 right-3 backdrop-blur-md bg-white/70 border border-white/50 text-slate-800 px-2 py-1 rounded-xl flex items-center gap-1.5 shadow-sm">
            <Trophy size={12} className="text-orange-500" />
            <span className="text-[10px] font-bold">Rank #{ranking}</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="text-lg font-black text-slate-900 mb-1 leading-tight group-hover:text-green-600 transition-colors uppercase">{name}</h3>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
            <MapPin size={12} className="text-green-500" />
            <span>{location} {country}</span>
          </div>
        </div>

        {about && <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3 border-l-2 border-green-100 pl-2 italic">{about}</p>}

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100/50">
            <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Annual Fee</p>
            <div className="flex items-center gap-1 text-slate-900 font-bold text-xs">
              <DollarSign size={12} className="text-green-600" />
              <span>${fees?.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100/50">
            <p className="text-[9px] text-slate-400 uppercase font-black mb-1">Duration</p>
            <div className="flex items-center gap-1 text-slate-900 font-bold text-xs">
              <Calendar size={12} className="text-green-600" />
              <span>{duration} years</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-400 text-[9px] font-black tracking-widest uppercase">
            <Building2 size={10} /> EST. {establishment_year}
          </div>
          <div className="flex items-center gap-1 text-green-600 text-[10px] font-black group/btn">
            VIEW DETAILS <ArrowUpRight size={12} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- Component 2: Exam Card (High Contrast Design) ---

const ExamCard = ({ name, short_name, exam_type, conducting_body, exam_mode, frequency, description, slug }: ExamCardProps) => (
  <Link href={`/exams/${slug}`} className="group block h-full">
    <div className="relative h-full bg-white rounded-xl border-2 border-slate-200 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_30px_rgba(22,163,74,0.12)] hover:border-green-400 transition-all duration-500 flex flex-col p-6 overflow-hidden hover:-translate-y-1">

      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/30 rounded-bl-full -mr-12 -mt-12 group-hover:bg-blue-100/50 transition-colors duration-500" />

      {/* Header Section */}
      <div className="flex items-start justify-between mb-4 relative">
        {/* Floating Icon */}
        <div className="relative">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-green-600 shadow-lg border border-slate-50 group-hover:scale-105 group-hover:rotate-2 transition-transform duration-500 relative z-10">
            <FileText size={24} />
          </div>
          <div className="absolute inset-0 bg-blue-200 blur-xl opacity-15 group-hover:opacity-30 transition-opacity" />
        </div>

        <div className="bg-blue-50 p-1.5 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
          <Award size={16} className={slug ? "animate-spin-slow" : ""} />
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-xl font-black text-slate-900 mb-1 leading-tight group-hover:text-green-600 transition-colors">
          {short_name || name}
        </h3>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>{exam_type}</span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-3">
          <Building2 size={12} className="text-green-500" />
          <span className="uppercase">{conducting_body}</span>
        </div>

        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Dynamic Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <Calendar size={12} className="text-blue-600" />
            <span className="text-[9px] font-black text-slate-600 uppercase">{exam_mode}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
            <Clock size={12} className="text-green-600" />
            <span className="text-[9px] font-black text-slate-600 uppercase">{frequency}</span>
          </div>
        </div>
      </div>

      {/* Modern Footer CTA */}
      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[9px] font-black text-slate-900 group-hover:text-green-600 transition-colors uppercase tracking-wider">
          Exam Guide
        </span>
        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-green-600 transition-colors shadow-md">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </div>
  </Link>
);

// --- Component 3: Blog Card (Modern Design) ---

const BlogCard = ({ title, excerpt, author, author_avatar, published_at, read_time, views, comments, slug, image, category }: BlogCardProps) => (
  <Link href={`/blog/${slug}`} className="group block h-full">
    <div className="relative bg-white rounded-xl border-4 border-slate-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(22,163,74,0.12)] hover:border-green-500 transition-all duration-500 flex flex-col h-full overflow-hidden hover:-translate-y-2">

      {/* Decorative Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-purple-100 transition-colors duration-500" />

      {/* Header Section */}
      <div className="p-8 pb-0 relative">
        <div className="flex items-start justify-between">
          {/* Floating Icon with Ring */}
          <div className="relative">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-xl border border-slate-50 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
              📝
            </div>
            <div className="absolute inset-0 bg-purple-200 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
          </div>

          <div className="bg-purple-50 p-2 rounded-xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
            <FileText size={20} className={slug ? "animate-spin-slow" : ""} />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-black text-slate-900 leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{category || 'Article'}</span>
          </div>
        </div>
      </div>

      {/* Body Section */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-bold mb-4">
          <User size={14} className="text-purple-500" />
          <span className="uppercase">{author}</span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 font-medium">
          {excerpt}
        </p>

        {/* Dynamic Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Calendar size={14} className="text-purple-600" />
            <span className="text-[10px] font-black text-slate-600 uppercase">{published_at}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <Clock size={14} className="text-green-600" />
            <span className="text-[10px] font-black text-slate-600 uppercase">{read_time} min read</span>
          </div>
        </div>

        {/* Modern Footer CTA */}
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Engagement</span>
            <span className="text-sm font-bold text-slate-900">
              {views && `${views} views`}
              {views && comments && ' • '}
              {comments && `${comments} comments`}
              {!views && !comments && 'Read more'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-green-600 transition-colors shadow-lg">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- Universities Section Component ---

const UniversitiesSection = ({
  universities,
  allUniversities,
  loading,
  loadingMore,
  loadMoreUniversities
}: {
  universities: UniversityCardProps[];
  allUniversities: UniversityCardProps[];
  loading: boolean;
  loadingMore: boolean;
  loadMoreUniversities: () => void;
}) => (
  <section className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
        FEATURED <span className="text-green-600">COLLEGES</span>
      </h2>
      <p className="text-slate-500 font-medium text-lg">
        World-class education for your bright future.
      </p>
    </div>

    {/* Loading State */}
    {loading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-slate-200 h-52 rounded-[2.5rem] mb-4" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-8 bg-slate-200 rounded" />
                <div className="h-8 bg-slate-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {universities.map((uni, i) => (
            <UniversityCard key={i} {...uni} />
          ))}
        </div>

        {/* Load More / View All Buttons */}
        <div className="text-center mt-12 space-y-4">
          {universities.length < allUniversities.length && (
            <button
              onClick={loadMoreUniversities}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Load More Colleges
                  <ArrowUpRight size={20} />
                </>
              )}
            </button>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-slate-500 text-sm">
              Showing {universities.length} of {allUniversities.length} colleges
            </span>
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
            >
              View All Colleges
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </>
    )}
  </section>
);

// --- Exams Section Component ---

const ExamsSection = ({
  exams,
  allExams,
  loading,
  loadingMore,
  loadMoreExams
}: {
  exams: ExamCardProps[];
  allExams: ExamCardProps[];
  loading: boolean;
  loadingMore: boolean;
  loadMoreExams: () => void;
}) => (
  <section className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
        TOP <span className="text-green-600">EXAMS</span>
      </h2>
      <p className="text-slate-500 font-medium text-lg">
        Clear your path to international admissions.
      </p>
    </div>

    {/* Loading State */}
    {loading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-slate-200 h-48 rounded-[2.5rem] mb-4" />
            <div className="p-8 space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded w-2/3" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {exams.map((exam, i) => (
            <ExamCard key={i} {...exam} />
          ))}
        </div>

        {/* Load More / View All Buttons */}
        <div className="text-center mt-12 space-y-4">
          {exams.length < allExams.length && (
            <button
              onClick={loadMoreExams}
              disabled={loadingMore}
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Load More Exams
                  <ArrowUpRight size={20} />
                </>
              )}
            </button>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="text-slate-500 text-sm">
              Showing {exams.length} of {allExams.length} exams
            </span>
            <Link
              href="/exams"
              className="inline-flex items-center gap-2 text-green-600 font-bold hover:text-green-700 transition-colors"
            >
              View All Exams
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </>
    )}
  </section>
);

// --- Main Section Component ---

export default function FeaturedSection() {
  // Universities state
  const [universities, setUniversities] = React.useState<UniversityCardProps[]>([]);
  const [allUniversities, setAllUniversities] = React.useState<UniversityCardProps[]>([]);
  const [universitiesLoading, setUniversitiesLoading] = React.useState(true);
  const [universitiesLoadingMore, setUniversitiesLoadingMore] = React.useState(false);
  const [universitiesDisplayCount, setUniversitiesDisplayCount] = React.useState(6);

  // Exams state
  const [exams, setExams] = React.useState<ExamCardProps[]>([]);
  const [allExams, setAllExams] = React.useState<ExamCardProps[]>([]);
  const [examsLoading, setExamsLoading] = React.useState(true);
  const [examsLoadingMore, setExamsLoadingMore] = React.useState(false);
  const [examsDisplayCount, setExamsDisplayCount] = React.useState(6);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both universities and exams in parallel
        const [uniRes, examRes] = await Promise.all([
          fetch("/api/colleges"),
          fetch("/api/exams")
        ]);

        const [uniData, examData] = await Promise.all([
          uniRes.json(),
          examRes.json()
        ]);

        // Transform and set universities data
        if (uniData.success) {
          const transformedUniversities = uniData.data.colleges?.map((u: any) => ({
            name: u.name,
            image: u.banner_url,
            location: u.city,
            ranking: typeof u.ranking === 'object' && u.ranking?.country_ranking 
              ? `Country #${u.ranking.country_ranking}${u.ranking.world_ranking ? ` | World #${u.ranking.world_ranking}` : ''}`
              : u.ranking,
            fees: u.fees,
            duration: u.duration,
            establishment_year: u.establishment_year,
            slug: u.slug,
            country: u.country_ref?.name,
            about: u.about_content
          })) || [];

          setAllUniversities(transformedUniversities);
          setUniversities(transformedUniversities.slice(0, 6));
        }

        // Transform and set exams data
        if (examData.success) {
          const transformedExams = examData.data.map((e: any) => ({
            name: e.name,
            short_name: e.short_name,
            exam_type: e.exam_type,
            conducting_body: e.conducting_body,
            exam_mode: e.exam_mode,
            frequency: e.frequency,
            description: e.description,
            slug: e.slug
          }));

          setAllExams(transformedExams);
          setExams(transformedExams.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setUniversitiesLoading(false);
        setExamsLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMoreUniversities = async () => {
    try {
      setUniversitiesLoadingMore(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newDisplayCount = universitiesDisplayCount + 6;
      setUniversitiesDisplayCount(newDisplayCount);
      setUniversities(allUniversities.slice(0, newDisplayCount));
    } catch (error) {
      console.error("Failed to load more universities:", error);
    } finally {
      setUniversitiesLoadingMore(false);
    }
  };

  const loadMoreExams = async () => {
    try {
      setExamsLoadingMore(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newDisplayCount = examsDisplayCount + 6;
      setExamsDisplayCount(newDisplayCount);
      setExams(allExams.slice(0, newDisplayCount));
    } catch (error) {
      console.error("Failed to load more exams:", error);
    } finally {
      setExamsLoadingMore(false);
    }
  };

  return (
    <div className="space-y-24 py-24 bg-white overflow-hidden">
      <UniversitiesSection
        universities={universities}
        allUniversities={allUniversities}
        loading={universitiesLoading}
        loadingMore={universitiesLoadingMore}
        loadMoreUniversities={loadMoreUniversities}
      />
      <ExamsSection
        exams={exams}
        allExams={allExams}
        loading={examsLoading}
        loadingMore={examsLoadingMore}
        loadMoreExams={loadMoreExams}
      />
    </div>
  );
}