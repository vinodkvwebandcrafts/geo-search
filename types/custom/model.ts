import { UID } from "@strapi/strapi";


export type Model = {
  uid: UID.ContentType;
  singularName: string;
  tableName: string;
  attributes: {
    id: {
      type: string;
      columnName: string;
    };
    documentId: {
      type: string;
      default: Function;
      columnName: string;
    };
    title: {
      type: string;
      columnName: string;
    };
    slug: {
      type: string;
      targetField: string;
      columnName: string;
    };
    image: {
      type: string;
      relation: string;
      target: string;
      morphBy: string;
    };
    description: {
      type: string;
      columnName: string;
    };
    widgets: {
      type: string;
      relation: string;
      joinTable: object;
    };
    seo: {
      type: string;
      relation: string;
      target: string;
      joinTable: object;
    };
    createdAt: {
      type: string;
      columnName: string;
    };
    updatedAt: {
      type: string;
      columnName: string;
    };
    publishedAt: {
      type: string;
      configurable: boolean;
      writable: boolean;
      visible: boolean;
      default: Function;
      columnName: string;
    };
    createdBy: {
      type: string;
      relation: string;
      target: string;
      configurable: boolean;
      writable: boolean;
      visible: boolean;
      useJoinTable: boolean;
      private: boolean;
      owner: boolean;
      joinColumn: object;
    };
    updatedBy: {
      type: string;
      relation: string;
      target: string;
      configurable: boolean;
      writable: boolean;
      visible: boolean;
      useJoinTable: boolean;
      private: boolean;
      owner: boolean;
      joinColumn: object;
    };
    locale: {
      writable: boolean;
      private: boolean;
      configurable: boolean;
      visible: boolean;
      type: string;
      columnName: string;
    };
    localizations: {
      type: string;
      relation: string;
      target: string;
      writable: boolean;
      private: boolean;
      configurable: boolean;
      visible: boolean;
      unstable_virtual: boolean;
      joinColumn: object;
    };
  };
  indexes: {
    name: string;
    columns: any[];
  }[];
  foreignKeys: {
    name: string;
    columns: any[];
    referencedTable: string;
    referencedColumns: any[];
    onDelete: string;
  }[];
  lifecycles: object;
  columnToAttribute: {
    id: string;
    document_id: string;
    title: string;
    slug: string;
    image: string;
    description: string;
    widgets: string;
    seo: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    createdBy: string;
    updatedBy: string;
    locale: string;
    localizations: string;
  };
};
