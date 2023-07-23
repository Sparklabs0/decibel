/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Text, View } from "@aws-amplify/ui-react";
export default function NoteCard(props) {
  const { children, note, overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="column"
      width="357.33px"
      height="326px"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      boxShadow="0px 13px 16px rgba(0, 0.16388893127441406, 0.49166667461395264, 0.07999999821186066)"
      borderRadius="11px"
      padding="40px 40px 40px 40px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "NoteCard")}
      {...rest}
    >
      <Text
        fontFamily="Roboto"
        fontSize="24px"
        fontWeight="600"
        color="rgba(13,26,38,1)"
        lineHeight="30px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={note?.title}
        {...getOverrideProps(overrides, "note_title")}
      ></Text>
      <Text
        fontFamily="Roboto"
        fontSize="16px"
        fontWeight="600"
        color="rgba(48,64,80,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        letterSpacing="0.01px"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipses"
        children={`${note?.audio}${","}`}
        {...getOverrideProps(overrides, "note_audios")}
      ></Text>
      <Text
        fontFamily="Roboto"
        fontSize="16px"
        fontWeight="400"
        color="rgba(48,64,80,1)"
        lineHeight="24px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        letterSpacing="0.01px"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        alignSelf="stretch"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={note?.text}
        {...getOverrideProps(overrides, "note_text")}
      ></Text>
      <View
        width="272px"
        height="24px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        children={children}
        {...getOverrideProps(overrides, "Frame 438")}
      ></View>
    </Flex>
  );
}
