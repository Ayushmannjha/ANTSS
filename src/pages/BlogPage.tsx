import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const categories = ['All', ...Array.from(new Set(blogPosts.map(p => p.category)))];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter(p => activeCategory === 'All' || p.category === activeCategory)
      .filter(p =>
        query.trim() === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeCategory, query]);

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Header />

      <main>
        {/* Page Header */}
        <section className="relative pt-36 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[120px]" />
          <div className="absolute bottom-0 left-10 w-72 h-72 bg-red-500/10 rounded-full filter blur-[100px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold uppercase tracking-widest mb-4">
                <BookOpen className="w-4 h-4" />
                <span>Learning Hub</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Technical Education{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  & Insights
                </span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                In-depth guides and educational articles on web development, mobile apps,
                cloud computing, cybersecurity, artificial intelligence, and more. We write
                practical content to help businesses and developers make informed technology decisions.
              </p>

              {/* Search */}
              <div className="relative max-w-md">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                  <Search className="w-5 h-5" />
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-transparent shadow-lg shadow-orange-500/20'
                      : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-gray-500 text-lg mb-2">No articles found.</p>
                <p className="text-gray-600 text-sm">Try a different search term or category.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1.5"
                  >
                    <Link to={`/blog/${post.slug}`} className="block">
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-medium text-white bg-orange-500/90 backdrop-blur-sm rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-white mb-2.5 group-hover:text-orange-400 transition-colors leading-snug">
                          {post.title}
                        </h2>

                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold">
                              {post.author.charAt(0)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{post.author}</div>
                              <div className="text-xs text-gray-500">{post.authorRole}</div>
                            </div>
                          </div>
                          <span className="text-orange-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Read <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
