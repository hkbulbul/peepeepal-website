'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Smartphone, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EarlyAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, device: 'ios' | 'android') => Promise<{ success: boolean; message: string }>;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<'device' | 'email'>('device');
  const [selectedDevice, setSelectedDevice] = useState<'ios' | 'android' | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleDeviceSelect = (device: 'ios' | 'android') => {
    setSelectedDevice(device);
    setStep('email');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDevice || !email) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await onSubmit(email, selectedDevice);
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message,
      });

      if (result.success) {
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('device');
    setSelectedDevice(null);
    setEmail('');
    setMessage(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleBack = () => {
    setStep('device');
    setSelectedDevice(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Early Access 🚀
              </h2>
              <p className="text-gray-600">
                {step === 'device' 
                  ? 'Which device will you be using?' 
                  : 'Enter your email to join the waitlist'
                }
              </p>
            </div>

            {/* Device Selection Step */}
            {step === 'device' && (
              <motion.div
                initial={{ x: 0 }}
                className="space-y-4"
              >
                <button
                  onClick={() => handleDeviceSelect('ios')}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-3 group"
                >
                  <Apple className="w-8 h-8 text-gray-700 group-hover:text-blue-600" />
                  <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600">
                    iOS (iPhone/iPad)
                  </span>
                </button>

                <button
                  onClick={() => handleDeviceSelect('android')}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 flex items-center justify-center space-x-3 group"
                >
                  <Smartphone className="w-8 h-8 text-gray-700 group-hover:text-green-600" />
                  <span className="text-lg font-medium text-gray-700 group-hover:text-green-600">
                    Android
                  </span>
                </button>
              </motion.div>
            )}

            {/* Email Step */}
            {step === 'email' && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Selected device indicator */}
                  <div className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    {selectedDevice === 'ios' ? (
                      <Apple className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-green-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {selectedDevice === 'ios' ? 'iOS Device' : 'Android Device'}
                    </span>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Message */}
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'p-3 rounded-lg text-sm font-medium',
                        message.type === 'success' 
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      )}
                    >
                      {message.text}
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};