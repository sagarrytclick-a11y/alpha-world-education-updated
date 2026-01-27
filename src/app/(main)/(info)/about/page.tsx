"use client"
import React from 'react';
import Image from 'next/image';
import {
  PlayCircle, Star, Check, ShieldCheck,
  GraduationCap, TrendingUp, MoveRight,
  MapPin, Phone, Mail, ArrowUpRight,
  Calendar, Users, Award, Globe
} from 'lucide-react';
import { useFormModal } from '@/context/FormModalContext';

// --- Types ---
interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface Expert {
  name: string;
  role: string;
  image: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// --- Data ---
const timeline: TimelineItem[] = [
  { year: "2012", title: "Foundation in London", description: "Established to bridge the gap between talented students and top UK universities." },
  { year: "2016", title: "Global Expansion", description: "Expanded operations to Canada, Australia, and the US, partnering with 150+ institutions." },
  { year: "2022", title: "Digital Transformation", description: "Launched our AI-powered student portal to streamline applications." },
];

const experts: Expert[] = [
  { name: "James Carter", role: "Senior Counselor (UK)", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop" },
  { name: "Sarah Jenkins", role: "Visa Specialist", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" },
  { name: "Michael Chen", role: "University Relations", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop" },
  { name: "Priya Patel", role: "Student Success Lead", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop" },
];

const values: Value[] = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Trust & Integrity",
    description: "We build lasting relationships based on transparency, honesty, and ethical practices."
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Excellence in Education",
    description: "We are committed to helping students achieve their highest academic potential."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Perspective",
    description: "We embrace diversity and foster understanding across cultures and borders."
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Innovation",
    description: "We continuously evolve our methods to provide cutting-edge solutions."
  }
];

export default function AboutPage() {
   const { openModal } = useFormModal();
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-12 sm:pb-16 grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            Our Story
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1]">
            Empowering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
              Global Futures
            </span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg max-w-lg leading-relaxed">
            We are more than consultants; we are architects of your international career.
            Navigating complexities so you can focus on your future.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <button onClick={openModal} className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all shadow-lg shadow-green-200 text-sm sm:text-base">
              Explore Our Story
            </button>
            {/* <button className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-semibold text-slate-700 hover:text-green-600 transition text-sm sm:text-base">
              <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" /> Watch Video
            </button> */}
          </div>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-[2.5rem] aspect-[4/3] relative overflow-hidden flex items-center justify-center">
             {/* Abstract circle decoration */}
            <div className="absolute w-[80%] h-[80%] border border-white/10 rounded-full animate-pulse"></div>
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=transparent"
              alt="Hero Illustration"
              className="w-2/3 z-10"
            />
            {/* Rating Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4">
              <div className="bg-yellow-100 p-1.5 sm:p-2 rounded-lg"><Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500 fill-current" /></div>
              <div>
                <p className="text-lg sm:text-xl font-bold leading-none text-slate-900">4.9/5</p>
                <p className="text-xs text-slate-400 font-medium">Trusted by students worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-y border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Years Experience", value: "10+" },
          { label: "Partner Universities", value: "500+" },
          { label: "Visa Success Rate", value: "98%" },
          { label: "Students Placed", value: "10,000+" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <h3 className="text-3xl font-bold text-green-600">{stat.value}</h3>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Our Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                From Vision to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">Reality</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Founded in 2012, AlphaWorld Education began with a simple mission: to make quality international education accessible to every ambitious student, regardless of their background or location.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed">
                Today, we are proud to have helped over 10,000 students from 50+ countries achieve their dreams of studying at world-class universities across the UK, Canada, Australia, and the United States.
              </p>
            </div>

            {/* Key Achievements */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-slate-700 font-medium">99% Visa Success Rate</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-slate-700 font-medium">$2.5M+ in Scholarships Secured</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-slate-700 font-medium">500+ University Partnerships</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8 shadow-xl">
              <Image
                src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our Story"
                width={500}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 bg-white rounded-3xl mx-6 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Our Journey</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            A decade of innovation, growth, and student success.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-6 lg:left-1/2 transform lg:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-green-400 to-green-500 hidden lg:block"></div>

          <div className="space-y-8 sm:space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className={`flex items-start gap-4 sm:gap-6 lg:gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0 lg:flex-1">
                  <div className={`bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-slate-100 ${index % 2 === 1 ? 'lg:text-right' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div className="bg-green-100 text-green-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm">
                        {item.year}
                      </div>
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm sm:text-base">{item.description}</p>
                  </div>
                </div>
                <div className="hidden lg:block w-4 h-4 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="flex-1 hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">Values</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            The principles that guide everything we do and shape the future of education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="bg-green-100 p-3 rounded-xl text-green-600">
                  {value.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Our Experts */}
      {/* <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900">Meet Our Experts</h2>
            <p className="text-slate-500 mt-2">The dedicated minds guiding your journey.</p>
          </div>
          <button className="group flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all">
            View All Members <MoveRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert, i) => (
            <div key={i} className="group relative rounded-[2rem] overflow-hidden aspect-[3/4] bg-slate-200 shadow-sm">
              <Image
                src={expert.image}
                alt={expert.name}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h4 className="text-xl font-bold">{expert.name}</h4>
                <p className="text-sm text-slate-300">{expert.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Contact CTA */}
    

    </main>
  );
}