import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client!: Redis;

  onModuleInit() {
    const host = process.env.REDIS_HOST || 'localhost';
    const port = parseInt(process.env.REDIS_PORT || '6379', 10);
    const password = process.env.REDIS_PASSWORD || undefined;

    this.client = new Redis({
      host,
      port,
      password,
      lazyConnect: true,
      retryStrategy: (times) => Math.min(times * 100, 3000),
    });

    this.client.on('connect', () => this.logger.log('Redis connected successfully'));
    this.client.on('error', (err) => this.logger.warn(`Redis Connection Warning: ${err.message}`));
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch {
      return null;
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    try {
      if (ttlSeconds) {
        await this.client.set(key, value, 'EX', ttlSeconds);
      } else {
        await this.client.set(key, value);
      }
    } catch (err: any) {
      this.logger.warn(`Redis set failed for key ${key}: ${err.message}`);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch {}
  }

  onModuleDestroy() {
    this.client.disconnect();
  }
}
