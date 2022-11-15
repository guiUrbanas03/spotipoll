import React, { FC } from "react";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { SpotifyPlaylist } from "../../types/SpotifyPlaylist";
import Image from "next/image";

type SpotifyPlaylistProps = {
  playlist: SpotifyPlaylist;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const SpotifyPlaylist: FC<SpotifyPlaylistProps> = ({ playlist, onClick }) => {
  return (
    <Box
      cursor="pointer"
      _hover={{ filter: "drop-shadow(1px 1px 1px #1DB954)" }}
      onClick={onClick}
    >
      <Box mb={4}>
        <Box
          display="inline-flex"
          borderWidth={1}
          borderColor="primary"
          shadow="dark-lg"
        >
          <Image src={playlist.imageUrl ?? ""} width={200} height={200} />
        </Box>
      </Box>
      <Text color="white" maxW={200}>
        {playlist.name}
      </Text>
    </Box>
  );
};

export default SpotifyPlaylist;
