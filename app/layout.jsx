"use client";
import { Inter } from "next/font/google";
import Navbar from "./components/ui/Navbar";
import Container from "./components/ui/Container";
import Footer from "./components/sections/Footer";

import {
  ChakraProvider,
  ColorModeScript,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Card,
  CardBody,
  Flex,
  Image,
  Heading,
  Text,
  Center,
  Button,
  Link,
} from "@chakra-ui/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Providers } from "./providers";

import { store } from "./store";
import { Provider } from "react-redux";

import { CookiesProvider } from "react-cookie";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  const [firstVisit, setFirstVisit] = useState(true);
  const {
    isOpen: isDisclaimerOpen,
    onOpen: onDisclaimerOpen,
    onClose: onDisclaimerClose,
  } = useDisclosure();

  useEffect(() => {
    const inititalVisitToWebsite = localStorage.getItem("firstVisit");

    if (!inititalVisitToWebsite) {
      onDisclaimerOpen();
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode="light" />
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.REACT_APP_reCAPTCHA_SITE_KEY}
        >
          <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <CookiesProvider>
                <Providers>
                  <Container>
                    <Modal
                      isCentered
                      isOpen={isDisclaimerOpen}
                      onClose={onDisclaimerClose}
                      bg="transparent"
                      closeOnOverlayClick={false}
                    >
                      <ModalOverlay />
                      <ModalContent
                        alignContent="center"
                        maxW="1000px"
                        w="auto"
                        bg="transparent"
                        boxShadow="0"
                      >
                        <ModalBody alignContent="center">
                          <Flex
                            w="620px"
                            bg="white"
                            p="4rem"
                            borderRadius="md"
                            gap="2rem"
                            direction="column"
                            align="center"
                          >
                            <Image src="/cookies.svg" w="200px" h="auto" />
                            <Heading size="lg">We use cookies</Heading>
                            <Flex
                              gap="2rem"
                              direction="column"
                              justify="center"
                            >
                              <Text align="center">
                                We use cookies to provide the best possible
                                experience. By clicking continue, you agree to
                                Librum&apos;s policies.
                              </Text>
                              <Flex
                                gap=".5rem"
                                justify="space-between"
                                w="100%"
                              >
                                <Link href="/cookies">Cookie policy</Link>-
                                <Link href="/privacypolicy">
                                  Privacy policy
                                </Link>
                                -
                                <Link href="/termsofservice">
                                  Terms of service
                                </Link>
                                -<Link href="/disclaimer">Disclaimer</Link>
                              </Flex>
                            </Flex>
                            <Flex gap="1rem">
                              <Button
                                variant="primary"
                                onClick={onDisclaimerClose}
                              >
                                Accept and continue
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={onDisclaimerClose}
                              >
                                Decline
                              </Button>
                            </Flex>
                          </Flex>
                        </ModalBody>
                      </ModalContent>
                    </Modal>
                    <Navbar />
                    {children}
                    <Footer />
                  </Container>
                </Providers>
              </CookiesProvider>
            </QueryClientProvider>
          </Provider>
        </GoogleReCaptchaProvider>
      </body>
    </html>
  );
}
