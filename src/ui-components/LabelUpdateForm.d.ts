/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Label } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type LabelUpdateFormInputValues = {
    label?: string;
};
export declare type LabelUpdateFormValidationValues = {
    label?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LabelUpdateFormOverridesProps = {
    LabelUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    label?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type LabelUpdateFormProps = React.PropsWithChildren<{
    overrides?: LabelUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    label?: Label;
    onSubmit?: (fields: LabelUpdateFormInputValues) => LabelUpdateFormInputValues;
    onSuccess?: (fields: LabelUpdateFormInputValues) => void;
    onError?: (fields: LabelUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LabelUpdateFormInputValues) => LabelUpdateFormInputValues;
    onValidate?: LabelUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LabelUpdateForm(props: LabelUpdateFormProps): React.ReactElement;
