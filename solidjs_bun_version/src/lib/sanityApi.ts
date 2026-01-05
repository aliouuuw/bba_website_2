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
          return `<img src="${imageUrl}" alt="${value.alt || ''}" style="max-width: 100%; height: auto; margin: 2rem 0;" />`;
        },
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
