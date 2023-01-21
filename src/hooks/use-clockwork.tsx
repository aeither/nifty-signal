import {
  ClockworkProgram,
  CLOCKWORK_PROGRAMS_IDLS,
  CLOCKWORK_THREAD_PROGRAM_ADDRESS,
  // CLOCKWORK_WEBHOOK_PROGRAM_ADDRESS,
  HelloClockworkProgram,
  HELLO_CLOCKWORK_PROGRAM_ADDRESS,
  ThreadProgram,
} from 'utils/clockwork'

import { Program } from '@project-serum/anchor'
import '@solana/wallet-adapter-react-ui/styles.css'
import { useAnchorProvider } from 'hooks/anchor-provider'
import { useMemo } from 'react'

export const selectClockworkProgram =
  (programs: ClockworkProgram[]) => (programAddress: string) =>
    programs.find((program) => program.programId.toBase58() === programAddress)

export function useClockworkPrograms() {
  const { anchorProvider } = useAnchorProvider()
  const programs = useMemo(() => {
    const clockworkPrograms = Object.entries(CLOCKWORK_PROGRAMS_IDLS).map(
      ([programId, idls]) => {
        // default to first idl version for each program id.
        const [[firstIdlVersion, firstIdl]] = Object.entries(idls)
        return new Program(
          firstIdl,
          programId,
          anchorProvider
        ) as ClockworkProgram
      }
    )
    return clockworkPrograms
  }, [anchorProvider])

  return {
    programs,
  }
}

export const useThreadProgram = () => {
  const { programs } = useClockworkPrograms()
  const program = selectClockworkProgram(programs)(
    CLOCKWORK_THREAD_PROGRAM_ADDRESS
  ) as ThreadProgram
  if (!programs) {
    throw new Error('Thread program not found.')
  }
  return program
}

export const useHelloClockworkProgram = () => {
  const { programs } = useClockworkPrograms()
  const program = selectClockworkProgram(programs)(
    HELLO_CLOCKWORK_PROGRAM_ADDRESS
  ) as HelloClockworkProgram
  if (!programs) {
    throw new Error('Hello program not found.')
  }
  return program
}
