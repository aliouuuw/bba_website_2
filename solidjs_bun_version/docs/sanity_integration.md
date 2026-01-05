# Sanity CMS Integration

## Overview

The blog section of the BBA website now integrates with Sanity CMS to serve news and articles dynamically, replacing the previous local markdown file system.

## Content Types

### News
- **Title**: Article title
- **Slug**: URL-friendly identifier
- **Preview**: Short description
- **Preview Image**: Featured image for the article
- **Content**: Rich text content with support for text blocks and images
- **DateTime**: Publication date and time

### Articles
- **Title**: Article title
- **Slug**: URL-friendly identifier
- **Preview**: Short description
- **Image**: Optional featured image
- **Content**: Rich text content with support for text blocks and images
- **Type**: Category (Article, Perspective, Case Study, Report, Newsletter)
- **File**: Optional file attachment
- **DateTime**: Publication date and time

## Setup

### 1. Environment Variables

Create a `.env` file in the `solidjs_bun_version` directory with your Sanity credentials:

```env
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

You can find these values in your Sanity project settings at https://sanity.io/manage

### 2. Dependencies

The following packages are installed:
- `@sanity/client` - Sanity API client
- `@sanity/image-url` - Image URL builder for Sanity images
- `@portabletext/to-html` - Converts Sanity's Portable Text to HTML

## Architecture

### Files Created

1. **`src/lib/sanity.ts`** - Sanity client configuration and image URL helper
2. **`src/lib/sanityTypes.ts`** - TypeScript types for Sanity content
3. **`src/lib/sanityApi.ts`** - API functions to fetch and transform content

### Data Flow

1. Blog routes use SolidJS `createResource` to fetch data asynchronously
2. `sanityApi.ts` queries Sanity CMS using GROQ queries
3. Content is transformed from Sanity format to the app's BlogPost format
4. Portable Text content is converted to HTML for rendering
5. Images are processed through Sanity's image pipeline with optimizations

## API Functions

### `getAllPosts()`
Fetches all news and articles, sorted by date (newest first).

### `getPostBySlug(slug: string)`
Fetches a single post by its slug. Searches both news and articles.

### `getNewsPosts()`
Fetches only news items.

### `getArticlePosts(type?: string)`
Fetches articles, optionally filtered by type (article, perspective, case_study, report, newsletter).

## Features

- **Async Loading**: Uses SolidJS resources for efficient data fetching
- **Loading States**: Shows loading indicators while fetching data
- **Error Handling**: Gracefully handles API errors
- **Image Optimization**: Automatically optimizes images through Sanity CDN
- **Rich Content**: Supports text, images, and embedded media in content
- **File Attachments**: Articles can include downloadable files
- **SEO-Friendly**: Proper meta tags and structured data

## Migration Notes

### What Changed
- Removed local markdown files from `content/blog/`
- Removed `blogData.ts` static data file
- Removed `generate-blog-data.ts` script
- Updated blog routes to use async data fetching

### What Stayed
- URL structure remains the same (`/blog` and `/blog/[slug]`)
- UI components and styling unchanged
- Date formatting and read time calculation preserved

## Content Management

To add or edit blog content:

1. Log in to your Sanity Studio
2. Create/edit News or Article documents
3. Fill in all required fields
4. Publish the document
5. Content will automatically appear on the website

## Development

Run the development server:
```bash
bun run dev
```

Type check:
```bash
bun run typecheck
```

Build for production:
```bash
bun run build
```

## Troubleshooting

### Posts not loading
- Verify environment variables are set correctly
- Check Sanity project ID and dataset name
- Ensure Sanity project has CORS configured for your domain

### Images not displaying
- Verify image assets are uploaded to Sanity
- Check image URL builder configuration
- Ensure images have proper references in content

### TypeScript errors
- Run `bun run typecheck` to identify issues
- Verify all types match Sanity schema definitions
