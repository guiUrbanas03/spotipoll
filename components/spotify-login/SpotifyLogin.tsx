import { Box, Center, Container, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import FeaturedTitle from "../featured-title/FeaturedTitle";
import SpotifyLoginButton from "../spotify-login-button/SpotifyLoginButton";
import StepGuides from "../step-guides/StepGuides";

const SpotifyLogin = () => {
  return (
    <>
      <Box mt={16} mb={16} pb={24} position="relative">
        <Container maxW="7xl">''
          <Box mt={10}>
            <FeaturedTitle
              textAlign="center"
              primaryTitle="Can't make up your mind? Let’s make a poll!"
            />
          </Box>
          <Center mt={20}>
            <SpotifyLoginButton />
          </Center>
        </Container>
        <Box
          zIndex={-5}
          position="absolute"
          bottom={-24}
          left="50%"
          transform="translateX(-50%)"
        >
          <Image width={1000} height={500} src="/assets/svg/blob-glow.svg" />
        </Box>
      </Box>
      <Box backgroundColor="#151515" py={16}>
        <Container maxW="7xl">
          <Box mb={8} position="relative">
            <FeaturedTitle
              bgTextSize="6xl"
              primaryTitle="An app for building spotify playlists polls"
              bgTitle="Easy Peasy Lemon Squeezy"
            />
          </Box>
          <Box>
            <StepGuides />
          </Box>
        </Container>
      </Box>
      <Box bgColor="secondary" py={4}>
        <Container maxW="7xl">
          <Box mb={2} position="relative">
            <FeaturedTitle
              bgTextSize="6xl"
              primaryTitle="Motivation"
              bgTitle="Fun facts"
            />
          </Box>
          <Box color="white" fontSize="lg" pb={8}>
            <Text mb={8}>
              I’ve created this app to solve a little problem that came up when
              me and my friends were planning a halloween party.
            </Text>
            <Text mb={8}>
              We created a colaboritve spotify playlist that ended up been
              filled with more than 12 hours of songs, which was way more than
              we were expecting the party to last.
            </Text>
            <Text>
              So I had the idea to build this app to decide which songs we would
              actually listen in the party.
            </Text>
          </Box>
        </Container>
      </Box>
      <Box bgColor="secondary" pt={4} position="relative">
      <Box
          zIndex={0}
          position="absolute"
          bottom={0}
          left="50%"
          transform="translateX(-50%)"
        >
          <Image width={1000} height={500} src="/assets/svg/blob-glow.svg" />
        </Box>
        <Container maxW="7xl">
          <Box pb={8} position="relative">
            <FeaturedTitle
              textAlign="center"
              bgTextSize="6xl"
              primaryTitle="That's it, enjoy! =)"
              bgTitle="Stay funky bros"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SpotifyLogin;
