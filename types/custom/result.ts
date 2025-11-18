export interface Result {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
  publishedAt: string | null;
  locale: string | null;
  slug: string;
  image: ResultImage;
  widgets: ResultWidget[];
  seo: SeoData | null;
  createdBy: User;
  updatedBy: User;
  localizations: string[]; // If localized versions exist
}

export interface ResultImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: ImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  folder: string | null;
}

export interface ImageFormats {
  small?: ImageFormat;
  medium?: ImageFormat;
  thumbnail?: ImageFormat;
  [key: string]: ImageFormat | undefined;
}

export interface ImageFormat {
  url: string;
  width: number;
  height: number;
  ext: string;
  mime: string;
  size: number;
  path?: string | null;
}

export interface ResultWidget {
  __component: string; // e.g., "common.content-area"
  id: number;
  content: string; // HTML string
  enable_component: boolean | null;
}

export interface SeoData {
  // Extend as per your SEO structure in Strapi
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  [key: string]: any;
}

export interface User {
  id: number;
  documentId: string;
  firstname: string;
  lastname: string;
  username: string | null;
  email: string;
  password: string;
  resetPasswordToken: string | null;
  registrationToken: string | null;
  isActive: boolean;
  blocked: boolean;
  preferedLanguage: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}
