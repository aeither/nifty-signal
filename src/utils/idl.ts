export type ClockworkCrank = {
  version: '1.0.3'
  name: 'clockwork_crank'
  instructions: [
    {
      name: 'configUpdate'
      accounts: [
        {
          name: 'admin'
          isMut: true
          isSigner: true
        },
        {
          name: 'config'
          isMut: true
          isSigner: false
        }
      ]
      args: [
        {
          name: 'settings'
          type: {
            defined: 'ConfigSettings'
          }
        }
      ]
    },
    {
      name: 'initialize'
      accounts: [
        {
          name: 'admin'
          isMut: true
          isSigner: true
        },
        {
          name: 'config'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'queueCrank'
      accounts: [
        {
          name: 'config'
          isMut: false
          isSigner: false
        },
        {
          name: 'fee'
          isMut: true
          isSigner: false
        },
        {
          name: 'pool'
          isMut: false
          isSigner: false
        },
        {
          name: 'queue'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'worker'
          isMut: true
          isSigner: true
        }
      ]
      args: []
    },
    {
      name: 'queueCreate'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'queue'
          isMut: true
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        }
      ]
      args: [
        {
          name: 'instruction'
          type: {
            defined: 'InstructionData'
          }
        },
        {
          name: 'name'
          type: 'string'
        },
        {
          name: 'trigger'
          type: {
            defined: 'Trigger'
          }
        }
      ]
    },
    {
      name: 'queueDelete'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'closeTo'
          isMut: true
          isSigner: false
        },
        {
          name: 'queue'
          isMut: true
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'queuePause'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'queue'
          isMut: true
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'queueResume'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'queue'
          isMut: true
          isSigner: false
        }
      ]
      args: []
    },
    {
      name: 'queueUpdate'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'queue'
          isMut: true
          isSigner: false
        }
      ]
      args: [
        {
          name: 'firstInstruction'
          type: {
            option: {
              defined: 'InstructionData'
            }
          }
        },
        {
          name: 'trigger'
          type: {
            option: {
              defined: 'Trigger'
            }
          }
        }
      ]
    },
    {
      name: 'queueWithdraw'
      accounts: [
        {
          name: 'authority'
          isMut: false
          isSigner: true
        },
        {
          name: 'payTo'
          isMut: true
          isSigner: false
        },
        {
          name: 'queue'
          isMut: true
          isSigner: false
        }
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        }
      ]
    }
  ]
  accounts: [
    {
      name: 'config'
      docs: ['* Config']
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'admin'
            type: 'publicKey'
          },
          {
            name: 'automationFee'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'fee'
      docs: ['* Fee']
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'adminBalance'
            type: 'u64'
          },
          {
            name: 'workerBalance'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'queue'
      docs: ['* Queue']
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'authority'
            type: 'publicKey'
          },
          {
            name: 'createdAt'
            type: {
              defined: 'ClockData'
            }
          },
          {
            name: 'execContext'
            type: {
              option: {
                defined: 'ExecContext'
              }
            }
          },
          {
            name: 'firstInstruction'
            type: {
              defined: 'InstructionData'
            }
          },
          {
            name: 'name'
            type: 'string'
          },
          {
            name: 'nextInstruction'
            type: {
              option: {
                defined: 'InstructionData'
              }
            }
          },
          {
            name: 'trigger'
            type: {
              defined: 'Trigger'
            }
          }
        ]
      }
    }
  ]
  types: [
    {
      name: 'ClockData'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'slot'
            type: 'u64'
          },
          {
            name: 'epochStartTimestamp'
            docs: ['the timestamp of the first Slot in this Epoch']
            type: 'i64'
          },
          {
            name: 'epoch'
            docs: ['the bank Epoch']
            type: 'u64'
          },
          {
            name: 'leaderScheduleEpoch'
            docs: [
              'the future Epoch for which the leader schedule has',
              'most recently been calculated'
            ]
            type: 'u64'
          },
          {
            name: 'unixTimestamp'
            docs: [
              'originally computed from genesis creation time and network time',
              'in slots (drifty); corrected using validator timestamp oracle as of',
              'timestamp_correction and timestamp_bounding features'
            ]
            type: 'i64'
          }
        ]
      }
    },
    {
      name: 'ConfigSettings'
      docs: ['* ConfigSettings']
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'admin'
            type: 'publicKey'
          },
          {
            name: 'automationFee'
            type: 'u64'
          }
        ]
      }
    },
    {
      name: 'InstructionData'
      docs: ['* InstructionData']
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'programId'
            docs: [
              'Pubkey of the instruction processor that executes this instruction'
            ]
            type: 'publicKey'
          },
          {
            name: 'accounts'
            docs: [
              'Metadata for what accounts should be passed to the instruction processor'
            ]
            type: {
              vec: {
                defined: 'AccountMetaData'
              }
            }
          },
          {
            name: 'data'
            docs: ['Opaque data passed to the instruction processor']
            type: 'bytes'
          }
        ]
      }
    },
    {
      name: 'AccountMetaData'
      docs: ['* AccountMetaData']
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'pubkey'
            docs: ["An account's public key"]
            type: 'publicKey'
          },
          {
            name: 'isSigner'
            docs: [
              'True if an Instruction requires a Transaction signature matching `pubkey`.'
            ]
            type: 'bool'
          },
          {
            name: 'isWritable'
            docs: [
              'True if the `pubkey` can be loaded as a read-write account.'
            ]
            type: 'bool'
          }
        ]
      }
    },
    {
      name: 'CrankResponse'
      docs: ['* CrankResponse']
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'nextInstruction'
            type: {
              option: {
                defined: 'InstructionData'
              }
            }
          }
        ]
      }
    },
    {
      name: 'Trigger'
      docs: ['* Trigger']
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Cron'
            fields: [
              {
                name: 'schedule'
                type: 'string'
              }
            ]
          },
          {
            name: 'Immediate'
          }
        ]
      }
    },
    {
      name: 'ExecContext'
      docs: ['* ExecContext']
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'Cron'
            fields: [
              {
                name: 'started_at'
                type: 'i64'
              }
            ]
          },
          {
            name: 'Immediate'
          }
        ]
      }
    }
  ]
  errors: [
    {
      code: 6000
      name: 'InvalidCrankResponse'
      msg: 'The crank response could not be parsed'
    },
    {
      code: 6001
      name: 'InvalidQueueState'
      msg: 'The queue is in an invalid state'
    },
    {
      code: 6002
      name: 'InvalidTrigger'
      msg: 'The trigger condition has not been met'
    },
    {
      code: 6003
      name: 'PausedQueue'
      msg: 'The queue is currently paused'
    },
    {
      code: 6004
      name: 'UnauthorizedWrite'
      msg: 'Inner instruction attempted to write to an unauthorized address'
    }
  ]
}
export declare const IDL: ClockworkCrank
//# sourceMappingURL=clockwork_crank.d.ts.map
