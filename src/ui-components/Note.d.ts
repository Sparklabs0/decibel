/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Notes } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NoteOverridesProps = {
    Note?: PrimitiveOverrideProps<FlexProps>;
    NOTE?: PrimitiveOverrideProps<TextProps>;
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."?: PrimitiveOverrideProps<TextProps>;
} & EscapeHatchProps;
export declare type NoteProps = React.PropsWithChildren<Partial<FlexProps> & {
    notes?: Notes;
} & {
    overrides?: NoteOverridesProps | undefined | null;
}>;
export default function Note(props: NoteProps): React.ReactElement;
