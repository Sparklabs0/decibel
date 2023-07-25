/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Note } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { FlexProps, TextProps, ViewProps } from "@aws-amplify/ui-react";
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NoteCardOverridesProps = {
    NoteCard?: PrimitiveOverrideProps<FlexProps>;
    note_title?: PrimitiveOverrideProps<TextProps>;
    audioElem?: PrimitiveOverrideProps<ViewProps>;
    note_text?: PrimitiveOverrideProps<TextProps>;
    actionElem?: PrimitiveOverrideProps<ViewProps>;
} & EscapeHatchProps;
export declare type NoteCardProps = React.PropsWithChildren<Partial<FlexProps> & {
    note?: Note;
    audioElem?: React.ReactNode;
    actionElem?: React.ReactNode;
} & {
    overrides?: NoteCardOverridesProps | undefined | null;
}>;
export default function NoteCard(props: NoteCardProps): React.ReactElement;
