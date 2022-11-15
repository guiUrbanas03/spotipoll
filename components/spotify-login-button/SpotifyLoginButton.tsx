import { Button } from "@chakra-ui/react";
import { FaSpotify } from "react-icons/fa";
import React from "react";
import { signIn } from "next-auth/react";

const SpotifyLoginButton = () => {
  return (
    <Button
      onClick={() => signIn('spotify')}
      size="lg"
      fontWeight="medium"
      fontSize="2xl"
      variant="outline"
      borderColor="primary"
      backgroundColor='secondary'
      color="white"
      rounded="full"
      shadow="dark-lg"
      paddingX={20}
      paddingY={7}
      leftIcon={<FaSpotify color="#1DB954" size={40} />}
      _hover={{backgroundColor: '#262626'}}
    >
      Login with Spotify
    </Button>
  );
};

export default SpotifyLoginButton;
