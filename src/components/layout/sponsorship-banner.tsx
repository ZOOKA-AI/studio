'use client';

import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export function SponsorshipBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner
    const isDismissed = localStorage.getItem('sponsorBannerDismissed');
    const dismissedTime = isDismissed ? parseInt(isDismissed) : 0;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    // Show banner if not dismissed or if 7 days have passed since dismissal
    if (!isDismissed || (now - dismissedTime) > sevenDays) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('sponsorBannerDismissed', Date.now().toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-white/20 p-2">
              <Heart className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mr-3 truncate font-medium">
              <span className="md:hidden">ادعم تطوير المشروع!</span>
              <span className="hidden md:inline">
                هل يعجبك هذا المشروع؟ ادعمنا على GitHub Sponsors لمواصلة تطوير الأدوات المجانية للجميع
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="https://github.com/sponsors/ZOOKA-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-purple-600 shadow-sm hover:bg-purple-50 transition-colors"
            >
              ادعم المشروع
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:mr-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleDismiss}
              className="hover:bg-white/10 text-white"
            >
              <span className="sr-only">إغلاق</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
