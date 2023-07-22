/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      title
      text
      audio
      type
      createdAt
      jsonData
      label
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
        text
        audio
        type
        createdAt
        jsonData
        label
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const notesByDate = /* GraphQL */ `
  query NotesByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notesByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        text
        audio
        type
        createdAt
        jsonData
        label
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
