import { NavBarHeader, NavBarSide } from "@/ui-components";
import {
  Button,
  Card,
  Flex,
  Grid,
  useTheme,
  View,
  withAuthenticator,
  Text,
} from "@aws-amplify/ui-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import styles from "../styles/Layout.module.css";
import NavItems from "./NavItems";
import { AnimatePresence, motion } from "framer-motion";
import { HiMiniBars2 } from "react-icons/hi2";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";

function Layout({ children }: { children: React.ReactNode }) {
  const { tokens } = useTheme();
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  //on page change navlinks will be set to false, but we can check a better way to do this
  useEffect(() => {
    const handleRouteChange = () => {
      setIsNavOpen(false);
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <View boxShadow="medium" className={styles.header}>
        {/* <Image src="/logo.png" alt="brand" className={styles.logo} width={10} height={8} /> */}
        <Text className={styles.title}>Decibel</Text>
        <Button
          border="none"
          borderRadius="10px"
          onClick={() => setIsNavOpen(!isNavOpen)}
          className={styles.iconButton}
        >
          {isNavOpen ? (
            <MdOutlineClose className={styles.icon} />
          ) : (
            <HiMiniBars2 className={styles.icon} />
          )}
        </Button>
      </View>
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className={styles.mobileNav}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <NavItems />
          </motion.div>
        )}
      </AnimatePresence>

      <NavBarSide
        backgroundColor={tokens.colors.brand.secondary[10]}
        overrides={{
          NavBarSide: {
            height: "100vh",
            borderRadius: "0",
          },
          Button: {
            borderRadius: "10px",
            fontSize: "16px",  
            marginLeft: "10px",          
          },
          "Wesley Peck": {
            textTransform: "uppercase",
            fontWeight: "bold",
          },
        }}
        columnStart="1"
        columnEnd="2"
        position="fixed"
        left="0"
        overflow="auto"
        width={{ base: "0px", medium: "300px" }}
        maxWidth="320px"
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
        left={{ base: "0", medium: "300px" }}
        position="fixed"
        className={styles.content}
        style={{
          zIndex: 0,
        }}
      >
        <Button
          border="none"
          borderRadius="24px"
          marginBottom={20}
          variation="primary"
          onClick={() => {
            router.back();
          }}
        >
          <IoIosArrowBack color="white" />
        </Button>
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
