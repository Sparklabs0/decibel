/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateNoteInput = {
  id?: string | null,
  title: string,
  audio: Array< string >,
  createdAt?: string | null,
  label?: string | null,
  transcription?: string | null,
  summary?: string | null,
  favorited?: boolean | null,
};

export type ModelNoteConditionInput = {
  title?: ModelStringInput | null,
  audio?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  label?: ModelStringInput | null,
  transcription?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  favorited?: ModelBooleanInput | null,
  and?: Array< ModelNoteConditionInput | null > | null,
  or?: Array< ModelNoteConditionInput | null > | null,
  not?: ModelNoteConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Note = {
  __typename: "Note",
  id: string,
  title: string,
  audio: Array< string >,
  createdAt: string,
  label?: string | null,
  transcription?: string | null,
  summary?: string | null,
  favorited?: boolean | null,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateNoteInput = {
  id: string,
  title?: string | null,
  audio?: Array< string > | null,
  createdAt?: string | null,
  label?: string | null,
  transcription?: string | null,
  summary?: string | null,
  favorited?: boolean | null,
};

export type DeleteNoteInput = {
  id: string,
};

export type ModelNoteFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  audio?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  label?: ModelStringInput | null,
  transcription?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  favorited?: ModelBooleanInput | null,
  and?: Array< ModelNoteFilterInput | null > | null,
  or?: Array< ModelNoteFilterInput | null > | null,
  not?: ModelNoteFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelNoteConnection = {
  __typename: "ModelNoteConnection",
  items:  Array<Note | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionNoteFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  audio?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  label?: ModelSubscriptionStringInput | null,
  transcription?: ModelSubscriptionStringInput | null,
  summary?: ModelSubscriptionStringInput | null,
  favorited?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionNoteFilterInput | null > | null,
  or?: Array< ModelSubscriptionNoteFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateNoteMutationVariables = {
  input: CreateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type CreateNoteMutation = {
  createNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    audio: Array< string >,
    createdAt: string,
    label?: string | null,
    transcription?: string | null,
    summary?: string | null,
    favorited?: boolean | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateNoteMutationVariables = {
  input: UpdateNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type UpdateNoteMutation = {
  updateNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    audio: Array< string >,
    createdAt: string,
    label?: string | null,
    transcription?: string | null,
    summary?: string | null,
    favorited?: boolean | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteNoteMutationVariables = {
  input: DeleteNoteInput,
  condition?: ModelNoteConditionInput | null,
};

export type DeleteNoteMutation = {
  deleteNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    audio: Array< string >,
    createdAt: string,
    label?: string | null,
    transcription?: string | null,
    summary?: string | null,
    favorited?: boolean | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetNoteQueryVariables = {
  id: string,
};

export type GetNoteQuery = {
  getNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    audio: Array< string >,
    createdAt: string,
    label?: string | null,
    transcription?: string | null,
    summary?: string | null,
    favorited?: boolean | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListNotesQueryVariables = {
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotesQuery = {
  listNotes?:  {
    __typename: "ModelNoteConnection",
    items:  Array< {
      __typename: "Note",
      id: string,
      title: string,
      audio: Array< string >,
      createdAt: string,
      label?: string | null,
      transcription?: string | null,
      summary?: string | null,
      favorited?: boolean | null,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null,
  owner?: string | null,
};

export type OnCreateNoteSubscription = {
  onCreateNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    audio: Array< string >,
    createdAt: string,
    label?: string | null,
    transcription?: string | null,
    summary?: string | null,
    favorited?: boolean | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null,
  owner?: string | null,
};

export type OnUpdateNoteSubscription = {
  onUpdateNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    audio: Array< string >,
    createdAt: string,
    label?: string | null,
    transcription?: string | null,
    summary?: string | null,
    favorited?: boolean | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteNoteSubscriptionVariables = {
  filter?: ModelSubscriptionNoteFilterInput | null,
  owner?: string | null,
};

export type OnDeleteNoteSubscription = {
  onDeleteNote?:  {
    __typename: "Note",
    id: string,
    title: string,
    audio: Array< string >,
    createdAt: string,
    label?: string | null,
    transcription?: string | null,
    summary?: string | null,
    favorited?: boolean | null,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
