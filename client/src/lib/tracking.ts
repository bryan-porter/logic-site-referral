/**
 * Client-side tracking utilities
 *
 * This module provides browser-only functions for tracking visitor behavior
 * and managing cookies. Ported from logic-health-site-c.
 */

const VISITOR_COOKIE_NAME = "ccm_vid";

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === name && value) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

/**
 * Set a cookie with the given name, value, and expiration
 * Default: 365 days, path=/, SameSite=Lax, Secure
 */
export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === "undefined") return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax; Secure`;
}

/**
 * Get or create a unique visitor ID
 * Returns existing visitor ID from cookie, or generates a new UUID and stores it
 */
export function getOrCreateVisitorId(): string {
  const existing = getCookie(VISITOR_COOKIE_NAME);
  if (existing) {
    return existing;
  }

  // Generate new UUID using Web Crypto API
  const visitorId = crypto.randomUUID();
  setCookie(VISITOR_COOKIE_NAME, visitorId);
  return visitorId;
}

/**
 * Get UTM parameters from current URL
 * Returns an object with all UTM params (or undefined for missing ones)
 */
export function getUtmParams(): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
} {
  if (typeof window === "undefined") return {};

  const searchParams = new URLSearchParams(window.location.search);

  return {
    utm_source: searchParams.get("utm_source") || undefined,
    utm_medium: searchParams.get("utm_medium") || undefined,
    utm_campaign: searchParams.get("utm_campaign") || undefined,
    utm_content: searchParams.get("utm_content") || undefined,
    utm_term: searchParams.get("utm_term") || undefined,
  };
}

/**
 * Get the document referrer
 */
export function getReferrer(): string | null {
  if (typeof document === "undefined") return null;
  return document.referrer || null;
}
