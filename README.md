# Growing Your Business With People

A Next.js 15 podcast website with Sanity CMS integration, featuring a dynamic page builder architecture and YouTube API integration.

## Tech Stack

- **Next.js 15** with App Router
- **Sanity CMS** for content management
- **TailwindCSS** + **shadcn/ui** for styling
- **TypeScript** throughout
- **YouTube API** integration for video content

## Features

- Dynamic page builder with modular sections
- Podcast episode management with transcripts
- YouTube video sync with automatic slug generation
- Responsive design with dark/light theme support
- SEO optimization with structured data
- Guest and sponsor management
- Live preview functionality

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Architecture

The application uses a dynamic catch-all route system with Sanity CMS as the content backend. Pages are built using reusable section components managed through Sanity's page builder interface.

## Content Management

Access the Sanity Studio at `/dash` to manage:
- Episodes and transcripts
- Guest and host profiles
- Sponsors and partnerships
- Page content and layouts
- Site settings and configuration

## Deployment

Configured for deployment on Vercel with automatic builds and preview deployments.