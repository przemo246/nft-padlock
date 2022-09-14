import {
  BreakupApproved as BreakupApprovedEvent,
  BreakupProposal as BreakupProposalEvent,
  RelationshipApproved as RelationshipApprovedEvent,
  RelationshipEvent as RelationshipEventEvent,
  RelationshipProposed as RelationshipProposedEvent
} from "../generated/PadLock/PadLock"
import {
  BreakupApproved,
  BreakupProposal,
  RelationshipApproved,
  RelationshipEvent,
  RelationshipProposed
} from "../generated/schema"
import { sendEPNSNotification } from "./EPNSNotification"

export const subgraphID = "tomasz90/10c-hackathon-padlock"

export function handleBreakupApproved(event: BreakupApprovedEvent): void {
  let entity = new BreakupApproved(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.relationshipId = event.params.relationshipId
  entity.initiator = event.params.initiator
  entity.approver = event.params.approver
  entity.save()
}

export function handleBreakupProposal(event: BreakupProposalEvent): void {
  let entity = new BreakupProposal(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.relationshipId = event.params.relationshipId
  entity.initiator = event.params.initiator
  entity.save()
}

export function handleRelationshipApproved(
  event: RelationshipApprovedEvent
): void {
  let entity = new RelationshipApproved(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.relationshipId = event.params.relationshipId
  entity.firstHalf = event.params.firstHalf
  entity.secondHalf = event.params.secondHalf
  entity.save()
}

export function handleRelationshipEvent(event: RelationshipEventEvent): void {
  let entity = new RelationshipEvent(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.relationshipMemo = event.params.relationshipMemo
  entity.ipfsURI = event.params.ipfsURI
  entity.lover = event.params.lover
  entity.relationshipId = event.params.relationshipId
  entity.save()
}

export function handleRelationshipProposed(
  event: RelationshipProposedEvent
): void {
  let entity = new RelationshipProposed(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.relationshipId = event.params.relationshipId
  entity.firstHalf = event.params.firstHalf
  entity.secondHalf = event.params.secondHalf
  entity.save()

  let recipient = event.params.secondHalf.toHexString(),
  type = "3",
  title = "Relationship Proposed",
  body = `${event.params.firstHalf.toHexString()} propsed to you`,
  subject = "PUSH Received",
  message = `${event.params.firstHalf.toHexString()} propsed to you`,
  image = "https://play-lh.googleusercontent.com/i911_wMmFilaAAOTLvlQJZMXoxBF34BMSzRmascHezvurtslYUgOHamxgEnMXTklsF-S",
  secret = "null",
  cta = "https://epns.io/",


  notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"${message}\", \"image\": \"${image}\", \"secret\": \"${secret}\", \"cta\": \"${cta}\"}`

  sendEPNSNotification(
    recipient, 
    notification
    )
  }