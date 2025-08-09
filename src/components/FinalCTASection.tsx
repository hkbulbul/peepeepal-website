'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

interface FinalCTASectionProps {
  onGetEarlyAccess: () => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onGetEarlyAccess }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white bg-opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-white bg-opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Track Your Way to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Better Health?
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Join the bathroom revolution. Get early access to PeePeePal and start your journey
            to better health, hydration, and hilarious insights.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">2,500+</div>
            <div className="text-blue-200">People on waitlist</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-blue-200">Privacy guaranteed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">Free</div>
            <div className="text-blue-200">Forever, no ads</div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <Button
            onClick={onGetEarlyAccess}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-50 text-xl px-12 py-6 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Early Access Now 🚀
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-blue-200 mb-8"
        >
          <div className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            <span>No spam, ever</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            <span>Unsubscribe anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-300">✓</span>
            <span>Launch notification only</span>
          </div>
        </motion.div>

        {/* Fun fact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20"
        >
          <h3 className="text-xl font-bold text-white mb-2">💡 Fun Fact</h3>
          <p className="text-blue-100">
            The average person visits the bathroom 6-8 times per day.
            That&apos;s over 2,500 visits per year! Shouldn&apos;t you know more about them?
          </p>
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 text-blue-200 text-sm"
        >
          <p>
            By signing up, you&apos;re joining a community of health-conscious individuals
            who believe that every data point matters. 🚽💪
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;