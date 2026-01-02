import { useState, useEffect, useCallback } from "react";

const TAKEOVER_HASH = "#apply";

/**
 * Hook for managing full-page takeover state with URL hash synchronization.
 *
 * Features:
 * - Syncs takeover open/close state with URL hash (#apply)
 * - Handles browser back/forward button navigation
 * - Opens takeover on page load if hash is present
 * - Clean URL management (removes hash on close)
 *
 * @returns {Object} { isOpen, openTakeover, closeTakeover }
 */
export function useTakeover() {
  const [isOpen, setIsOpen] = useState(false);

  // Check if hash is present on mount
  useEffect(() => {
    if (window.location.hash === TAKEOVER_HASH) {
      setIsOpen(true);
    }
  }, []);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const hashPresent = window.location.hash === TAKEOVER_HASH;
      setIsOpen(hashPresent);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Open the takeover and update URL
  const openTakeover = useCallback(() => {
    // Push new history state with hash
    window.history.pushState({ takeover: true }, "", TAKEOVER_HASH);
    setIsOpen(true);
  }, []);

  // Close the takeover and update URL
  const closeTakeover = useCallback(() => {
    // Check if current hash is the takeover hash
    if (window.location.hash === TAKEOVER_HASH) {
      // Go back in history to remove the hash
      window.history.back();
    }
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openTakeover,
    closeTakeover,
  };
}
