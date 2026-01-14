// Vercel Edge Middleware - Blocks malicious scanning attacks with rate limiting
// Place this file at the root of your Next.js project (same level as app/)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Security function to detect malicious paths
function isBlockedPath(pathname: string): boolean {
  const blockedPatterns = [
    /\.(env|git|sql|bak|backup|log|ini|conf|config)$/i,
    /\/(admin|phpmyadmin|wp-admin|wp-login|xmlrpc\.php)/i,
    /\.(php|asp|aspx|jsp)$/i,
    /\/\.well-known\/(security|admin)/i,
  ];

  return blockedPatterns.some((pattern) => pattern.test(pathname));
}

// Initialize Redis (only runs in Edge runtime on Vercel)
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

// Rate limiter: 30 requests per minute per IP (adjust as needed)
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 m"),
      analytics: true,
      prefix: "ratelimit",
    })
  : null;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // STEP 1: Check if IP is already banned
  if (redis) {
    const isBanned = await redis.get(`banned:${ip}`);
    if (isBanned) {
      console.log(`⛔ Blocked banned IP: ${ip} - Path: ${pathname}`);
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  // STEP 2: Rate limit ALL requests
  if (ratelimit && ip !== "unknown") {
    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      console.log(`🚫 Rate limited ${ip}: ${pathname} (${remaining}/${limit})`);
      return new NextResponse("Too Many Requests", {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": new Date(reset).toISOString(),
        },
      });
    }
  }

  // STEP 3: Block malicious patterns using shared security function
  if (isBlockedPath(pathname)) {
    console.log(`🛡️ Blocked malicious path from ${ip}: ${pathname}`);

    // Track suspicious behavior and auto-ban repeat offenders
    if (redis && ip !== "unknown") {
      const suspiciousKey = `suspicious:${ip}`;
      const count = await redis.incr(suspiciousKey);

      // Set expiration on first offense (1 hour window)
      if (count === 1) {
        await redis.expire(suspiciousKey, 3600);
      }

      // Auto-ban after 5 suspicious requests in 1 hour
      if (count >= 5) {
        await redis.setex(`banned:${ip}`, 86400, "1"); // 24 hour ban
        console.log(`⛔ AUTO-BANNED IP for 24h: ${ip} (${count} violations)`);

        // Optional: Send alert (uncomment and add your webhook)
        /*
        await fetch(process.env.DISCORD_WEBHOOK_URL!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🚨 **Auto-banned IP**: ${ip}\n**Violations**: ${count}\n**Last path**: ${pathname}\n**Duration**: 24 hours`
          })
        });
        */
      }
    }

    return new NextResponse(null, { status: 404 });
  }

  // STEP 4: Block path traversal attempts
  const url = request.nextUrl.toString();
  if (url.includes("..") || url.includes("%00") || url.includes("0x")) {
    console.log(`🛡️ Blocked path traversal from ${ip}: ${pathname}`);

    // Track as suspicious activity
    if (redis && ip !== "unknown") {
      await redis.incr(`suspicious:${ip}`);
      await redis.expire(`suspicious:${ip}`, 3600);
    }

    return new NextResponse(null, { status: 403 });
  }

  // STEP 5: Optional - Log suspicious user agents
  const userAgent = request.headers.get("user-agent") || "";
  const suspiciousAgents = [
    "nikto",
    "sqlmap",
    "nmap",
    "masscan",
    "nessus",
    "openvas",
    "acunetix",
    "burp",
    "zaproxy",
  ];

  if (
    suspiciousAgents.some((agent) => userAgent.toLowerCase().includes(agent))
  ) {
    console.log(`🤖 Suspicious user agent from ${ip}: ${userAgent}`);
    return new NextResponse("Forbidden", { status: 403 });
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)",
  ],
};
