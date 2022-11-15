import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../themes/default";
import MainLayout from "../layouts/main-layout/MainLayout";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <MainLayout>
          <NextNProgress color="linear-gradient(135deg, #1DB954 0%, #36FCD8 100%)" />
          <Component {...pageProps} />
        </MainLayout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
