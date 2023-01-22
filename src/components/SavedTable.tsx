import clsx from 'clsx'
import { BellRing, Boxes } from 'lucide-react'
import { FC, ReactNode } from 'react'

import useCreateClock from 'hooks/use-clock'
import { useState } from 'react'
import useHelius from 'hooks/use-helius'

const SEED_QUEUE = 'thread'
interface Props {
  children?: ReactNode
  data: string[]
  remove: (mint: string) => void
}

export const SavedTable: FC<Props> = ({ data: mints, remove }) => {
  const { createQueue } = useCreateClock()
  const [isActive, setIsActive] = useState(false)
  const { createWebhook } = useHelius()

  return (
    <div className="overflow-x-auto">
      <table className="w-full table table-compact">
        <thead>
          <tr>
            <th>#</th>
            <th>mint</th>
            <th></th>
            <th></th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {mints.map((mint, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{mint}</td>
              <td>
                <Boxes
                  onClick={() => createWebhook()}
                  className={clsx(
                    'cursor-pointer',
                    isActive && 'text-yellow-400'
                  )}
                />
              </td>
              <td>
                <BellRing
                  onClick={() => createQueue()}
                  className={clsx(
                    'cursor-pointer',
                    isActive && 'text-yellow-400'
                  )}
                />
              </td>
              <td>
                <button className="text-rose-400" onClick={() => remove(mint)}>
                  remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
