export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface SanityBlock {
  _type: "block";
  _key: string;
  style?: string;
  children: Array<{
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    [key: string]: any;
  }>;
}

export interface SanityImageBlock {
  _type: "image";
  _key: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export type SanityContent = Array<SanityBlock | SanityImageBlock>;

export interface SanityNews {
  _id: string;
  _type: "news";
  title: string;
  slug: {
    current: string;
  };
  preview: string;
  preview_image: SanityImage;
  content: SanityContent;
  datetime: string;
}

export interface SanityArticle {
  _id: string;
  _type: "article";
  title: string;
  slug: {
    current: string;
  };
  preview: string;
  image?: SanityImage;
  content: SanityContent;
  type: "article" | "perspective" | "case_study" | "report" | "newsletter";
  file?: {
    asset: {
      _ref: string;
      _type: "reference";
      url?: string;
    };
  };
  datetime: string;
}

export type SanityPost = SanityNews | SanityArticle;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  readTime: string;
  content: SanityContent;
  htmlContent: string;
  image?: string;
  file?: string;
  postType: "news" | "article";
  articleType?: "article" | "perspective" | "case_study" | "report" | "newsletter";
}
