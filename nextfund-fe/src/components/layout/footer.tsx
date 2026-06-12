import React, { useState } from 'react';
import { FOOTER_LINKS, SOCIAL_MEDIA_LINKS } from '../../constants/landing-page-data';
import { Button, Input } from '../General/ui';

interface FooterLink {
  label: string;
  href: string;
}

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden rounded-t-[3rem]" style={{ backgroundColor: '#043A66', minHeight: '650px' }}>
      {/* Large Background Text */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
        <div
          className="text-[20rem] font-bold select-none leading-none"
          style={{
            color: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateY(25%)'
          }}
        >
          NexFund
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="text-2xl font-bold text-white">NexFund</div>
              </div>

              {/* Description */}
              <p className="leading-relaxed max-w-sm text-sm text-white opacity-90">
                Connecting investors with vetted, real-world businesses for transparent and impactful investments.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3">
                {SOCIAL_MEDIA_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:bg-gray-400 hover:bg-opacity-20"
                    style={{
                      color: '#FFFFFF'
                    }}
                    aria-label={social.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={social.icon} alt={social.label} className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Platform Links */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-white">Platform</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.platform.map((link: FooterLink) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:text-white text-white opacity-80 hover:opacity-100 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-white">Resources</h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.resources.map((link: FooterLink) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="transition-colors duration-200 hover:text-white text-white opacity-80 hover:opacity-100 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-white">Subscribe to our newsletter</h3>
              <p className="text-sm text-white opacity-80">
                Get the latest investment opportunities and news delivered to your inbox.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <div className="flex rounded-[2rem] !bg-[#043A66] overflow-hidden items-stretch" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                    <div className="flex-1 flex items-stretch">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none px-4 py-3 text-sm text-white placeholder-white placeholder-opacity-60 h-full"
                        sx={{
                          '& .MuiInputBase-root': {
                            height: '100%',
                            backgroundColor: 'transparent',
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                            '&::placeholder': {
                              color: 'rgba(255, 255, 255, 0.6)',
                              opacity: 1,
                            },
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                          '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                          },
                        }}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      className="px-6 py-3 text-sm font-medium flex-shrink-0"
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#043A66',
                        borderRadius: '0',
                        minWidth: '120px'
                      }}
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright and Legal Links */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-[#ffffff] opacity-80">
              © 2025 Nexfund. All rights reserved
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-200 text-white opacity-80 hover:opacity-100 hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};