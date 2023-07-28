/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Note } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NoteUpdateFormInputValues = {
    title?: string;
    audio?: string[];
    createdAt?: string;
    label?: string;
    transcription?: string;
    summary?: string;
    favorited?: boolean;
};
export declare type NoteUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    audio?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    label?: ValidationFunction<string>;
    transcription?: ValidationFunction<string>;
    summary?: ValidationFunction<string>;
    favorited?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NoteUpdateFormOverridesProps = {
    NoteUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    audio?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    label?: PrimitiveOverrideProps<TextFieldProps>;
    transcription?: PrimitiveOverrideProps<TextFieldProps>;
    summary?: PrimitiveOverrideProps<TextAreaFieldProps>;
    favorited?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type NoteUpdateFormProps = React.PropsWithChildren<{
    overrides?: NoteUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    note?: Note;
    onSubmit?: (fields: NoteUpdateFormInputValues) => NoteUpdateFormInputValues;
    onSuccess?: (fields: NoteUpdateFormInputValues) => void;
    onError?: (fields: NoteUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NoteUpdateFormInputValues) => NoteUpdateFormInputValues;
    onValidate?: NoteUpdateFormValidationValues;
} & React.CSSProperties>;
export default function NoteUpdateForm(props: NoteUpdateFormProps): React.ReactElement;
