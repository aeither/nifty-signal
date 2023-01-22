import { Mints } from 'hooks/use-helius'
import { FC, ReactNode } from 'react'

interface Props {
  children?: ReactNode
  data: Mints
}

export const MintsTable: FC<Props> = ({ data }) => {
  const mints = data.result

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>mint</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {mints.map((mint, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{mint.mint}</td>
              <td>{mint.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
