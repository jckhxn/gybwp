// Remove next-sanity dependency to avoid OpenTelemetry bundling issues
// Using plain string queries instead of groq template tag
import { remotionSanityClient, validateSanityConfig } from "./sanityClient";

// Simplified queries for step-by-step testing - using plain strings
const HOST_INFO_QUERY = `*[_type == "person" && isMainHost == true][0] {
  name,
  role,
  consultingProfile {
    bio
  }
}`;

const PLATFORM_DATA_QUERY = `*[_type == "page" && pathname.current == "/"][0] {
  sectionsBody[_type == "homeHero"][0] {
    platforms[] {
      name,
      url,
      logoImage {
        asset-> {
          url
        }
      }
    }
  }
}`;

// Main query - simplified and more resilient - using plain string
const VIDEO_INTRO_QUERY = `
{
  "latestEpisode": *[_type == "episode"] | order(_createdAt desc)[0] {
    _id,
    title,
    "pathname": pathname.current,
    youtube {
      title,
      thumbnail,
      episodeNumber,
      seasonNumber,
      blurb,
      id
    },
    guests[]-> {
      name,
      role,
      "slug": slug.current
    },
    _createdAt
  },
  "recentEpisodes": *[_type == "episode"] | order(_createdAt desc)[0...6] {
    _id,
    title,
    "pathname": pathname.current,
    youtube {
      title,
      thumbnail,
      episodeNumber,
      seasonNumber,
      id
    },
    guests[]-> {
      name
    },
    _createdAt
  },
  "hostInfo": *[_type == "person" && isMainHost == true][0] {
    name,
    role,
    consultingProfile {
      bio
    }
  },
  "platformData": *[_type == "page" && pathname.current == "/"][0] {
    sectionsBody[_type == "homeHero"][0] {
      platforms[] {
        name,
        url,
        logoImage {
          asset-> {
            url
          }
        }
      }
    }
  },
  "featuredArticles": *[_type == "article" && featured == true] | order(_createdAt desc)[0...3] {
    _id,
    title,
    company,
    publication,
    image,
    excerpt,
    date
  },
  "sponsorData": *[_type == "sponsor" && isActive == true] | order(tier desc) {
    name,
    logo,
    tier,
    description,
    website
  }
}`;

// Test individual queries first
export async function testIndividualQueries() {
  console.log('🧪 Testing individual queries...');
  
  try {
    console.log('Testing hostInfo query...');
    const hostInfo = await remotionSanityClient.fetch(HOST_INFO_QUERY);
    console.log('Host info result:', hostInfo);
    
    console.log('Testing platform data query...');
    const platformData = await remotionSanityClient.fetch(PLATFORM_DATA_QUERY);
    console.log('Platform data result:', platformData);
    
    return { hostInfo, platformData };
  } catch (error) {
    console.error('Individual query test failed:', error);
    return null;
  }
}

export interface VideoData {
  latestEpisode: {
    _id: string;
    title: string;
    pathname: string;
    youtube?: {
      title: string;
      thumbnail: string;
      episodeNumber: number;
      seasonNumber: number;
      blurb?: string;
      id: string;
    };
    guests?: Array<{
      name: string;
      role: string;
      slug: string;
    }>;
    sponsors?: Array<{
      name: string;
      logo: any;
      tier: string;
    }>;
    _createdAt: string;
  };
  recentEpisodes: Array<{
    _id: string;
    title: string;
    pathname: string;
    youtube?: {
      title: string;
      thumbnail: string;
      episodeNumber: number;
      seasonNumber: number;
      id: string;
    };
    guests?: Array<{
      name: string;
    }>;
    _createdAt: string;
  }>;
  featuredArticles: Array<{
    _id: string;
    title: string;
    company: string;
    publication: string;
    image: any;
    excerpt: string;
    date: string;
  }>;
  hostInfo: {
    name: string;
    role: string;
    consultingProfile?: {
      bio: string;
      services?: Array<{
        title: string;
        description: string;
      }>;
    };
  };
  platformData?: {
    sectionsBody: Array<{
      platforms?: Array<{
        name: string;
        url: string;
        logoImage: {
          asset: {
            url: string;
          };
        };
      }>;
    }>;
  };
  sponsorData: Array<{
    name: string;
    logo: any;
    tier: string;
    description: string;
    website: string;
  }>;
}

