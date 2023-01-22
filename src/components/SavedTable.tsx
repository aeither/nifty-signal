import { FC, ReactNode } from 'react'
import { BellRing } from 'lucide-react'

interface Props {
  children?: ReactNode
  data: string[]
  remove: (mint: string) => void
}

export const SavedTable: FC<Props> = ({ data: mints, remove }) => {
  // <h2>Mints</h2>
  // {saved.map((mint) => (
  //   <>
  //     <div className="flex flex-col">{mint}</div>
  //   </>
  // ))}
  // <button onClick={() => reset()}>reset</button>

  return (
    <div className="overflow-x-auto">
      <table className="w-full table table-compact">
        <thead>
          <tr>
            <th>#</th>
            <th>mint</th>
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
                <BellRing className="cursor-pointer text-yellow-400" />
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
