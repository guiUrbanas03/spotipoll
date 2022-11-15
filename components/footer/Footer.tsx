import { Box, Container, Link, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <Box backgroundColor="secondary" py={4} opacity={0.5}>
        <Container maxW="7xl">
          <Text textAlign="center" color="whiteAlpha.400" fontWeight="normal" fontSize='sm'>
            Developed with 💚 by{" "}
            <Link
              href="https://github.com/guiUrbanas03"
              textDecor="underline"
              target="_blank"
            >
              Guilherme Urbanas
            </Link>
          </Text>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
