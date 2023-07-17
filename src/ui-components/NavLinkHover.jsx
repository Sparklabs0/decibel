/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, Text } from "@aws-amplify/ui-react";
export default function NavLinkHover(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="16px"
      direction="column"
      width="unset"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      borderRadius="8px"
      padding="12px 128px 12px 10px"
      backgroundColor="rgba(240,238,247,1)"
      {...getOverrideProps(overrides, "NavLinkHover")}
      {...rest}
    >
      <Flex
        gap="8px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 322")}
      >
        <Flex
          gap="0"
          direction="row"
          width="unset"
          height="unset"
          justifyContent="flex-start"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          borderRadius="4px"
          padding="6px 6px 6px 6px"
          backgroundColor="rgba(231,227,242,1)"
          {...getOverrideProps(overrides, "icon")}
        >
          <Icon
            width="15.83px"
            height="16.5px"
            viewBox={{ minX: 0, minY: 0, width: 15.82666015625, height: 16.5 }}
            paths={[
              {
                d: "M7.06055 0.312607C7.2989 0.110768 7.60111 0 7.91345 0C8.22578 -3.90475e-16 8.52799 0.110768 8.76634 0.312607L15.3609 5.90741C15.5069 6.03121 15.6242 6.18531 15.7047 6.35902C15.7852 6.53272 15.8269 6.72186 15.8269 6.9133L15.8269 15.1811C15.8269 15.5309 15.6879 15.8664 15.4406 16.1137C15.1932 16.361 14.8578 16.5 14.508 16.5L9.45217 16.5C9.27727 16.5 9.10954 16.4305 8.98587 16.3069C8.8622 16.1832 8.79272 16.0154 8.79272 15.8405L8.79272 10.3451L7.03417 10.3451L7.03417 15.8405C7.03417 16.0154 6.9647 16.1832 6.84102 16.3069C6.71735 16.4305 6.54962 16.5 6.37472 16.5L1.31891 16.5C0.969112 16.5 0.633642 16.361 0.386299 16.1137C0.138956 15.8664 0 15.5309 0 15.1811L0 6.9133C0 6.52642 0.170579 6.15801 0.466014 5.90741L7.06055 0.312607ZM7.91345 1.31849L1.31891 6.9133L1.31891 15.1811L5.71527 15.1811L5.71527 9.68564C5.71527 9.51075 5.78474 9.34301 5.90842 9.21934C6.03209 9.09567 6.19982 9.02619 6.37472 9.02619L9.45217 9.02619C9.62707 9.02619 9.7948 9.09567 9.91848 9.21934C10.0421 9.34301 10.1116 9.51075 10.1116 9.68564L10.1116 15.1811L14.508 15.1811L14.508 6.9133L7.91345 1.31849Z",
                fill: "rgba(59,46,97,1)",
                fillRule: "nonzero",
              },
            ]}
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            shrink="0"
            position="relative"
            {...getOverrideProps(overrides, "Vector")}
          ></Icon>
        </Flex>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(59,46,97,1)"
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
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children="Dashboard"
          {...getOverrideProps(overrides, "label")}
        ></Text>
      </Flex>
    </Flex>
  );
}
