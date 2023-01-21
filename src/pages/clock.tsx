import * as anchor from '@project-serum/anchor'
import { useWallet } from '@solana/wallet-adapter-react'
import { useAnchorProvider } from 'hooks/anchor-provider'
import { useHelloClockworkProgram, useThreadProgram } from 'hooks/use-clockwork'
import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import uuid from 'short-uuid'
import { CLOCKWORK_THREAD_PROGRAM_ID } from 'utils/clockwork'

const SEED_QUEUE = 'thread'

const Clock: NextPage = (props) => {
  const anchorProvider = useAnchorProvider()
  const threadProgram = useThreadProgram()
  const helloClockworkProgram = useHelloClockworkProgram()
  const { publicKey } = useWallet()

  const [queueMsg, setQueueMsg] = useState('Hello World!')

  const handleCreateQueue = async () => {
    if (!anchorProvider) return
    if (!publicKey) {
      toast('Connect your wallet and try again!')
      return
    }

    const threadName = uuid().new()
    const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from(SEED_QUEUE, 'utf-8'),
        publicKey.toBuffer(),
        Buffer.from(threadName, 'utf-8'),
      ],
      CLOCKWORK_THREAD_PROGRAM_ID
    )

    const helloworldInstruction = await helloClockworkProgram.methods
      .helloWorld(queueMsg)
      .accounts({ helloThread: publicKey })
      .instruction()

    try {
      const thread_transaction = await threadProgram.methods
        .threadCreate(
          threadName,
          {
            programId: helloClockworkProgram.programId,
            accounts: [{ pubkey: pda, isSigner: true, isWritable: true }],
            data: helloworldInstruction.data,
          },
          {
            cron: {
              schedule: '*/10 * * * * * *',
              skippable: true,
            },
          }
        )
        .accounts({
          authority: publicKey,
          payer: publicKey,
          thread: pda,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc()

      toast(`A queue has been created with "${queueMsg}"`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col mt-3">
      <label>Message</label>
      <input
        className="mt-1 mb-5"
        placeholder="Queue message here"
        value={queueMsg}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setQueueMsg(e.target.value)
        }
        data-testid="queue-name-input"
      />
      <div className="flex justify-end pt-5">
        <button
          className="pt-3 pb-3"
          onClick={() => handleCreateQueue()}
          data-cy="create-thread-btn"
        >
          Create Thread
        </button>
      </div>
    </div>
  )
}

export default Clock
