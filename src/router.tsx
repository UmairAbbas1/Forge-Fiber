import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Cache data for 60s — prevents re-fetching on every window focus or
        // component remount, which was causing redundant Supabase round-trips.
        staleTime: 60_000,
        // Only retry once. The default (3 retries with exponential backoff) means
        // a single failed Supabase query can silently stall the UI for ~30 seconds
        // before surfacing an error.
        retry: 1,
        // Don't throw unhandled query errors into the React error boundary —
        // individual components should handle their own error states via isError.
        throwOnError: false,
        // Don't refetch when the user comes back to the tab. Data is already
        // fresh for 60s. This removes a whole class of unnecessary re-renders.
        refetchOnWindowFocus: false,
      },
      mutations: {
        // Mutations should still retry once on transient network failures.
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
