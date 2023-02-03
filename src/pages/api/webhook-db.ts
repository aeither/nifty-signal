// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const DATABASE_KEY = 'niftysignal'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // List of transactions
  if (req.method === 'GET') {
    const _data = await redis.hgetall<Record<string, object>>(DATABASE_KEY)
    const data = Object.entries(_data ?? {}).map(([key, value]) => ({
      id: key,
      ...value,
    }))
    const sortedData = data.sort((a, b) => parseInt(b.id) - parseInt(a.id))
    res.status(200).json({ txs: sortedData })
  }
}
