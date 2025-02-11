import { describe, it, expect, beforeEach } from "vitest"

// Mock storage for escrows
const escrows = new Map()
let nextEscrowId = 1

// Mock functions to simulate contract behavior
function createEscrow(client: string, freelancer: string, amount: number) {
  const escrowId = nextEscrowId++
  escrows.set(escrowId, { client, freelancer, amount, released: false })
  return escrowId
}

function releaseEscrow(escrowId: number, sender: string) {
  const escrow = escrows.get(escrowId)
  if (!escrow) throw new Error("Invalid escrow")
  if (escrow.client !== sender) throw new Error("Unauthorized")
  if (escrow.released) throw new Error("Already released")
  escrow.released = true
  escrows.set(escrowId, escrow)
  return true
}

function getEscrow(escrowId: number) {
  return escrows.get(escrowId)
}

describe("Escrow Contract", () => {
  beforeEach(() => {
    escrows.clear()
    nextEscrowId = 1
  })
  
  it("should create an escrow", () => {
    const escrowId = createEscrow("client1", "freelancer1", 1000)
    expect(escrowId).toBe(1)
    const escrow = getEscrow(escrowId)
    expect(escrow).toEqual({
      client: "client1",
      freelancer: "freelancer1",
      amount: 1000,
      released: false,
    })
  })
  
  it("should release an escrow", () => {
    const escrowId = createEscrow("client1", "freelancer1", 1000)
    const result = releaseEscrow(escrowId, "client1")
    expect(result).toBe(true)
    const escrow = getEscrow(escrowId)
    expect(escrow.released).toBe(true)
  })
  
  it("should not allow unauthorized release", () => {
    const escrowId = createEscrow("client1", "freelancer1", 1000)
    expect(() => releaseEscrow(escrowId, "freelancer1")).toThrow("Unauthorized")
  })
  
  it("should not allow double release", () => {
    const escrowId = createEscrow("client1", "freelancer1", 1000)
    releaseEscrow(escrowId, "client1")
    expect(() => releaseEscrow(escrowId, "client1")).toThrow("Already released")
  })
})

