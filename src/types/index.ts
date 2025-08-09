// TypeScript type definitions for PeePeePal landing page

export interface EmailSignupRequest {
  email: string;
  source?: string;
}

export interface EmailSignupResponse {
  success: boolean;
  message: string;
}

export interface BenefitCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon?: string;
  highlights?: string[];
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export interface EmailFormData {
  email: string;
}

export interface PhoneMockupProps {
  className?: string;
}

export type SignupSource = 'hero_cta' | 'final_cta' | 'unknown';