import { Badge, Box, Center, Divider, Flex, Text } from "@chakra-ui/react";
import { Poll } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPoll, FaPollH } from "react-icons/fa";

type PollItemsProps = {
  poll: Poll;
  isLink?: boolean;
};

const PollItem: React.FC<PollItemsProps> = ({ poll, isLink = false }) => {
  return (
    <Box as={isLink ? Link : Box} href={`polls/${poll.id}`}>
      <Flex
        color="white"
        bgColor="#111"
        shadow="dark-lg"
        mb={4}
        gap={6}
        p={4}
        rounded="md"
        cursor={isLink ? "pointer" : "default"}
        _hover={isLink ? { filter: "brightness(120%)" } : {}}
      >
        <Center color="primary">
          <FaPollH size="50px" />
        </Center>
        <Box flex={1}>
          <Flex alignItems="center" gap={4}>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              borderColor="primary"
              borderBottomWidth={1}
              maxW="fit-content"
              mb={2}
              noOfLines={1}
            >
              {poll.title}
            </Text>
            <Badge colorScheme={poll.state === "OPEN" ? "green" : "red"}>
              {poll.state}
            </Badge>
          </Flex>
          <Text fontWeight="normal" color="whiteAlpha.700" noOfLines={3}>
            {poll.description}
          </Text>
        </Box>
        <Center px={4} alignSelf="center">
          <Box textAlign="center">
            <Text mb={1}>Max tracks</Text>
            <Text color="primary">{poll.max_tracks ?? "Unlimited"}</Text>
          </Box>
        </Center>
      </Flex>
    </Box>
  );
};

export default PollItem;
