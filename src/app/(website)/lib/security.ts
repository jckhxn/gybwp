// lib/security.ts
export function isBlockedPath(pathname: string): boolean {
  const blockedPatterns = [
    /\.env/i,
    /\.git/i,
    /\.php$/i,
    /wp-/i,
    /wordpress/i,
    /\.bak/i,
    /\.old/i,
    /\.backup/i,
    /admin\.php/i,
    /xmlrpc/i,
    /\.aws/i,
    /\.azure/i,
    /\.docker/i,
    /sitemap\.xml$/i,
    /sftp-config/i,
    /\.s3cfg/i,
    /phpinfo/i,
    /\.DS_Store/i,
    /_profiler/i,
    /_debug/i,
    /\/\d+\.php$/i,
    /\/[0-9a-f]{8,}\.php$/i,
  ];

  return blockedPatterns.some((pattern) => pattern.test(pathname));
}
