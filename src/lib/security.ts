/**
 * Security utilities for blocking malicious requests
 * Used in middleware.ts to protect against bot scans and vulnerability probes
 */

/**
 * Check if a pathname matches known attack patterns
 * Returns true if the path should be blocked
 */
export function isBlockedPath(pathname: string): boolean {
  const lowerPath = pathname.toLowerCase();

  // Block WordPress/PHP probes
  if (
    lowerPath.includes(".php") ||
    lowerPath.includes("wp-") ||
    lowerPath.includes("wordpress") ||
    lowerPath.includes("xmlrpc")
  ) {
    return true;
  }

  // Block environment file probes
  if (
    lowerPath.includes(".env") ||
    lowerPath.includes(".git") ||
    lowerPath.includes(".aws") ||
    lowerPath.includes(".ssh")
  ) {
    return true;
  }

  // Block config file probes
  if (
    lowerPath.includes("config.json") ||
    lowerPath.includes("sftp-config") ||
    lowerPath.includes("database.yml") ||
    lowerPath.includes(".htaccess") ||
    lowerPath.includes("web.config")
  ) {
    return true;
  }

  // Block common admin/login probes
  if (
    lowerPath === "/admin" ||
    lowerPath === "/login" ||
    lowerPath === "/administrator" ||
    lowerPath === "/phpmyadmin" ||
    lowerPath === "/adminer"
  ) {
    return true;
  }

  // Block suspicious extensions
  const suspiciousExtensions = [
    ".asp",
    ".aspx",
    ".jsp",
    ".cgi",
    ".pl",
    ".py",
    ".sh",
    ".bat",
    ".exe",
    ".dll",
    ".so",
  ];

  if (suspiciousExtensions.some((ext) => lowerPath.endsWith(ext))) {
    return true;
  }

  return false;
}
