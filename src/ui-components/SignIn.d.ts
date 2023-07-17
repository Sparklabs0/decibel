/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, PasswordFieldProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SignInOverridesProps = {
    SignIn?: PrimitiveOverrideProps<FlexProps>;
    "Signup To continue to Aperturs"?: PrimitiveOverrideProps<TextProps>;
    TextField?: PrimitiveOverrideProps<TextFieldProps>;
    PasswordField?: PrimitiveOverrideProps<PasswordFieldProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type SignInProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: SignInOverridesProps | undefined | null;
}>;
export default function SignIn(props: SignInProps): React.ReactElement;
