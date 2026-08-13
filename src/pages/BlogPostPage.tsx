import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen, User } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find(p => p.slug === slug);
  const index = blogPosts.findIndex(p => p.slug === slug);
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug && (p.category === post?.category))
    .slice(0, 3);
  const fallbackRelated = blogPosts
    .filter(p => p.slug !== slug)
    .slice(0, 3);

  const suggestions = relatedPosts.length > 0 ? relatedPosts : fallbackRelated;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [slug]);

  if (!post) {
    return (
      <div className="relative min-h-screen bg-slate-900 text-white">
        <Header />
        <main className="min-h-[60vh] flex items-center justify-center px-4 pt-32">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-white mb-3">Article Not Found</h1>
            <p className="text-gray-400 mb-8">
              The article you are looking for does not exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-medium hover:opacity-95 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const prevPost = index > 0 ? blogPosts[index - 1] : null;
  const nextPost = index < blogPosts.length - 1 ? blogPosts[index + 1] : null;

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Header />

      <main>
        {/* Article Header */}
        <section className="relative pt-36 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[120px]" />
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-red-500/10 rounded-full filter blur-[100px]" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 text-white font-medium">
                  <User className="w-4 h-4 text-orange-400" />
                  {post.author}
                </div>
                <div className="text-sm text-gray-500">{post.authorRole}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="relative pb-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-72 sm:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* Article Body */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose-invert space-y-8">
              {post.content.map((block, blockIndex) => (
                <motion.div
                  key={blockIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: blockIndex * 0.05, duration: 0.5 }}
                >
                  {block.heading && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {block.heading}
                    </h2>
                  )}
                  {block.paragraphs?.map((para, paraIndex) => (
                    <p key={paraIndex} className="text-gray-300 text-lg leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                  {block.list && (
                    <ul className="space-y-2.5 my-4">
                      {block.list.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="mt-2 w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex-shrink-0" />
                          <span className="text-gray-300 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12" />

            {/* Author Box */}
            <div className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-12">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                {post.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-lg font-semibold text-white mb-1">{post.author}</div>
                <div className="text-sm text-orange-400 mb-2">{post.authorRole}</div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {post.author === 'Mukesh Tiwari' &&
                    'Mukesh is the Chief Technology Officer at ANTSS, where he leads software architecture and technical education initiatives. He is passionate about making complex technology concepts accessible to businesses.'}
                  {post.author === 'Nishu Jha' &&
                    'Nishu is the CEO and Founder of ANTSS. She works at the intersection of technology and business strategy, helping organizations adopt digital solutions that drive real growth.'}
                  {post.author === 'Amar Kumar' &&
                    'Amar is the Chief Marketing Officer at ANTSS. He focuses on digital strategy, cybersecurity awareness, and helping businesses build a responsible online presence.'}
                </p>
              </div>
            </div>

            {/* Prev / Next Navigation */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.slug}`}
                  className="glass-card p-5 group hover:border-orange-500/50 transition-colors"
                >
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
                  </div>
                  <div className="text-white font-medium leading-snug group-hover:text-orange-400 transition-colors">
                    {prevPost.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextPost && (
                <Link
                  to={`/blog/${nextPost.slug}`}
                  className="glass-card p-5 group hover:border-orange-500/50 transition-colors text-right"
                >
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center justify-end gap-1">
                    Next Article <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-white font-medium leading-snug group-hover:text-orange-400 transition-colors">
                    {nextPost.title}
                  </div>
                </Link>
              )}
            </div>

            {/* Related Articles */}
            {suggestions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-orange-400" />
                  <h2 className="text-2xl font-bold text-white">Related Articles</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {suggestions.map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-36 overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                      </div>
                      <div className="p-5">
                        <div className="text-xs text-orange-400 font-medium mb-2">{related.category}</div>
                        <div className="text-white font-medium leading-snug group-hover:text-orange-400 transition-colors">
                          {related.title}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
