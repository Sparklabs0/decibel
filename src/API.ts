/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateLabelInput = {
  id?: string | null,
  label?: string | null,
};

export type ModelLabelConditionInput = {
  label?: ModelStringInput | null,
  and?: Array< ModelLabelConditionInput | null > | null,
  or?: Array< ModelLabelConditionInput | null > | null,
  not?: ModelLabelConditionInput | null,
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

export type Label = {
  __typename: "Label",
  id: string,
  label?: string | null,
  Notes?: ModelNoteConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelNoteConnection = {
  __typename: "ModelNoteConnection",
  items:  Array<Note | null >,
  nextToken?: string | null,
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
  labelID: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateLabelInput = {
  id: string,
  label?: string | null,
};

export type DeleteLabelInput = {
  id: string,
};

export type CreateNoteInput = {
  id?: string | null,
  title: string,
  audio: Array< string >,
  createdAt?: string | null,
  label?: string | null,
  transcription?: string | null,
  summary?: string | null,
  favorited?: boolean | null,
  labelID: string,
};

export type ModelNoteConditionInput = {
  title?: ModelStringInput | null,
  audio?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  label?: ModelStringInput | null,
  transcription?: ModelStringInput | null,
  summary?: ModelStringInput | null,
  favorited?: ModelBooleanInput | null,
  labelID?: ModelIDInput | null,
  and?: Array< ModelNoteConditionInput | null > | null,
  or?: Array< ModelNoteConditionInput | null > | null,
  not?: ModelNoteConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
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

export type UpdateNoteInput = {
  id: string,
  title?: string | null,
  audio?: Array< string > | null,
  createdAt?: string | null,
  label?: string | null,
  transcription?: string | null,
  summary?: string | null,
  favorited?: boolean | null,
  labelID?: string | null,
};

export type DeleteNoteInput = {
  id: string,
};

export type ModelLabelFilterInput = {
  id?: ModelIDInput | null,
  label?: ModelStringInput | null,
  and?: Array< ModelLabelFilterInput | null > | null,
  or?: Array< ModelLabelFilterInput | null > | null,
  not?: ModelLabelFilterInput | null,
};

export type ModelLabelConnection = {
  __typename: "ModelLabelConnection",
  items:  Array<Label | null >,
  nextToken?: string | null,
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
  labelID?: ModelIDInput | null,
  and?: Array< ModelNoteFilterInput | null > | null,
  or?: Array< ModelNoteFilterInput | null > | null,
  not?: ModelNoteFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionLabelFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  label?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLabelFilterInput | null > | null,
  or?: Array< ModelSubscriptionLabelFilterInput | null > | null,
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

export type ModelSubscriptionNoteFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  audio?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  label?: ModelSubscriptionStringInput | null,
  transcription?: ModelSubscriptionStringInput | null,
  summary?: ModelSubscriptionStringInput | null,
  favorited?: ModelSubscriptionBooleanInput | null,
  labelID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionNoteFilterInput | null > | null,
  or?: Array< ModelSubscriptionNoteFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateLabelMutationVariables = {
  input: CreateLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type CreateLabelMutation = {
  createLabel?:  {
    __typename: "Label",
    id: string,
    label?: string | null,
    Notes?:  {
      __typename: "ModelNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateLabelMutationVariables = {
  input: UpdateLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type UpdateLabelMutation = {
  updateLabel?:  {
    __typename: "Label",
    id: string,
    label?: string | null,
    Notes?:  {
      __typename: "ModelNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteLabelMutationVariables = {
  input: DeleteLabelInput,
  condition?: ModelLabelConditionInput | null,
};

export type DeleteLabelMutation = {
  deleteLabel?:  {
    __typename: "Label",
    id: string,
    label?: string | null,
    Notes?:  {
      __typename: "ModelNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
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
    labelID: string,
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
    labelID: string,
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
    labelID: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetLabelQueryVariables = {
  id: string,
};

export type GetLabelQuery = {
  getLabel?:  {
    __typename: "Label",
    id: string,
    label?: string | null,
    Notes?:  {
      __typename: "ModelNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListLabelsQueryVariables = {
  filter?: ModelLabelFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLabelsQuery = {
  listLabels?:  {
    __typename: "ModelLabelConnection",
    items:  Array< {
      __typename: "Label",
      id: string,
      label?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
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
    labelID: string,
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
      labelID: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotesByLabelIDQueryVariables = {
  labelID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotesByLabelIDQuery = {
  notesByLabelID?:  {
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
      labelID: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateLabelSubscriptionVariables = {
  filter?: ModelSubscriptionLabelFilterInput | null,
  owner?: string | null,
};

export type OnCreateLabelSubscription = {
  onCreateLabel?:  {
    __typename: "Label",
    id: string,
    label?: string | null,
    Notes?:  {
      __typename: "ModelNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateLabelSubscriptionVariables = {
  filter?: ModelSubscriptionLabelFilterInput | null,
  owner?: string | null,
};

export type OnUpdateLabelSubscription = {
  onUpdateLabel?:  {
    __typename: "Label",
    id: string,
    label?: string | null,
    Notes?:  {
      __typename: "ModelNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteLabelSubscriptionVariables = {
  filter?: ModelSubscriptionLabelFilterInput | null,
  owner?: string | null,
};

export type OnDeleteLabelSubscription = {
  onDeleteLabel?:  {
    __typename: "Label",
    id: string,
    label?: string | null,
    Notes?:  {
      __typename: "ModelNoteConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    labelID: string,
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
    labelID: string,
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
    labelID: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
