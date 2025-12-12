import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { fadeInLeft, fadeInRight, withDelay } from '@/lib/animations';

const tabs = [
  {
    id: 'web',
    title: 'Web Platform',
    frontend: [
      { name: 'React', icon: '⚛️' },
      { name: 'Vue.js', icon: '💚' },
      { name: 'Angular', icon: '🔺' },
      { name: 'Next.js', icon: '▲' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Tailwind CSS', icon: '🎨' },
    ],
    backend: [
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'Java', icon: '☕' },
      { name: 'Go', icon: '🐹' },
      { name: '.NET', icon: '🔷' },
      { name: 'PHP', icon: '🐘' },
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    frontend: [
      { name: 'AWS', icon: '☁️' },
      { name: 'Azure', icon: '🔵' },
      { name: 'Google Cloud', icon: '🌐' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '☸️' },
      { name: 'Terraform', icon: '🏗️' },
    ],
    backend: [
      { name: 'Jenkins', icon: '🔧' },
      { name: 'GitHub Actions', icon: '🐙' },
      { name: 'CircleCI', icon: '⭕' },
      { name: 'ArgoCD', icon: '🚀' },
      { name: 'Ansible', icon: '🔴' },
      { name: 'Prometheus', icon: '📊' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    frontend: [
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MySQL', icon: '🐬' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Redis', icon: '🔴' },
      { name: 'Elasticsearch', icon: '🔍' },
      { name: 'DynamoDB', icon: '⚡' },
    ],
    backend: [
      { name: 'Cassandra', icon: '👁️' },
      { name: 'Neo4j', icon: '🔗' },
      { name: 'InfluxDB', icon: '📈' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Supabase', icon: '⚡' },
      { name: 'CockroachDB', icon: '🪳' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile Apps',
    frontend: [
      { name: 'React Native', icon: '📱' },
      { name: 'Flutter', icon: '💙' },
      { name: 'Swift', icon: '🍎' },
      { name: 'Kotlin', icon: '🤖' },
      { name: 'Xamarin', icon: '💜' },
      { name: 'Ionic', icon: '⚡' },
    ],
    backend: [
      { name: 'Firebase', icon: '🔥' },
      { name: 'AWS Amplify', icon: '📱' },
      { name: 'Parse', icon: '🔷' },
      { name: 'Realm', icon: '👑' },
      { name: 'SQLite', icon: '📦' },
      { name: 'AppSync', icon: '🔄' },
    ],
  },
];

export function TechStack() {
  const [activeTab, setActiveTab] = useState('web');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeTech = tabs.find(t => t.id === activeTab)!;

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 to-slate-900" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.h2
          variants={fadeInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={withDelay(0)}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12"
        >
          Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Tech Stack
          </span>
        </motion.h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9 }}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              {tab.title}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12"
          >
            {/* Frontend/Main Section */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              transition={withDelay(0)}
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                {activeTab === 'web' ? 'Frontend' : activeTab === 'cloud' ? 'Cloud Platforms' : activeTab === 'database' ? 'SQL & NoSQL' : 'Cross-Platform'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {activeTech.frontend.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    variants={fadeInRight}
                    initial="hidden"
                    animate="visible"
                    transition={withDelay(index < 3 ? 0 : 500)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-card p-4 text-center cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <div className="text-white font-medium text-sm">{tech.name}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Backend Section */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              animate="visible"
              transition={withDelay(300)}
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                {activeTab === 'web' ? 'Backend' : activeTab === 'cloud' ? 'CI/CD & Tools' : activeTab === 'database' ? 'Specialized DBs' : 'Backend Services'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {activeTech.backend.map((tech, _index) => (
                  <motion.div
                    key={tech.name}
                    variants={fadeInRight}
                    initial="hidden"
                    animate="visible"
                    transition={withDelay(800)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="glass-card p-4 text-center cursor-pointer"
                  >
                    <div className="text-3xl mb-2">{tech.icon}</div>
                    <div className="text-white font-medium text-sm">{tech.name}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
