/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SignUpInputValues = {
    email?: string;
    name?: string;
};
export declare type SignUpValidationValues = {
    email?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SignUpOverridesProps = {
    SignUpGrid?: PrimitiveOverrideProps<GridProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SignUpProps = React.PropsWithChildren<{
    overrides?: SignUpOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SignUpInputValues) => SignUpInputValues;
    onSuccess?: (fields: SignUpInputValues) => void;
    onError?: (fields: SignUpInputValues, errorMessage: string) => void;
    onChange?: (fields: SignUpInputValues) => SignUpInputValues;
    onValidate?: SignUpValidationValues;
} & React.CSSProperties>;
export default function SignUp(props: SignUpProps): React.ReactElement;
