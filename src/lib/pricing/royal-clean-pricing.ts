/**
 * Royal Clean UAE Pricing System
 * Provides pricing calculations for various cleaning services across different property types
 */

export interface ServicePricing {
  studio: number;
  apartment: number;
  villa: number;
}

export interface PricingCalculation {
  basePrice: number;
  discountAmount: number;
  finalPrice: number;
  currency: string;
}

// Base pricing for Royal Clean services (in AED)
export const ROYAL_CLEAN_PRICING: Record<string, ServicePricing> = {
  'deep-cleaning': {
    studio: 150,
    apartment: 250,
    villa: 500,
  },
  'regular-cleaning': {
    studio: 120,
    apartment: 200,
    villa: 400,
  },
  'move-in-out': {
    studio: 180,
    apartment: 300,
    villa: 600,
  },
  'carpet-cleaning': {
    studio: 100,
    apartment: 180,
    villa: 350,
  },
  'window-cleaning': {
    studio: 80,
    apartment: 150,
    villa: 300,
  },
  'disinfection': {
    studio: 130,
    apartment: 220,
    villa: 450,
  },
};

export type PropertyType = 'studio' | 'apartment' | 'villa';
export type ServiceType = keyof typeof ROYAL_CLEAN_PRICING;

/**
 * Calculate pricing for a service with optional discount
 */
export function calculatePrice(
  serviceType: ServiceType,
  propertyType: PropertyType,
  discountPercentage: number = 0
): PricingCalculation {
  const pricing = ROYAL_CLEAN_PRICING[serviceType];
  if (!pricing) {
    throw new Error(`Unknown service type: ${serviceType}`);
  }

  const basePrice = pricing[propertyType];
  if (basePrice === undefined) {
    throw new Error(`Unknown property type: ${propertyType}`);
  }

  const discountAmount = (basePrice * discountPercentage) / 100;
  const finalPrice = basePrice - discountAmount;

  return {
    basePrice,
    discountAmount,
    finalPrice,
    currency: 'AED',
  };
}

/**
 * Get formatted price string
 */
export function formatPrice(price: number): string {
  return `${price.toFixed(0)} AED`;
}

/**
 * Get service display name
 */
export function getServiceDisplayName(serviceType: ServiceType): string {
  const names: Record<ServiceType, string> = {
    'deep-cleaning': 'Deep Cleaning',
    'regular-cleaning': 'Regular Cleaning',
    'move-in-out': 'Move In/Out Cleaning',
    'carpet-cleaning': 'Carpet Cleaning',
    'window-cleaning': 'Window Cleaning',
    'disinfection': 'Disinfection Service',
  };
  return names[serviceType] || serviceType;
}

/**
 * Get all available services
 */
export function getAllServices(): { value: ServiceType; label: string }[] {
  return Object.keys(ROYAL_CLEAN_PRICING).map((key) => ({
    value: key as ServiceType,
    label: getServiceDisplayName(key as ServiceType),
  }));
}
