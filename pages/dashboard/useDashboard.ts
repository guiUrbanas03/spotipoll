import { UseDisclosureReturn } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { SpotifyPagination } from "../../types/SpotifyPagination";
import { SpotifyPlaylist } from "../../types/SpotifyPlaylist";

export const useDashboard = (disclosure: UseDisclosureReturn) => {
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<SpotifyPagination>({
    next: "",
    offset: 0,
  });

  const hasMore = pagination.next != null;

  const handleClickOpenPoll = (playlist: SpotifyPlaylist) => {
    setSelectedPlaylist(playlist);
    disclosure.onOpen();
  };

  const fetchPlaylists = async (limit: number) => {
    if (!hasMore || loading) return;

    setLoading(true);

    const res = await fetch(
      `api/playlists?${new URLSearchParams({
        limit: limit.toString(),
        offset: pagination.offset.toString(),
      })}`
    );

    const { items, next, offset } = await res.json();

    if (items) {
      setPlaylists([
        ...playlists,
        ...items.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          imageUrl: item.images[0].url,
        })),
      ]);

      setPagination({
        offset: Number(offset) + limit,
        next: next,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPlaylists(10);
  }, []);

  return {
    playlists,
    selectedPlaylist,
    pagination,
    fetchPlaylists,
    handleClickOpenPoll,
    loading,
    hasMore,
  };
};
