import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { fadeInRight, fadeInLeft, fadeInDown, withDelay } from '@/lib/animations';
import { blogPosts } from '@/data/blogPosts';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section id="blog" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-900" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(0)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold mb-4"
          >
            <BookOpen className="w-4 h-4" />
            Technical Education Hub
          </motion.div>

          <motion.h2
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(200)}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Learn &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Grow
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInDown}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={withDelay(400)}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Practical guides and educational articles on web development, cloud computing,
            cybersecurity, AI, and digital transformation — written for businesses and developers.
          </motion.p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {recentPosts.map((post, index) => {
            const variants = index === 0 ? fadeInRight : index === 1 ? fadeInDown : fadeInLeft;
            return (
              <motion.article
                key={post.slug}
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={withDelay(index * 200)}
                whileHover={{ y: -10 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-medium text-white bg-orange-500/80 backdrop-blur-sm rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>

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

                    <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-orange-400 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-4 text-orange-400 text-sm font-medium flex items-center gap-1">
                      Read More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-95 transition-opacity"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
