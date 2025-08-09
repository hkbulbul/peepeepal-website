'use client';

import React, { useState } from 'react';
import { PhoneMockupProps } from '@/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const PhoneMockup: React.FC<PhoneMockupProps> = ({ className }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={cn('relative flex justify-center items-center', className)}>
      {/* Display the 3D perspective phone image naturally */}
      {!imageError && (
        <Image
          src="/mockups/image.png"
          alt="Phone mockup"
          width={400}
          height={600}
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          priority
        />
      )}
      
      {/* Fallback content - shown when image fails to load */}
      {imageError && (
        <div className="w-[400px] h-[600px] bg-gradient-to-b from-sky-400 to-sky-500 rounded-3xl flex items-center justify-center">
          <p className="text-white text-lg font-semibold">Phone Mockup</p>
        </div>
      )}
    </div>
  );
};

export default PhoneMockup;