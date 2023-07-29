/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLabel = /* GraphQL */ `
  subscription OnCreateLabel(
    $filter: ModelSubscriptionLabelFilterInput
    $owner: String
  ) {
    onCreateLabel(filter: $filter, owner: $owner) {
      id
      label
      Notes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateLabel = /* GraphQL */ `
  subscription OnUpdateLabel(
    $filter: ModelSubscriptionLabelFilterInput
    $owner: String
  ) {
    onUpdateLabel(filter: $filter, owner: $owner) {
      id
      label
      Notes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteLabel = /* GraphQL */ `
  subscription OnDeleteLabel(
    $filter: ModelSubscriptionLabelFilterInput
    $owner: String
  ) {
    onDeleteLabel(filter: $filter, owner: $owner) {
      id
      label
      Notes {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onCreateNote(filter: $filter, owner: $owner) {
      id
      title
      audio
      createdAt
      label
      transcription
      summary
      favorited
      labelID
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onUpdateNote(filter: $filter, owner: $owner) {
      id
      title
      audio
      createdAt
      label
      transcription
      summary
      favorited
      labelID
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote(
    $filter: ModelSubscriptionNoteFilterInput
    $owner: String
  ) {
    onDeleteNote(filter: $filter, owner: $owner) {
      id
      title
      audio
      createdAt
      label
      transcription
      summary
      favorited
      labelID
      updatedAt
      owner
      __typename
    }
  }
`;
