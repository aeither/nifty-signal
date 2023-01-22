import { Mints } from 'hooks/use-helius'
import { FC, ReactNode } from 'react'
import useStore from 'stores/use-store'

interface Props {
  children?: ReactNode
  data: Mints
}

export const MintsTable: FC<Props> = ({ data }) => {
  const mints = data.result
  const { insert, saved } = useStore()

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>mint</th>
            <th>name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {mints.map((mint, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{mint.mint}</td>
              <td>{mint.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={saved.includes(mint.mint)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      insert(mint.mint)
                    }
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
