'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

import PhoneMockup from '@/components/PhoneMockup';
import { BorderMagicButton } from '@/components/ui/border-magic-button';
import { EarlyAccessModal } from '@/components/ui/early-access-modal';
import { signupEarlyAccess } from '@/lib/supabase';

const HeroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEarlyAccessClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEarlyAccessSubmit = async (email: string, device: 'ios' | 'android') => {
    return await signupEarlyAccess(email, device, 'hero-cta');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gray-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gray-100 rounded-full opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
            >
              Know your gut.{' '}
              <span className="block">
                Literally.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-gray-600 mb-10 leading-relaxed"
            >
              Track every visit. Stay healthy.{' '}
              <span className="block">Laugh a little.</span>
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center lg:justify-start"
            >
              <BorderMagicButton
                className="text-lg font-semibold px-8 py-3"
                containerClassName="h-14"
                onClick={handleEarlyAccessClick}
              >
                Get Early Access 🚀
              </BorderMagicButton>
            </motion.div>
          </motion.div>

          {/* Right side - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end relative"
          >
            <PhoneMockup className="max-w-sm w-full transform rotate-3 hover:rotate-0 transition-transform duration-300" />
          </motion.div>
        </div>
      </div>

      {/* Early Access Modal */}
      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleEarlyAccessSubmit}
      />
    </section>
  );
};

export default HeroSection;