'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/ui/Card';
import { BenefitCard } from '@/types';

const benefits: BenefitCard[] = [
  {
    id: 'health-insights',
    icon: '🏥',
    title: 'Health Insights',
    description: 'Track patterns that could indicate health issues early. Your bathroom habits say more than you think!',
  },
  {
    id: 'hydration-goals',
    icon: '💧',
    title: 'Hydration Goals',
    description: 'Stay properly hydrated by monitoring your intake and output. Science-backed recommendations included.',
  },
  {
    id: 'funny-stats',
    icon: '📊',
    title: 'Funny Stats',
    description: 'Discover hilarious facts about your bathroom habits. Did you know the average person spends 3 years on the toilet?',
  },
  {
    id: 'privacy-first',
    icon: '🔒',
    title: 'Privacy First',
    description: 'Your data stays on your device. No cloud storage, no sharing, no judgment. Just you and your bathroom buddy.',
  },
];

const WhyTrackSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
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
            Why Even Track This? 🤔
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Because your bathroom habits are a window into your health, hydration, and happiness.
            Plus, the stats are surprisingly entertaining!
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                hover
                className="h-full text-center p-8 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-100 hover:border-sky-200 transition-all duration-300"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-6xl mb-6 inline-block"
                >
                  {benefit.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl p-8 border border-sky-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to become a bathroom data scientist? 🧪
            </h3>
            <p className="text-gray-600 text-lg">
              Join thousands of people who are already tracking their way to better health and hilarious insights.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyTrackSection;