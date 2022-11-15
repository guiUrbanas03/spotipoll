import { Box, Container, Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box flex={1}>{children}</Box>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
