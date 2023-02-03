import { useQuery } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export const NotificationTable: FC<Props> = () => {
  // const { data } = useSWR(
  //   () => '/api/webhook-db',
  //   async (url) => {
  //     return await fetch(url).then((r) => r.json())
  //   }
  // )

  const { data } = useQuery({
    queryKey: ['txs'],
    queryFn: async () => {
      return await fetch('/api/webhook-db').then((data) => data.json())
    },
  })

  return (
    <div className="overflow-x-auto">
      <h2>Hello </h2>
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>description</th>
            <th>type</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.txs.map((tx, i) => (
              <tr key={i}>
                <td>{tx.id}</td>
                <td>{tx.description}</td>
                <td>{tx.type}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
