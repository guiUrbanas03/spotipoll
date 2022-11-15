import { Box, Flex, Text } from "@chakra-ui/react";
import { Session } from "next-auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { isAuthenticated } from "../../utils/isAuthenticated";

type NavigationLinksProps = {
  session: Session | null;
};

const NavigationLinks: React.FC<NavigationLinksProps> = ({ session }) => {
  const router = useRouter();
  const currentRoute = router.pathname;

  const links = [
    {
      name: "Create poll",
      href: "/dashboard",
    },
    {
      name: "My polls",
      href: "/polls",
    },
  ];

  const isCurrentRoute = (href: string) =>
    currentRoute.includes(href) ? "primary" : "white";

  if (!session || !isAuthenticated(session)) return null;

  return (
    <Box>
      <Flex color="white" fontSize="lg" gap={8}>
        {links.map((link) => (
          <Text
            key={`${link.name}`}
            cursor="pointer"
            color={isCurrentRoute(link.href)}
            borderBottomWidth={1}
            borderColor={isCurrentRoute(link.href)}
            _hover={{ color: "dimmedPrimary", borderColor: "dimmedPrimary" }}
          >
            <Link href={link.href}>{link.name}</Link>
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

export default NavigationLinks;
