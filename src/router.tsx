import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Cache data for 10s fresh window
        staleTime: 10_000,
        // Keep in memory for 5 minutes (300,000ms) for 0ms instant page loads
        gcTime: 300_000,
        // Fail fast on network errors to prevent UI freezing
        retry: 1,
        throwOnError: false,
        // Disable window focus refetching to eliminate tab-switch re-render stutter
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        retry: 1,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // 0 = always re-check preloaded data. Fine — actual staleness is governed
    // by the QueryClient staleTime above, not this router-level setting.
    defaultPreloadStaleTime: 0,
  });

  return router;
};
