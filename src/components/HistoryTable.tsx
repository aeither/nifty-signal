import { FC, ReactNode } from 'react'
import moment from 'moment'

export interface History {
  description: string
  type: string
  source: string
  fee: number
  feePayer: string
  signature: string
  slot: number
  timestamp: number
  tokenTransfers: []
}

interface Props {
  children?: ReactNode
  data: History[]
}

export const HistoryTable: FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>description</th>
            <th>fee</th>
            <th>comtimestamppany</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((tx, i) => (
              <tr key={i}>
                <td>{tx.description}</td>
                <td>{tx.fee}</td>
                <td>{moment(tx.timestamp * 1000).fromNow()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
