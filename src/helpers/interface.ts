export interface Widget {
  __component: string;
  enable_component?: boolean;
  device?: string | null;
  [key: string]: any;
}

export interface ParamObj {
  widgets?: Widget[];
  pageData?: any;
  [key: string]: any;
}

export interface GetPageDataOptions {
  uid: string;
  query?: Record<string, any>;
  whereQuery?: Record<string, any>;
}

export interface CommonResponse {
  data: {
    seo: Record<string, any>;
    widgets?: any[];
  };
}

export interface MetaImage {
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  caption?: string;
  size?: number;
}

export interface MetaSocial {
  id?: number | string;
  socialNetwork?: string;
  title?: string;
  description?: string;
  link?: string;
  image?: {
    url?: string | null;
    alternativeText?: string;
  };
}

export interface SEOInput {
  id?: number | string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  metaRobots?: string;
  structuredData?: any;
  metaViewport?: string;
  canonicalURL?: string;
  metaImage?: MetaImage;
  metaSocial?: MetaSocial[];
}

export interface SEOComponent extends SEOInput {
  metaImage: {
    url: string;
    alternativeText: string;
  };
  metaSocial: MetaSocial[];
}

export interface SeoService {
  seoStructure(seo: SEOInput): Promise<SEOComponent>;
}