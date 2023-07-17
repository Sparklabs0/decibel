/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  PasswordField,
  Text,
  TextField,
} from "@aws-amplify/ui-react";
export default function SignIn(props) {
  const { overrides, ...rest } = props;
  return (
    <Flex
      gap="24px"
      direction="column"
      width="807px"
      height="unset"
      justifyContent="flex-start"
      alignItems="flex-start"
      position="relative"
      boxShadow="0px 13px 16px rgba(0, 0.16388893127441406, 0.49166667461395264, 0.07999999821186066)"
      borderRadius="10px"
      padding="58px 48px 58px 48px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "SignIn")}
      {...rest}
    >
      <Text
        fontFamily="Inter"
        fontSize="20px"
        fontWeight="400"
        color="rgba(0,0,0,1)"
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
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children="SignIp To continue to Aperturs"
        {...getOverrideProps(overrides, "Signup To continue to Aperturs")}
      ></Text>
      <TextField
        width="unset"
        height="unset"
        label="Email address"
        shrink="0"
        alignSelf="stretch"
        placeholder=""
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        {...getOverrideProps(overrides, "TextField")}
      ></TextField>
      <PasswordField
        width="unset"
        height="unset"
        label="Password"
        shrink="0"
        alignSelf="stretch"
        placeholder=""
        size="default"
        isDisabled={false}
        labelHidden={false}
        variation="default"
        hideShowPassword={false}
        {...getOverrideProps(overrides, "PasswordField")}
      ></PasswordField>
      <Button
        width="unset"
        height="unset"
        shrink="0"
        alignSelf="stretch"
        boxShadow="0px 1px 2px rgba(0.007604166865348816, 0.10645833611488342, 0.30416667461395264, 0.05000000074505806)"
        size="large"
        isDisabled={false}
        variation="primary"
        nav="Default"
        children="Sign In"
        {...getOverrideProps(overrides, "Button")}
      ></Button>
    </Flex>
  );
}
