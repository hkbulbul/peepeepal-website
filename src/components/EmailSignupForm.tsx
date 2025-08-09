'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { EmailFormData, SignupSource } from '@/types';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

interface EmailSignupFormProps {
  isOpen: boolean;
  onClose: () => void;
  source?: SignupSource;
  title?: string;
  description?: string;
}

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({
  isOpen,
  onClose,
  source = 'hero',
  title = 'Get Early Access to PeePeePal! 🚀',
  description = 'Be the first to know when we launch and get exclusive early access to the app.',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          source,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        reset();
        // Auto-close after 3 seconds
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      setSubmitStatus('idle');
      setErrorMessage('');
      reset();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="">
      <div className="text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </motion.div>

        {/* Success State */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">You&apos;re on the list!</h3>
              <p className="text-gray-600 mb-4">
                We&apos;ll notify you as soon as PeePeePal is ready to download.
              </p>
              <p className="text-sm text-gray-500">
                This window will close automatically in a few seconds...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        {submitStatus !== 'success' && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all duration-200"
                disabled={isSubmitting}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1 text-left"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Error Message */}
            {submitStatus === 'error' && errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-3"
              >
                <p className="text-red-600 text-sm">{errorMessage}</p>
              </motion.div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing up...</span>
                </div>
              ) : (
                'Get Early Access 🚀'
              )}
            </Button>

            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. No spam, just updates about PeePeePal.
            </p>
          </motion.form>
        )}
      </div>
    </Modal>
  );
};

export default EmailSignupForm;