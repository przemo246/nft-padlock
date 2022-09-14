import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  BreakupApproved,
  BreakupProposal,
  RelationshipApproved,
  RelationshipEvent,
  RelationshipProposed
} from "../generated/PadLock/PadLock"

export function createBreakupApprovedEvent(
  relationshipId: Bytes,
  initiator: Address,
  approver: Address
): BreakupApproved {
  let breakupApprovedEvent = changetype<BreakupApproved>(newMockEvent())

  breakupApprovedEvent.parameters = new Array()

  breakupApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "relationshipId",
      ethereum.Value.fromFixedBytes(relationshipId)
    )
  )
  breakupApprovedEvent.parameters.push(
    new ethereum.EventParam("initiator", ethereum.Value.fromAddress(initiator))
  )
  breakupApprovedEvent.parameters.push(
    new ethereum.EventParam("approver", ethereum.Value.fromAddress(approver))
  )

  return breakupApprovedEvent
}

export function createBreakupProposalEvent(
  relationshipId: Bytes,
  initiator: Address
): BreakupProposal {
  let breakupProposalEvent = changetype<BreakupProposal>(newMockEvent())

  breakupProposalEvent.parameters = new Array()

  breakupProposalEvent.parameters.push(
    new ethereum.EventParam(
      "relationshipId",
      ethereum.Value.fromFixedBytes(relationshipId)
    )
  )
  breakupProposalEvent.parameters.push(
    new ethereum.EventParam("initiator", ethereum.Value.fromAddress(initiator))
  )

  return breakupProposalEvent
}

export function createRelationshipApprovedEvent(
  relationshipId: Bytes,
  firstHalf: Address,
  secondHalf: Address
): RelationshipApproved {
  let relationshipApprovedEvent = changetype<RelationshipApproved>(
    newMockEvent()
  )

  relationshipApprovedEvent.parameters = new Array()

  relationshipApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "relationshipId",
      ethereum.Value.fromFixedBytes(relationshipId)
    )
  )
  relationshipApprovedEvent.parameters.push(
    new ethereum.EventParam("firstHalf", ethereum.Value.fromAddress(firstHalf))
  )
  relationshipApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "secondHalf",
      ethereum.Value.fromAddress(secondHalf)
    )
  )

  return relationshipApprovedEvent
}

export function createRelationshipEventEvent(
  relationshipMemo: string,
  ipfsURI: string,
  lover: Address,
  relationshipId: Bytes
): RelationshipEvent {
  let relationshipEventEvent = changetype<RelationshipEvent>(newMockEvent())

  relationshipEventEvent.parameters = new Array()

  relationshipEventEvent.parameters.push(
    new ethereum.EventParam(
      "relationshipMemo",
      ethereum.Value.fromString(relationshipMemo)
    )
  )
  relationshipEventEvent.parameters.push(
    new ethereum.EventParam("ipfsURI", ethereum.Value.fromString(ipfsURI))
  )
  relationshipEventEvent.parameters.push(
    new ethereum.EventParam("lover", ethereum.Value.fromAddress(lover))
  )
  relationshipEventEvent.parameters.push(
    new ethereum.EventParam(
      "relationshipId",
      ethereum.Value.fromFixedBytes(relationshipId)
    )
  )

  return relationshipEventEvent
}

export function createRelationshipProposedEvent(
  relationshipId: Bytes,
  firstHalf: Address,
  secondHalf: Address
): RelationshipProposed {
  let relationshipProposedEvent = changetype<RelationshipProposed>(
    newMockEvent()
  )

  relationshipProposedEvent.parameters = new Array()

  relationshipProposedEvent.parameters.push(
    new ethereum.EventParam(
      "relationshipId",
      ethereum.Value.fromFixedBytes(relationshipId)
    )
  )
  relationshipProposedEvent.parameters.push(
    new ethereum.EventParam("firstHalf", ethereum.Value.fromAddress(firstHalf))
  )
  relationshipProposedEvent.parameters.push(
    new ethereum.EventParam(
      "secondHalf",
      ethereum.Value.fromAddress(secondHalf)
    )
  )

  return relationshipProposedEvent
}
