/**
 * Enterprise Production Asynchronous Event Queue & Worker Processor ($0 Cost)
 * Offloads long-running heavy tasks (bulk Excel processing, audit log streaming,
 * notification processing, and report exports) off the main thread.
 */

export interface QueueJob<T = any> {
  id: string;
  type: string;
  payload: T;
  retries: number;
  maxRetries: number;
  status: "pending" | "processing" | "completed" | "failed";
  error?: string;
  createdAt: number;
}

type JobHandler<T = any> = (payload: T) => Promise<any>;

class BackgroundEventQueue {
  private queue: QueueJob[] = [];
  private handlers = new Map<string, JobHandler>();
  private isProcessing = false;
  private listeners = new Set<(job: QueueJob) => void>();

  /**
   * Register a job processor for a specific event type
   */
  registerHandler<T>(type: string, handler: JobHandler<T>): void {
    this.handlers.set(type, handler);
  }

  /**
   * Subscribe to queue job state updates
   */
  subscribe(listener: (job: QueueJob) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Enqueue a new background job
   */
  enqueue<T>(type: string, payload: T, maxRetries: number = 3): string {
    const jobId = `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const job: QueueJob<T> = {
      id: jobId,
      type,
      payload,
      retries: 0,
      maxRetries,
      status: "pending",
      createdAt: Date.now(),
    };

    this.queue.push(job);
    this.notifyListeners(job);

    // Kick off worker loop asynchronously
    setTimeout(() => this.processNext(), 0);

    return jobId;
  }

  /**
   * Worker Execution Loop
   */
  private async processNext(): Promise<void> {
    if (this.isProcessing) return;

    const pendingJob = this.queue.find((j) => j.status === "pending");
    if (!pendingJob) return;

    this.isProcessing = true;
    pendingJob.status = "processing";
    this.notifyListeners(pendingJob);

    const handler = this.handlers.get(pendingJob.type);

    if (!handler) {
      pendingJob.status = "failed";
      pendingJob.error = `No handler registered for event type "${pendingJob.type}"`;
      this.notifyListeners(pendingJob);
      this.isProcessing = false;
      this.processNext();
      return;
    }

    try {
      await handler(pendingJob.payload);
      pendingJob.status = "completed";
      this.notifyListeners(pendingJob);
    } catch (err: any) {
      pendingJob.retries += 1;
      if (pendingJob.retries < pendingJob.maxRetries) {
        pendingJob.status = "pending"; // Re-queue for retry
      } else {
        pendingJob.status = "failed";
        pendingJob.error = err.message || "Execution failed";
      }
      this.notifyListeners(pendingJob);
    } finally {
      this.isProcessing = false;
      // Continue processing remaining queue
      setTimeout(() => this.processNext(), 10);
    }
  }

  private notifyListeners(job: QueueJob): void {
    this.listeners.forEach((listener) => listener({ ...job }));
  }

  /**
   * Get current queue metrics
   */
  getMetrics(): { pending: number; processing: number; completed: number; failed: number } {
    return {
      pending: this.queue.filter((j) => j.status === "pending").length,
      processing: this.queue.filter((j) => j.status === "processing").length,
      completed: this.queue.filter((j) => j.status === "completed").length,
      failed: this.queue.filter((j) => j.status === "failed").length,
    };
  }
}

export const eventQueue = new BackgroundEventQueue();
