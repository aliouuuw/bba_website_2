import { sanityClient, urlFor } from "./sanity";
import type { SanityNews, SanityArticle, BlogPost, SanityContent } from "./sanityTypes";
import { toHTML } from "@portabletext/to-html";

function calculateReadTime(content: SanityContent): string {
  const text = content
    .filter((block) => block._type === "block")
    .map((block: any) => 
      block.children?.map((child: any) => child.text).join(" ") || ""
    )
    .join(" ");
  
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

function convertPortableTextToHTML(content: SanityContent): string {
  return toHTML(content, {
    components: {
      types: {
        image: ({ value }: any) => {
          const imageUrl = urlFor(value).width(800).url();
          return `<figure style="margin: 2rem 0;"><img src="${imageUrl}" alt="${value.alt || ''}" loading="lazy" style="max-width: 100%; height: auto; display: block;" />${value.caption ? `<figcaption style="font-size: 0.875rem; color: #666; margin-top: 0.5rem; text-align: center;">${value.caption}</figcaption>` : ''}</figure>`;
        },
      },
      marks: {
        link: ({ value, children }: any) => {
          const href = value?.href || "#";
          const isExternal = href.startsWith("http") && (typeof window === "undefined" || !href.includes(window.location.hostname));
          const rel = isExternal ? 'rel="noopener noreferrer"' : "";
          const target = isExternal ? 'target="_blank"' : "";
          return `<a href="${href}" ${target} ${rel} style="color: var(--color-teal); text-decoration: underline;">${children}</a>`;
        },
      },
      block: {
        h1: ({ children }: any) => `<h1 style="font-size: 2rem; margin: 2rem 0 1rem; font-weight: 700;">${children}</h1>`,
        h2: ({ children }: any) => `<h2 style="font-size: 1.5rem; margin: 1.5rem 0 0.75rem; font-weight: 700;">${children}</h2>`,
        h3: ({ children }: any) => `<h3 style="font-size: 1.25rem; margin: 1.25rem 0 0.5rem; font-weight: 700;">${children}</h3>`,
        h4: ({ children }: any) => `<h4 style="font-size: 1.1rem; margin: 1rem 0 0.5rem; font-weight: 700;">${children}</h4>`,
        blockquote: ({ children }: any) => `<blockquote style="border-left: 4px solid var(--color-teal); padding-left: 1.5rem; margin: 1.5rem 0; font-style: italic; color: #666;">${children}</blockquote>`,
        normal: ({ children }: any) => `<p style="margin: 1rem 0; line-height: 1.6;">${children}</p>`,
      },
      list: {
        bullet: ({ children }: any) => `<ul style="margin: 1rem 0; padding-left: 2rem; list-style-type: disc;">${children}</ul>`,
        number: ({ children }: any) => `<ol style="margin: 1rem 0; padding-left: 2rem; list-style-type: decimal;">${children}</ol>`,
      },
      listItem: {
        bullet: ({ children }: any) => `<li style="margin: 0.5rem 0;">${children}</li>`,
        number: ({ children }: any) => `<li style="margin: 0.5rem 0;">${children}</li>`,
      },
    },
  });
}

function getCategoryFromType(type: string): string {
  const categoryMap: Record<string, string> = {
    article: "Article",
    perspective: "Perspective",
    case_study: "Case Study",
    report: "Report",
    newsletter: "Newsletter",
    news: "News",
  };
  return categoryMap[type] || "General";
}

function transformNewsToPost(news: SanityNews): BlogPost {
  return {
    id: news._id,
    slug: news.slug.current,
    title: news.title,
    date: news.datetime,
    category: "News",
    description: news.preview,
    readTime: calculateReadTime(news.content),
    content: news.content,
    htmlContent: convertPortableTextToHTML(news.content),
    image: news.preview_image ? urlFor(news.preview_image).width(800).url() : undefined,
    postType: "news",
  };
}

function transformArticleToPost(article: SanityArticle): BlogPost {
  return {
    id: article._id,
    slug: article.slug.current,
    title: article.title,
    date: article.datetime,
    category: getCategoryFromType(article.type),
    description: article.preview,
    readTime: calculateReadTime(article.content),
    content: article.content,
    htmlContent: convertPortableTextToHTML(article.content),
    image: article.image ? urlFor(article.image).width(800).url() : undefined,
    file: article.file?.asset?.url,
    postType: "article",
    articleType: article.type,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const query = `{
    "news": *[_type == "news" && defined(slug.current)] | order(datetime desc) {
      _id,
      _type,
      title,
      slug,
      preview,
      preview_image,
      content,
      datetime
    },
    "articles": *[_type == "article" && defined(slug.current)] | order(datetime desc) {
      _id,
      _type,
      title,
      slug,
      preview,
      image,
      content,
      type,
      file,
      datetime
    }
  }`;

  const result = await sanityClient.fetch<{
    news: SanityNews[];
    articles: SanityArticle[];
  }>(query);

  const newsPosts = result.news.map(transformNewsToPost);
  const articlePosts = result.articles.map(transformArticleToPost);

  const allPosts = [...newsPosts, ...articlePosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return allPosts;
}

export async function getRelatedPosts(args: {
  currentSlug: string;
  postType: "news" | "article";
  articleType?: SanityArticle["type"] | null;
}): Promise<BlogPost[]> {
  const query = `*[
    slug.current != $currentSlug &&
    (
      ($postType == "news" && _type == "news") ||
      ($postType == "article" && _type == "article" && (!defined($articleType) || type == $articleType))
    )
  ] | order(datetime desc)[0...3] {
    _id,
    _type,
    title,
    slug,
    preview,
    preview_image,
    image,
    content,
    type,
    datetime,
    file
  }`;

  const results = await sanityClient.fetch<any[]>(query, {
    currentSlug: args.currentSlug,
    postType: args.postType,
    articleType: args.articleType ?? null,
  });

  return results.map((post) =>
    post._type === "news" ? transformNewsToPost(post) : transformArticleToPost(post)
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const query = `{
    "news": *[_type == "news" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      preview,
      preview_image,
      content,
      datetime
    },
    "article": *[_type == "article" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      slug,
      preview,
      image,
      content,
      type,
      file,
      datetime
    }
  }`;

  const result = await sanityClient.fetch<{
    news: SanityNews | null;
    article: SanityArticle | null;
  }>(query, { slug });

  if (result.news) {
    return transformNewsToPost(result.news);
  }

  if (result.article) {
    return transformArticleToPost(result.article);
  }

  return undefined;
}

export async function getNewsPosts(): Promise<BlogPost[]> {
  const query = `*[_type == "news"] | order(datetime desc) {
    _id,
    _type,
    title,
    slug,
    preview,
    preview_image,
    content,
    datetime
  }`;

  const news = await sanityClient.fetch<SanityNews[]>(query);
  return news.map(transformNewsToPost);
}

export async function getArticlePosts(type?: string): Promise<BlogPost[]> {
  const typeFilter = type ? `&& type == "${type}"` : "";
  const query = `*[_type == "article" ${typeFilter}] | order(datetime desc) {
    _id,
    _type,
    title,
    slug,
    preview,
    image,
    content,
    type,
    file,
    datetime
  }`;

  const articles = await sanityClient.fetch<SanityArticle[]>(query);
  return articles.map(transformArticleToPost);
}
