"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LoadingAnimation from "../../app/loading-lottie";

const RouteChangeLoader = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const prevPathnameRef = useRef<string>("");
    const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isInitialLoad = useRef(true);
    const navigationInProgress = useRef(false);

    useEffect(() => {
        if (isInitialLoad.current) {
            prevPathnameRef.current = pathname;
            isInitialLoad.current = false;
            return;
        }

        if (prevPathnameRef.current !== pathname) {
            // console.log(`Route changed: ${prevPathnameRef.current} -> ${pathname}`);
            requestAnimationFrame(() => {
                setLoading(false);
            });
            prevPathnameRef.current = pathname;
            navigationInProgress.current = false;
        }
    }, [pathname]);

    useEffect(() => {
        const startLoading = () => {
            if (navigationInProgress.current) return;

            // console.log("Starting loading animation");
            navigationInProgress.current = true;

            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
                loadingTimeoutRef.current = null;
            }

            requestAnimationFrame(() => {
                setLoading(true);
            });

            loadingTimeoutRef.current = setTimeout(() => {
                // console.log("Auto-hiding loading animation (timeout)");
                requestAnimationFrame(() => {
                    setLoading(false);
                });
                navigationInProgress.current = false;
            }, 3000);
        };

        const stopLoading = () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
                loadingTimeoutRef.current = null;
            }
            requestAnimationFrame(() => {
                setLoading(false);
            });
            navigationInProgress.current = false;
        };

        (window as any).routeLoader = { startLoading, stopLoading };

        const handleLinkClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a[href], [data-link]') as HTMLAnchorElement;

            if (link) {
                let href = link.getAttribute('href');

                if (!href) {
                    href = link.getAttribute('data-href') || link.getAttribute('data-link');
                }

                // SIMPLE SOLUTION: Block all hash links completely
                if (href === '#' || href?.startsWith('#')) {
                    return; // Don't trigger loading for hash links
                }

                // Block other non-navigation links
                if (href && (
                    href.startsWith('mailto:') ||
                    href.startsWith('tel:') ||
                    link.target ||
                    link.hasAttribute('download')
                )) {
                    return;
                }

                if (href) {
                    try {
                        const url = new URL(href, window.location.origin);
                        const currentUrl = new URL(window.location.href);

                        if (url.pathname !== currentUrl.pathname && url.origin === currentUrl.origin) {
                            // console.log(`Link clicked: navigating to ${url.pathname}`);
                            startLoading();
                        }
                    } catch (err) {
                        if (href.startsWith('/') && href !== window.location.pathname) {
                            // console.log(`Relative link clicked: ${href}`);
                            startLoading();
                        }
                    }
                }
            }
        };

        let navigationStarted = false;

        const originalPush = history.pushState;
        const originalReplace = history.replaceState;

        history.pushState = function (state, title, url) {
            if (!navigationStarted) {
                navigationStarted = true;
                // Skip loading animation for sign-in navigation (logout)
                const urlString = url?.toString() || '';
                if (!urlString.includes('/sign-in')) {
                    // console.log("Programmatic navigation detected (pushState)");
                    startLoading();
                }
                setTimeout(() => { navigationStarted = false; }, 100);
            }
            return originalPush.call(history, state, title, url);
        };

        history.replaceState = function (state, title, url) {
            if (!navigationStarted) {
                navigationStarted = true;
                const urlString = url?.toString() || '';
                if (!urlString.includes('/sign-in')) {
                    // console.log("Programmatic navigation detected (replaceState)");
                    startLoading();
                }
                setTimeout(() => { navigationStarted = false; }, 100);
            }
            return originalReplace.call(history, state, title, url);
        };

        const handlePopstate = () => {
            // console.log("Browser back/forward navigation detected");
            startLoading();
        };

        const handleBeforeUnload = () => {
            // console.log("Page unload detected");
            startLoading();
        };

        document.addEventListener('click', handleLinkClick, true);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement?.tagName === 'A') {
                handleLinkClick(e);
            }
        });
        window.addEventListener('popstate', handlePopstate);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('click', handleLinkClick, true);
            document.removeEventListener('keydown', (e) => {
                if (e.key === 'Enter' && document.activeElement?.tagName === 'A') {
                    handleLinkClick(e);
                }
            });
            window.removeEventListener('popstate', handlePopstate);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            history.pushState = originalPush;
            history.replaceState = originalReplace;
            delete (window as any).routeLoader;

            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        return () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            {children}
            <LoadingAnimation
                isVisible={loading}
                onComplete={() => {
                    // console.log("Animation completed");
                    if (loadingTimeoutRef.current) {
                        clearTimeout(loadingTimeoutRef.current);
                        loadingTimeoutRef.current = null;
                    }
                    requestAnimationFrame(() => {
                        setLoading(false);
                    });
                    navigationInProgress.current = false;
                }}
            />
        </>
    );
};

export default RouteChangeLoader;
