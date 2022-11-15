import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaLink, FaList, FaPollH, FaSpotify } from "react-icons/fa";

const StepGuides = () => {
  const stepGuides = [
    {
      title: "Login on Spotify",
      icon: <FaSpotify  size='70px'/>,
    },
    {
      title: "Select playlist",
      icon: <FaList  size='70px'/>,
    },
    {
      title: "Generate poll",
      icon: <FaPollH  size='70px'/>,
    },
    {
      title: "Share poll's link",
      icon: <FaLink  size='70px'/>,
    },
  ];

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      wrap="wrap"
      alignItems="stretch"
      justifyContent='space-between'
      w="full"
      gap={12}
    >
      {stepGuides.map((step, i) => (
        <Box flexGrow={1} key={step.title} flexShrink={0} >
          <Box color="white" background="greenGradient" rounded="md" p={0.5}>
            <Box backgroundColor="secondary" fontSize="xl" p={2} rounded="md">
              <Flex direction="column" align="center" justify="center">
                <Box pt={4}>
                  <Text>{step.title}</Text>
                </Box>
                <Box py={8} color='primary'>
                  {step.icon}
                </Box>
              </Flex>
            </Box>
          </Box>
          <Center color="tertiary" fontSize="5xl" opacity={0.1}>
            <Text>{i + 1}</Text>
          </Center>
        </Box>
      ))}
    </Flex>
  );
};

export default StepGuides;
