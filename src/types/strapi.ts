interface StrapiImage {
  data: {
    attributes: {
      url: string;
      formats?: {
        large?: { url: string };
        medium?: { url: string };
        small?: { url: string };
        thumbnail?: { url: string };
      };
    };
  };
}

export interface StrapiContent {
  id: number;
  attributes: {
    Title: string;
    content: any[];
    thumbnail: StrapiImage;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiResponse {
  data: StrapiContent[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
