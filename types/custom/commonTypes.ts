export type ID = string | number;
export interface Url {
  id: ID;
  documentId: string;
  locale?: string;
  createdAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  revalidate_url?: string;
}

