/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, PasswordFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AuthenticationInputValues = {
    Field0?: string;
    Field1?: string;
};
export declare type AuthenticationValidationValues = {
    Field0?: ValidationFunction<string>;
    Field1?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AuthenticationOverridesProps = {
    AuthenticationGrid?: PrimitiveOverrideProps<GridProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
    Field1?: PrimitiveOverrideProps<PasswordFieldProps>;
} & EscapeHatchProps;
export declare type AuthenticationProps = React.PropsWithChildren<{
    overrides?: AuthenticationOverridesProps | undefined | null;
} & {
    initialData?: AuthenticationInputValues;
    onSubmit: (fields: AuthenticationInputValues) => void;
    onChange?: (fields: AuthenticationInputValues) => AuthenticationInputValues;
    onValidate?: AuthenticationValidationValues;
} & React.CSSProperties>;
export default function Authentication(props: AuthenticationProps): React.ReactElement;
