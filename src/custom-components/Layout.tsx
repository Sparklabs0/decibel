import { NavBarHeader, NavBarSide } from "@/ui-components";
import {
  Card,
  Flex,
  Grid,
  useTheme,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import React from "react";
import styles from "../styles/Layout.module.css";
import NavItems from "./NavItems";

function Layout({ children }: { children: React.ReactNode }) {
  const { tokens } = useTheme();
  return (
    <>
      <NavBarSide
        backgroundColor={tokens.colors.brand.primary[10]}
        overrides={{
          NavBarSide: {
            height: "100vh",
            borderRadius: "0",
          },
          Button: {
            borderRadius: "8px",
          },
        }}
        columnStart="1"
        columnEnd="2"
        position="fixed"
        left="0"
        overflow="auto"
        width="300px"
        className={styles.sidebar}
      >
        <NavItems />
      </NavBarSide>
      <NavBarHeader
        className={styles.navbar}
        position="fixed"
        backgroundColor={tokens.colors.neutral[20]}
        right="0"
        height="80px"
        width="calc(100vw - 300px)"
        left="300px"
        boxShadow="none"
      />
      <View
        top="80px"
        bottom="0"
        right="0"
        left="300px"
        position="fixed"
        className={styles.content}
      >
        {children}
      </View>
    </>
  );
}

export default withAuthenticator(Layout, {
  loginMechanisms: ["email"],
  signUpAttributes: ["name", "email"],
  socialProviders: ["google"],
});
