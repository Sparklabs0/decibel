/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLabel = /* GraphQL */ `
  query GetLabel($id: ID!) {
    getLabel(id: $id) {
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
export const listLabels = /* GraphQL */ `
  query ListLabels(
    $filter: ModelLabelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
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
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const notesByLabelID = /* GraphQL */ `
  query NotesByLabelID(
    $labelID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByLabelID(
      labelID: $labelID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
