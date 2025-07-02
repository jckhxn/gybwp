# Growing Your Business With People!

## Description

This project is a modern web application designed specifically for the Growing Your Business With People podcast. Built with Next.js, it utilizes Sanity CMS for content management and the YouTube API for video content. The site is crafted to be fast, responsive, and easy to manage, providing an engaging platform for listeners to explore podcast episodes and related content.

## Features

- **Live Preview**: Instantly preview changes as you make them, ensuring your content looks perfect before publishing.
- **Easy-to-Use CMS**: Sanity CMS provides a flexible and powerful content management experience, making it simple to update and manage your site's content.
- **SEO and Open Graph**: Implemented SEO best practices and Open Graph meta tags to enhance search engine visibility and social media sharing.
- **JSON-LD for Google SEO**: Added JSON-LD structured data to improve search engine visibility and enhance the appearance of search results.
- **YouTube Integration**:
  - Browse and select videos from your YouTube channel within Sanity Studio
  - Manual URL entry with sync latest functionality for quick video import
  - Automatic episode pathname generation from YouTube titles
  - Configurable channel browsing via environment variables with pagination
  - Clean, SEO-friendly URL generation with smart slugification
- **Tech Stack**:
  - **Next.js**: A React framework for building fast and user-friendly web applications.
  - **Sanity CMS**: A headless CMS that provides a flexible and powerful content management experience.
  - **YouTube API**: Integration with YouTube to display video content dynamically.
  - **TailwindCSS**: A utility-first CSS framework for rapidly building custom designs.

## Environment Variables

Configure the following environment variables to enable automatic YouTube channel browsing:

```env
# YouTube Integration
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=your_channel_id_or_handle

# Example channel configurations:
# Channel ID: NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCdwBaZzOj1p8fA1Y2qdL1xA
# Channel Handle: NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=@channelname
# Channel URL: NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=https://youtube.com/@channelname
```

When `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` is configured, the YouTube plugin will:

- Automatically load the first 5 videos from your configured channel
- Allow loading more videos with the "Load More Videos" button
- Still provide manual URL entry and sync functionality for flexibility

Both tabs remain available:

- **Video URL Tab**: Direct video URL entry with sync latest functionality (default tab)
- **Browse Channel Tab**: Shows latest videos from your configured channel with pagination

See `.env.example` for a complete configuration template.
