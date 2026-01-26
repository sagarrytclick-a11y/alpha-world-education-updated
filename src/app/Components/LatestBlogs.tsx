import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag, FileText } from 'lucide-react';

interface BlogCardProps {
  title: string;
  slug: string;
  category: string;
  content: string;
  tags?: string[];
  createdAt: string;
  image?: string;
}

const BlogCard = ({ title, slug, category, content, tags, createdAt, image }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} min read`;
  };

  return (
    <Link href={`/blogs/${slug}`} className="group block">
      <div className="flex flex-col group cursor-pointer bg-white rounded-[2.5rem] border-2 border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:border-green-300 transition-all duration-500 overflow-hidden h-full">
        
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={image || "/next.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* Date Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <Calendar size={14} className="text-green-600" />
              <span className="text-xs font-bold text-slate-700">
                {formatDate(createdAt).split(' ')[1]} {formatDate(createdAt).split(' ')[2]}
              </span>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">
          
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
            {content}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <Clock size={14} className="text-green-500" />
              <span>{calculateReadTime(content)}</span>
            </div>
            
            <button className="flex items-center gap-2 text-green-600 font-bold text-sm hover:text-green-700 transition-all group/btn">
              Read Article
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function LatestBlogs() {
  const [blogs, setBlogs] = React.useState<BlogCardProps[]>([]);

React.useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const result = await response.json();

      const blogsArray = result.success && result.data 
        ? result.data
        : [];

      // Transform API data to match BlogCard interface
      const transformedBlogs = blogsArray.map((blog: any) => ({
        title: blog.title,
        slug: blog.slug,
        category: blog.category || "Blog",
        content: blog.content || "Read more about this blog post",
        tags: blog.tags || [],
        createdAt: blog.createdAt,
        image: blog.image
      }));

      setBlogs(transformedBlogs);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    }
  };

  fetchBlogs();
}, []);

    

  return (
    <section className="max-w-7xl mx-auto px-4 py-20 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
          LATEST <span className="text-green-600">BLOGS</span>
        </h2>
        <p className="text-slate-500 font-medium text-lg">
          Educational insights, study tips, and success stories from our experts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))}
      </div>

      {/* View All Blogs Button */}
      <div className="text-center mt-12">
        <Link 
          href="/blogs" 
          className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View All Blogs
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}