import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'

dotenv.config()

export const redis = new Redis({
  // ✅ REMOVE the backticks from these lines
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const data = await redis.set("foo", "bar");