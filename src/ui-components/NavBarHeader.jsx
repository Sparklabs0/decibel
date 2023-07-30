/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Flex, Icon, View } from "@aws-amplify/ui-react";
import MyIcon from "./MyIcon";
export default function NavBarHeader(props) {
  const { profile, overrides, ...rest } = props;
  return (
    <Flex
      gap="40px"
      direction="row"
      width="1440px"
      height="unset"
      justifyContent="center"
      alignItems="center"
      position="relative"
      boxShadow="0px 2px 6px rgba(0.05098039284348488, 0.10196078568696976, 0.14901961386203766, 0.15000000596046448)"
      padding="24px 32px 24px 32px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "NavBarHeader")}
      {...rest}
    >
      <View
        width="50px"
        height="50px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "logo")}
      >
        <View
          padding="0px 0px 0px 0px"
          width="45.24px"
          height="31.37px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          position="absolute"
          top="21.66%"
          bottom="15.6%"
          left="6.05%"
          right="3.47%"
          {...getOverrideProps(overrides, "Group")}
        >
          <View
            padding="0px 0px 0px 0px"
            width="45.24px"
            height="31.37px"
            display="block"
            gap="unset"
            alignItems="unset"
            justifyContent="unset"
            position="absolute"
            top="0%"
            bottom="0%"
            left="0%"
            right="0%"
            {...getOverrideProps(overrides, "Layer 1")}
          >
            <Icon
              width="20.17px"
              height="22.57px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 20.174072265625,
                height: 22.57275390625,
              }}
              paths={[
                {
                  d: "M10.502 0C9.39454 0.1 7.61654 0.409499 5.77354 1.485C2.46554 3.4155 0.0140411 7.1905 4.10863e-05 11.458C-0.00295891 12.569 0.150041 16.3935 3.21604 19.431C3.43004 19.643 6.65404 22.737 11.4295 22.566C12.4596 22.5279 13.4791 22.3441 14.4575 22.02C16.3629 14.68 18.2684 7.34 20.174 0L10.502 0ZM11.292 14.0915C9.79854 13.7835 8.79204 12.3915 8.95704 10.954C9.10704 9.6405 10.1955 8.568 11.5755 8.4305L17.924 8.4065L16.4115 14.115L11.292 14.0915Z",
                  fill: "rgba(0,25,77,1)",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="28.05%"
              bottom="0%"
              left="0%"
              right="55.41%"
              {...getOverrideProps(overrides, "Vector40741113")}
            ></Icon>
            <Icon
              width="29.79px"
              height="26.99px"
              viewBox={{
                minX: 0,
                minY: 0,
                width: 29.786376953125,
                height: 26.98876953125,
              }}
              paths={[
                {
                  d: "M29.785 13.756C29.7165 14.1785 27.4375 13.3945 25.842 14.6345C24.798 15.4455 24.199 17.007 23.697 18.3135C23.555 18.6835 23.4515 18.9985 23.382 19.2215C23.1745 19.46 23.0175 19.501 22.9095 19.491C22.44 19.4435 22.3305 18.364 21.5775 16.436C21.1275 15.29 20.8065 14.745 20.2245 14.397C19.9955 14.2595 19.663 14.0605 19.2945 14.1215C18.5125 14.2495 18.156 15.4505 17.6445 16.9645C16.5655 20.1525 16.015 21.7465 15.4675 21.7475C15.0175 21.7475 14.6565 20.7805 14.182 19.509C13.947 18.8795 13.567 17.7125 13.182 16.417C12.982 15.7415 12.7725 15.0075 12.1615 14.753C12.0465 14.7055 11.8615 14.6285 11.6565 14.6625C10.7898 17.9988 9.92317 21.335 9.0565 24.671C9.035 24.879 8.927 25.6785 8.2425 26.2995C7.88244 26.6233 7.43726 26.8374 6.9595 26.9165L0 26.989C3.55 13.068 6.2085 2.883 6.593 1.7195C6.8135 1.0515 7.158 0.7155 7.311 0.5825C7.819 0.1435 8.432 0.0325 8.8215 0L15.4625 0L13.1375 8.9595C13.6205 10.5995 14.0545 11.3095 14.2375 11.593C14.7095 12.32 14.977 12.732 15.4405 12.7965C16.4335 12.934 17.383 11.3465 17.5215 11.1055C17.827 10.5795 17.766 10.445 18.181 9.4245C18.7245 8.086 19.0485 7.289 19.413 7.296C19.744 7.302 19.91 7.971 20.8835 10.5155C21.492 12.1055 21.7835 12.77 22.468 13.0655C22.568 13.1075 23.155 13.3475 23.768 13.1255C25.279 12.5755 25.268 9.8105 25.9 9.813C26.297 9.813 26.255 10.902 27.1375 11.963C28.249 13.3015 29.8415 13.4105 29.785 13.756Z",
                  fill: "rgba(0,25,77,1)",
                  fillRule: "nonzero",
                },
              ]}
              display="block"
              gap="unset"
              alignItems="unset"
              justifyContent="unset"
              position="absolute"
              top="0%"
              bottom="13.97%"
              left="34.16%"
              right="0%"
              {...getOverrideProps(overrides, "Vector40741115")}
            ></Icon>
          </View>
        </View>
      </View>
      <Flex
        gap="32px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="center"
        grow="1"
        shrink="1"
        basis="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 321")}
      >
        <MyIcon
          width="24px"
          height="24px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          overflow="hidden"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          type="notification"
          {...getOverrideProps(overrides, "MyIcon")}
        ></MyIcon>
      </Flex>
      <View
        width="50px"
        height="50px"
        display="block"
        gap="unset"
        alignItems="unset"
        justifyContent="unset"
        overflow="hidden"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        children={profile}
        {...getOverrideProps(overrides, "profile")}
      ></View>
    </Flex>
  );
}
