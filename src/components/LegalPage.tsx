import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface LegalPageProps {
  title: string;
  subtitle: string;
  icon?: 'shield' | 'file';
  updated: string;
  sections: {
    heading: string;
    content: ReactNode;
  }[];
}

export function LegalPage({ title, subtitle, icon = 'file', updated, sections }: LegalPageProps) {
  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <Header />

      <main>
        <section className="relative pt-36 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-[120px]" />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              {icon === 'shield' ? (
                <ShieldCheck className="w-8 h-8 text-white" />
              ) : (
                <FileText className="w-8 h-8 text-white" />
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-gray-400 text-lg mb-4">{subtitle}</p>
            <p className="text-sm text-gray-500">Last updated: {updated}</p>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8"
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="text-gray-400 leading-relaxed space-y-4">{section.content}</div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 text-sm text-gray-500">
              Questions about this document?{' '}
              <a href="#contact" className="text-orange-400 hover:text-orange-300 font-medium">
                Contact us
              </a>
              {' '}at Contact@antss.in
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
