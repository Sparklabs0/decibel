/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ButtonProps, FlexProps, PasswordFieldProps, TextFieldProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SignupOverridesProps = {
    Signup?: PrimitiveOverrideProps<FlexProps>;
    "Signup To continue to Aperturs"?: PrimitiveOverrideProps<TextProps>;
    "Frame 428"?: PrimitiveOverrideProps<FlexProps>;
    TextField38635514?: PrimitiveOverrideProps<TextFieldProps>;
    TextField38635516?: PrimitiveOverrideProps<TextFieldProps>;
    PasswordField?: PrimitiveOverrideProps<PasswordFieldProps>;
    Button?: PrimitiveOverrideProps<ButtonProps>;
} & EscapeHatchProps;
export declare type SignupProps = React.PropsWithChildren<Partial<FlexProps> & {
    overrides?: SignupOverridesProps | undefined | null;
}>;
export default function Signup(props: SignupProps): React.ReactElement;
