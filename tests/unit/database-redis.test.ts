import { ProductionRedisClient } from '../../packages/database/src/redis.client';

describe('ProductionRedisClient Caching & Resilience Suite', () => {
  let redisClient: ProductionRedisClient;

  beforeEach(() => {
    redisClient = new ProductionRedisClient();
  });

  it('should store and retrieve cached string values', async () => {
    await redisClient.set('test_key_1', 'cached_payload');
    const val = await redisClient.get('test_key_1');
    expect(val).toBe('cached_payload');
  });

  it('should return null for non-existent cache keys', async () => {
    const val = await redisClient.get('missing_key_99');
    expect(val).toBeNull();
  });

  it('should support object JSON serialization and deserialization', async () => {
    const data = { noteId: 'note_123', title: 'Calculus Derivatives' };
    await redisClient.set('note_cache', JSON.stringify(data));

    const raw = await redisClient.get('note_cache');
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!);
    expect(parsed.title).toBe('Calculus Derivatives');
  });

  it('should delete cached entries correctly', async () => {
    await redisClient.set('key_to_delete', 'value');
    await redisClient.del('key_to_delete');
    const val = await redisClient.get('key_to_delete');
    expect(val).toBeNull();
  });
});
