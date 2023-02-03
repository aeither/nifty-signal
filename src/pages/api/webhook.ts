// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Redis } from '@upstash/redis'
import { verifySignature } from '@upstash/qstash/nextjs'

const redis = Redis.fromEnv()

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Create a transaction
  if (req.method === 'POST') {
    const data = req.body

    for (let i = 0; i < data.length; i++) {
      // console.log(data[i].description)
      console.log('timestamp', data[i].timestamp.toString())

      const hsetStatus = await redis.hset('niftysignal', {
        [Date.now().toString()]: {
          description: data[i].description,
          feePayer: data[i].feePayer,
          signature: data[i].signature,
          type: data[i].type,
        },
      })
      console.log('🚀 hsetStatus: ', hsetStatus)
    }

    res.status(200).json({ data: 'sucessfully stored to Redis' })
  }

  // other methods
  res.status(200).end()
}

export default verifySignature(handler)

export const config = {
  api: {
    bodyParser: false,
  },
}
