// Vercel Edge Middleware - Blocks malicious scanning attacks
// Place this file at the root of your Next.js project (same level as pages/)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

  // Block specific malicious patterns found in your logs
  const blockedPatterns = [
    // Environment & Config Files
    /\.env/i,
    /\.git/i,
    /\.aws/i,
    /\.azure/i,
    /\.gcloud/i,
    /\.docker/i,
    /\.vscode/i,
    /\.s3cfg/i,
    /\.secrets/i,
    /\.api_keys/i,

    // PHP Files (you're not running PHP!)
    /\.php$/i,

    // WordPress Paths (not applicable to your site)
    /\/wp-content/i,
    /\/wp-admin/i,
    /\/wp-includes/i,
    /\/wordpress/i,

    // Backup & Old Files
    /\.bak$/i,
    /\.old$/i,
    /\.backup$/i,
    /\.save$/i,
    /\~$/i,

    // Debug & Profiler Paths
    /\/_debug/i,
    /\/_profiler/i,
    /\/phpinfo/i,

    // Admin Panels (block if you don't use these paths)
    /\/admin\.php/i,
    /\/administrator/i,

    // Common Exploit Paths
    /\/\.well-known\/.*\.php$/i,
    /\/\.DS_Store$/i,
    /\/\.dockerenv$/i,
    /\/\.dockerignore$/i,

    // Suspicious numeric/random PHP files
    /\/[0-9a-f]{2,}\.php$/i,
    /\/\d+\.php$/i,
  ];

  // Check if pathname matches any blocked pattern
  if (blockedPatterns.some((pattern) => pattern.test(pathname))) {
    console.log(`🛡️ Blocked malicious path from ${ip}: ${pathname}`);
    return new NextResponse(null, { status: 404 });
  }

  // Block suspicious query parameters
  const url = request.nextUrl.toString();
  if (url.includes("..") || url.includes("%00") || url.includes("0x")) {
    console.log(`🛡️ Blocked path traversal attempt from ${ip}: ${pathname}`);
    return new NextResponse(null, { status: 403 });
  }

  // Optional: Block known attacking AWS IPs (top 20 from your logs)
  // Uncomment if you want to block these specific IPs
  /*
  const blockedIPs = [
    '98.94.22.59', '3.86.254.150', '34.236.171.236', '3.236.114.217',
    '54.173.30.155', '18.232.70.175', '3.84.211.215', '3.95.240.47',
    '52.207.33.43', '54.221.28.86', '54.210.66.9', '34.203.12.141',
    '54.204.92.118', '18.213.110.44', '100.28.211.48', '44.193.82.19',
    '13.218.200.116', '3.235.175.168', '13.222.192.95', '3.236.160.162'
  ];
  
  if (blockedIPs.includes(ip)) {
    console.log(`🛡️ Blocked known attacker IP: ${ip}`);
    return new NextResponse('Forbidden', { status: 403 });
  }
  */

  // Optional: Log legitimate requests for monitoring
  // Comment out in production to reduce logs
  if (process.env.NODE_ENV === "development") {
    console.log(`✅ Allowed request from ${ip}: ${pathname}`);
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (if you store them in /public)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
