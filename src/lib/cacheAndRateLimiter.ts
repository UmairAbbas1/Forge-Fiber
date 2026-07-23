/**
 * Enterprise Production Caching & Rate Limiting Engine ($0 Cost)
 * Provides thread-safe in-memory caching (LRU with TTL) and token-bucket rate limiting
 * without external third-party subscriptions or credit cards.
 */

interface CacheEntry<T> {
  data: T;
  expiry: number;
  tags?: string[];
}

class MemoryCache {
  private store = new Map<string, CacheEntry<any>>();
  private maxEntries = 500;

  /**
   * Set cache entry with Key, Value, TTL (ms), and optional Tags
   */
  set<T>(key: string, data: T, ttlMs: number = 60_000, tags: string[] = []): void {
    // Evict oldest entry if at capacity
    if (this.store.size >= this.maxEntries) {
      const firstKey = this.store.keys().next().value;
      if (firstKey) this.store.delete(firstKey);
    }

    this.store.set(key, {
      data,
      expiry: Date.now() + ttlMs,
      tags,
    });
  }

  /**
   * Get valid unexpired cache entry
   */
  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiry) {
      this.store.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Invalidate specific key
   */
  invalidate(key: string): void {
    this.store.delete(key);
  }

  /**
   * Invalidate all entries matching tag
   */
  invalidateTag(tag: string): void {
    for (const [key, entry] of this.store.entries()) {
      if (entry.tags && entry.tags.includes(tag)) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.store.clear();
  }
}

export const appCache = new MemoryCache();

interface RateLimitBucket {
  tokens: number;
  lastRefill: number;
}

class TokenBucketRateLimiter {
  private buckets = new Map<string, RateLimitBucket>();

  /**
   * Check if action is allowed by rate limit
   * @param key Identifies client/action (e.g. "login:user@example.com")
   * @param maxTokens Maximum allowed burst tokens
   * @param refillIntervalMs Time to refill 1 token (e.g. 5000ms = 1 token per 5s)
   */
  isAllowed(key: string, maxTokens: number = 5, refillIntervalMs: number = 5000): { allowed: boolean; retryAfterSec?: number } {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      bucket = { tokens: maxTokens, lastRefill: now };
      this.buckets.set(key, bucket);
    }

    // Calculate refilled tokens
    const elapsed = now - bucket.lastRefill;
    const refilledTokens = Math.floor(elapsed / refillIntervalMs);

    if (refilledTokens > 0) {
      bucket.tokens = Math.min(maxTokens, bucket.tokens + refilledTokens);
      bucket.lastRefill = now;
    }

    if (bucket.tokens > 0) {
      bucket.tokens -= 1;
      return { allowed: true };
    }

    const retryAfterSec = Math.ceil((refillIntervalMs - (now - bucket.lastRefill)) / 1000);
    return { allowed: false, retryAfterSec: Math.max(1, retryAfterSec) };
  }
}

export const rateLimiter = new TokenBucketRateLimiter();
