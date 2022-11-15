import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "../user-menu/UserMenu";
import Logo from "../logo/Logo";
import NavigationLinks from "../navigation-links/NavigationLinks";
import { FaGithub } from "react-icons/fa";
import { isAuthenticated } from "../../utils/isAuthenticated";

const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      <Container maxW="7xl" mt={8}>
        <Flex align="center" justify="space-between">
          <Logo />
          <NavigationLinks session={session} />
          <UserMenu session={session} />
          {!isAuthenticated(session) && (
            <Box color="primary" _hover={{ filter: 'brightness(120%)', shadow: 'lg'}}>
              <a
                href="https://github.com/guiUrbanas03/spotipoll"
                target="_blank"
              >
                <FaGithub size="32px" />
              </a>
            </Box>
          )}
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
