import type { Request, Response, NextFunction } from "express";

interface Bucket {
  hits: number[];
}

/**
 * Rate limit simples por IP, em memória. Não precisa ser distribuído: serve
 * para conter rajadas de um mesmo cliente, não para ser um WAF.
 */
export function rateLimit(options: { windowMs: number; max: number }) {
  const buckets = new Map<string, Bucket>();

  // Evita que o mapa cresça indefinidamente com IPs que não voltam.
  const sweep = setInterval(() => {
    const cutoff = Date.now() - options.windowMs;
    const stale: string[] = [];
    buckets.forEach((bucket, key) => {
      if (bucket.hits.every((hit) => hit <= cutoff)) stale.push(key);
    });
    stale.forEach((key) => buckets.delete(key));
  }, options.windowMs);
  sweep.unref?.();

  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip ?? req.socket.remoteAddress ?? "unknown";
    const now = Date.now();
    const cutoff = now - options.windowMs;

    const bucket = buckets.get(key) ?? { hits: [] };
    bucket.hits = bucket.hits.filter((hit) => hit > cutoff);

    if (bucket.hits.length >= options.max) {
      buckets.set(key, bucket);
      res.setHeader("Retry-After", Math.ceil(options.windowMs / 1000));
      return res.status(429).json({ message: "Muitas tentativas seguidas." });
    }

    bucket.hits.push(now);
    buckets.set(key, bucket);
    next();
  };
}
