'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { FeatureCard } from '@/types';

const features: FeatureCard[] = [
  {
    id: 'smart-tracking',
    icon: '🧠',
    title: 'Smart Tracking',
    description: 'One-tap logging with intelligent pattern recognition. The app learns your habits and provides personalized insights.',
    highlights: ['Quick logging', 'Pattern analysis', 'Smart reminders', 'Trend detection'],
  },
  {
    id: 'health-analytics',
    icon: '📈',
    title: 'Health Analytics',
    description: 'Comprehensive health insights with beautiful charts and actionable recommendations from health experts.',
    highlights: ['Visual charts', 'Health trends', 'Expert tips', 'Progress tracking'],
  },
  {
    id: 'privacy-security',
    icon: '🛡️',
    title: 'Privacy & Security',
    description: 'Your most personal data deserves the highest protection. Everything stays on your device, always.',
    highlights: ['Local storage', 'No cloud sync', 'Zero tracking', 'Complete privacy'],
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-sky-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Features That Actually Matter ✨
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;ve built PeePeePal with the features you need and none of the bloat you don&apos;t.
            Simple, powerful, and surprisingly delightful.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card
                hover
                className="h-full p-8 bg-white border-gray-200 hover:border-sky-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6"
                >
                  {feature.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  {feature.highlights?.map((highlight, highlightIndex) => (
                    <motion.div
                      key={highlightIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (index * 0.2) + (highlightIndex * 0.1) }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              And that&apos;s just the beginning... 🚀
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              We&apos;re constantly adding new features based on user feedback.
              Join our community and help shape the future of bathroom tracking!
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Regular updates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Community driven</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Always improving</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;