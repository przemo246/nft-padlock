import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address } from "@graphprotocol/graph-ts"
import { BreakupApproved } from "../generated/schema"
import { BreakupApproved as BreakupApprovedEvent } from "../generated/PadLock/PadLock"
import { handleBreakupApproved } from "../src/pad-lock"
import { createBreakupApprovedEvent } from "./pad-lock-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let relationshipId = Bytes.fromI32(1234567890)
    let initiator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let approver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newBreakupApprovedEvent = createBreakupApprovedEvent(
      relationshipId,
      initiator,
      approver
    )
    handleBreakupApproved(newBreakupApprovedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BreakupApproved created and stored", () => {
    assert.entityCount("BreakupApproved", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BreakupApproved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "relationshipId",
      "1234567890"
    )
    assert.fieldEquals(
      "BreakupApproved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "initiator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BreakupApproved",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "approver",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
