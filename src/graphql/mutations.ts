/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLabel = /* GraphQL */ `
  mutation CreateLabel(
    $input: CreateLabelInput!
    $condition: ModelLabelConditionInput
  ) {
    createLabel(input: $input, condition: $condition) {
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
export const updateLabel = /* GraphQL */ `
  mutation UpdateLabel(
    $input: UpdateLabelInput!
    $condition: ModelLabelConditionInput
  ) {
    updateLabel(input: $input, condition: $condition) {
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
export const deleteLabel = /* GraphQL */ `
  mutation DeleteLabel(
    $input: DeleteLabelInput!
    $condition: ModelLabelConditionInput
  ) {
    deleteLabel(input: $input, condition: $condition) {
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
export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
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
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
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
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
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
