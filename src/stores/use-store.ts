import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface StoreState {
  saved: string[]
  selected: string
  insert: (mint: string) => void
  remove: (mint: string) => void
  reset: () => void
  select: (mint: string) => void
}

const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        saved: [],
        insert: (mint) => set((state) => ({ saved: [...state.saved, mint] })),
        remove: (mint) =>
          set((state) => ({
            saved: state.saved.filter((savedMint) => savedMint !== mint),
          })),
        reset: () => set({ saved: [] }),
        selected: 'A4FM6h8T5Fmh9z2g3fKUrKfZn6BNFEgByR8QGpdbQhk1',
        select: (mint) => set({ selected: mint }),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
)

export default useStore
