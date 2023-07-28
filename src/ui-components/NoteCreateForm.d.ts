/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { StorageManagerProps } from "@aws-amplify/ui-react-storage";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NoteCreateFormInputValues = {
    title?: string;
    audio?: string[];
    createdAt?: string;
    label?: string;
    transcription?: string;
    summary?: string;
    favorited?: boolean;
};
export declare type NoteCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    audio?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    label?: ValidationFunction<string>;
    transcription?: ValidationFunction<string>;
    summary?: ValidationFunction<string>;
    favorited?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NoteCreateFormOverridesProps = {
    NoteCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    audio?: PrimitiveOverrideProps<StorageManagerProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    label?: PrimitiveOverrideProps<TextFieldProps>;
    transcription?: PrimitiveOverrideProps<TextFieldProps>;
    summary?: PrimitiveOverrideProps<TextAreaFieldProps>;
    favorited?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type NoteCreateFormProps = React.PropsWithChildren<{
    overrides?: NoteCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NoteCreateFormInputValues) => NoteCreateFormInputValues;
    onSuccess?: (fields: NoteCreateFormInputValues) => void;
    onError?: (fields: NoteCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NoteCreateFormInputValues) => NoteCreateFormInputValues;
    onValidate?: NoteCreateFormValidationValues;
} & React.CSSProperties>;
export default function NoteCreateForm(props: NoteCreateFormProps): React.ReactElement;
