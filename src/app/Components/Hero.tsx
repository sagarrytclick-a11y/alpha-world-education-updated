"use client";

import React from 'react';
import { Check, ArrowRight, Play, Star, ShieldCheck, GraduationCap, Globe2, BookOpen } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white pt-24 pb-16 overflow-hidden">
      
      {/* Subtle Background Elements to fill white space */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 hidden lg:block -skew-x-6 translate-x-32" />
      <div className="absolute top-40 left-10 w-64 h-64 bg-green-50 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* LEFT COLUMN (7/12) - More Text & Info */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-100 mb-6">
              <Star size={14} className="text-green-600" fill="currentColor" />
              <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">India's Most Trusted Consultancy</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
              Unlock Your <br />
              <span className="relative inline-block text-green-600">
                Global Future
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none">
                  <path d="M3 9C118.5 3 234 3 355 9" stroke="#16A34A" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-medium mb-8">
              We don’t just find you a college; we build your career path across 
              <span className="text-slate-900 font-bold"> 50+ countries</span> with expert-led admission strategies and visa support.
            </p>

            {/* Feature List (To fill white space) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 mb-10 w-full max-w-lg">
              {[
                "Personalized University Shortlisting",
                "Full Scholarship Assistance",
                "Dedicated Visa Interview Prep",
                "Post-Landing Student Support"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-green-100 p-1 rounded-full">
                    <Check size={12} className="text-green-600" strokeWidth={3} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{text}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-5 mb-12 w-full sm:w-auto">
              <Link href="/countries" className="group w-full sm:w-auto px-10 py-5 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2">
                Explore Programs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <button className="group flex items-center gap-4 px-6 py-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                  <Play size={16} fill="currentColor" />
                </div>
                <span className="text-sm font-bold text-slate-900">How It Works</span>
              </button>
            </div>

            {/* Bottom Mini-Stats */}
            <div className="flex items-center gap-8 pt-8 border-t border-slate-100 w-full justify-center lg:justify-start">
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">15k+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Students Placed</span>
               </div>
               <div className="flex flex-col border-x border-slate-100 px-8">
                  <span className="text-2xl font-black text-slate-900">800+</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Universities</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">98%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Visa Success</span>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN (5/12) - Balanced Image Size */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[450px]">
              
              {/* Image with Decorative Frame */}
              <div className="relative z-10 rounded-[3rem] overflow-hidden border-[10px] border-white shadow-2xl rotate-2 aspect-[4/5]">
                <img
                  src="/Hero/herosection.png"
                  alt="Student Success"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Success Badge (Smaller & Clean) */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-3xl shadow-xl border border-slate-50 flex flex-col items-center animate-bounce-slow">
                 <div className="bg-green-100 p-2 rounded-full mb-2">
                    <Star size={20} className="text-green-600" fill="currentColor" />
                 </div>
                 <span className="text-xl font-black text-slate-900 leading-none">98%</span>
                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Visa Success</span>
              </div>

              {/* Next Intake Box (Smaller & Clean) */}
              <div className="absolute -bottom-8 -left-8 bg-slate-900 text-white p-5 rounded-3xl shadow-2xl w-48">
                <p className="text-[9px] text-green-400 font-bold uppercase mb-2">Upcoming Intake</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium">Sept 2026</span>
                  <span className="bg-green-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase">Active</span>
                </div>
              </div>

              {/* Grid Background behind image */}
              <div className="absolute -inset-10 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-70 -z-10 translate-x-4 translate-y-4" />
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;