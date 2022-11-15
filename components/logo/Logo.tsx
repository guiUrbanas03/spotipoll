import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Flex align="center" gap={3} cursor="pointer">
        <Image src="/assets/svg/spotipoll-logo.svg" width={40} height={40} />
        <Text color="primary" fontSize="xl" fontWeight="bold">
          SpotiPoll
        </Text>
      </Flex>
    </Link>
  );
};

export default Logo;
