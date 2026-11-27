/// <reference types="vite/client" />

declare module 'virtual:milkii-preview' {
  export const milkiiHtml: string;
  export const milkiiBackendConfig: {
    PLANS: Record<string, number>;
    LIMITS: Record<string, number>;
    DEFAULT_PAYMENT: Record<string, { label: string; number: string; holder: string }>;
    DEFAULT_LIMITS: Record<string, number>;
    REGIONS: Array<{
      v: string;
      en: string;
      om: string;
      am: string;
      cities: string[];
    }>;
    CATEGORIES: Record<string, unknown>;
  };
}