// Cache for video data to avoid multiple fetches during rendering
let cachedVideoData: VideoData | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchVideoData(): Promise<VideoData> {
  console.log('🎬 Fetching video data for Remotion...');
  
  // Return cached data if still valid
  const now = Date.now();
  if (cachedVideoData && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('📋 Using cached video data');
    return cachedVideoData;
  }

  // Check if Sanity is configured
  if (!validateSanityConfig()) {
    console.warn('⚠️ Remotion: Sanity not configured, using fallback data');
    return getFallbackVideoData();
  }

  try {
    console.log('🔄 Executing GROQ query...');
    console.log('Query:', VIDEO_INTRO_QUERY);
    
    // Test individual queries first if in debug mode
    if (process.env.NODE_ENV !== 'production') {
      await testIndividualQueries();
    }
    
    // Use client-side Sanity client
    const result = await remotionSanityClient.fetch<VideoData>(
      VIDEO_INTRO_QUERY,
      {} // no parameters needed for this query
    );

    console.log('✅ GROQ query successful!');
    console.log('📊 Raw result:', JSON.stringify(result, null, 2));
    console.log('📊 Data summary:', {
      hasLatestEpisode: !!result.latestEpisode,
      hasHostInfo: !!result.hostInfo,
      hasPlatformData: !!result.platformData,
      hostName: result.hostInfo?.name,
      hostRole: result.hostInfo?.role,
      platformCount: result.platformData?.sectionsBody?.[0]?.platforms?.length || 0,
      platformNames: result.platformData?.sectionsBody?.[0]?.platforms?.map(p => p.name) || []
    });

    // Update cache
    cachedVideoData = result;
    cacheTimestamp = now;

    return result;
  } catch (error) {
    console.error('❌ Error fetching video data:', error);
    console.error('Full error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Return fallback data if fetch fails
    console.log('🔄 Using fallback data due to fetch error');
    return getFallbackVideoData();
  }
}

// SVG placeholder for episode thumbnails - professional podcast design
const EPISODE_PLACEHOLDER_SVG = `data:image/svg+xml;base64,${btoa(`
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#CBA052;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2A6B74;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)"/>
  <circle cx="200" cy="150" r="40" fill="rgba(255,255,255,0.2)"/>
  <polygon points="185,135 185,165 215,150" fill="white"/>
  <text x="200" y="220" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">PODCAST EPISODE</text>
  <text x="200" y="240" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif" font-size="12">Growing Your Business With People</text>
</svg>
`)}`;

// Fallback data that matches your current placeholder content
function getFallbackVideoData(): VideoData {
  console.log('📋 Using fallback video data with SVG placeholders');
  
  return {
    latestEpisode: {
      _id: "fallback-episode",
      title: "Building High-Performance Teams",
      pathname: "/episodes/building-high-performance-teams",
      youtube: {
        title: "Building High-Performance Teams",
        thumbnail: EPISODE_PLACEHOLDER_SVG,
        episodeNumber: 142,
        seasonNumber: 5,
        blurb: "Discover the key strategies for creating teams that deliver exceptional results.",
        id: "dQw4w9WgXcQ"
      },
      guests: [
        {
          name: "Sarah Mitchell",
          role: "VP of Operations",
          slug: "sarah-mitchell"
        }
      ],
      _createdAt: new Date().toISOString()
    },
    recentEpisodes: [
      {
        _id: "episode-1",
        title: "Leadership in Crisis",
        pathname: "/episodes/leadership-in-crisis",
        youtube: {
          title: "Leadership in Crisis",
          thumbnail: EPISODE_PLACEHOLDER_SVG,
          episodeNumber: 141,
          seasonNumber: 5,
          id: "abc123"
        },
        guests: [{ name: "John Smith" }],
        _createdAt: new Date().toISOString()
      },
      {
        _id: "episode-2", 
        title: "Scaling Company Culture",
        pathname: "/episodes/scaling-company-culture",
        youtube: {
          title: "Scaling Company Culture",
          thumbnail: EPISODE_PLACEHOLDER_SVG,
          episodeNumber: 140,
          seasonNumber: 5,
          id: "def456"
        },
        guests: [{ name: "Jane Doe" }],
        _createdAt: new Date().toISOString()
      }
    ],
    featuredArticles: [
      {
        _id: "article-1",
        title: "The Future of Remote Leadership",
        company: "Harvard Business Review",
        publication: "HBR",
        image: null,
        excerpt: "How leaders can excel in the digital age",
        date: "2024-01-15"
      }
    ],
    hostInfo: {
      name: "Jeff Lackey",
      role: "CEO & Leadership Coach",
      consultingProfile: {
        bio: "Jeff helps leaders grow their businesses by investing in their people.",
        services: [
          {
            title: "Executive Coaching",
            description: "One-on-one leadership development"
          },
          {
            title: "Team Building",
            description: "Creating high-performance teams"
          }
        ]
      }
    },
    sponsorData: [
      {
        name: "Leadership Institute",
        logo: null,
        tier: "platinum",
        description: "Developing tomorrow's leaders today",
        website: "https://leadership-institute.com"
      }
    ]
  };
}

// Helper function to get episode thumbnail URL
export function getEpisodeThumbnail(episode?: VideoData['latestEpisode'] | VideoData['recentEpisodes'][0] | null): string {
  if (!episode) {
    return EPISODE_PLACEHOLDER_SVG;
  }
  if (episode.youtube?.thumbnail) {
    return episode.youtube.thumbnail;
  }
  // Return SVG placeholder instead of broken image URL
  return EPISODE_PLACEHOLDER_SVG;
}

// Helper function to format episode title
export function getEpisodeTitle(episode?: VideoData['latestEpisode'] | null): string {
  if (!episode) {
    return "Untitled Episode";
  }
  return episode.youtube?.title || episode.title || "Untitled Episode";
}

// Helper function to get episode URL
export function getEpisodeUrl(episode?: VideoData['latestEpisode'] | null): string {
  if (!episode) {
    return "#";
  }
  if (episode.youtube?.id) {
    return `https://www.youtube.com/watch?v=${episode.youtube.id}`;
  }
  return episode.pathname || "#";
}