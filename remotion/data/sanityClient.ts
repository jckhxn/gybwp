import { createClient } from "@sanity/client";

// Debug logging for environment variables
console.log('🔍 Remotion Sanity Environment Variables:');
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('NEXT_PUBLIC_SANITY_API_VERSION:', process.env.NEXT_PUBLIC_SANITY_API_VERSION);

// Client-side Sanity client for Remotion
// Uses only NEXT_PUBLIC_ environment variables that are available in browser context
export const remotionSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", 
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-06-21",
  useCdn: true, // Use CDN for better performance in client-side context
  perspective: "published", // Only fetch published content for video
});

// Fallback configuration if environment variables are not available
const fallbackConfig = {
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2023-06-21",
};

// Validate client configuration
export function validateSanityConfig(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  console.log('🔧 Validating Sanity config...');
  console.log('Project ID:', projectId ? '✅ Found' : '❌ Missing');
  console.log('Dataset:', dataset ? '✅ Found' : '❌ Missing');
  
  if (!projectId || !dataset) {
    console.warn('⚠️ Remotion: Sanity environment variables not found, using fallback data');
    return false;
  }
  
  console.log('✅ Sanity configuration valid');
  return true;
}

// Helper function to check if Sanity is configured and available
export async function testSanityConnection(): Promise<boolean> {
  try {
    // Simple query to test connection
    await remotionSanityClient.fetch('*[_type == "episode"][0]._id');
    return true;
  } catch (error) {
    console.warn('Remotion: Sanity connection failed:', error);
    return false;
  }
}