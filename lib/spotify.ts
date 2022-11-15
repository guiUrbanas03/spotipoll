const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

export const getAccessToken = async (refreshToken: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  return response.json();
};

export const getMyPlaylists = async (refreshToken: string, query: any) => {
  const { access_token } = await getAccessToken(refreshToken);

  const res = await fetch(
    `${PLAYLISTS_ENDPOINT}?${new URLSearchParams(query)}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return res;
};

export const getMyPlaylistTracks = async (
  refreshToken: string,
  playlistId: string,
  limit: number,
  offset: number
) => {
  const { access_token } = await getAccessToken(refreshToken);

  const path = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?${new URLSearchParams(
    {
      limit: limit.toString(),
      offset: offset.toString(),
    }
  )}`;

  const res = await fetch(path, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res;
};

export const getPlaylist = async (
  refreshToken: string,
  playlistId: string | string[]
) => {
  const { access_token } = await getAccessToken(refreshToken);

  const path = `https://api.spotify.com/v1/playlists/${playlistId}`;

  const res = await fetch(path, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res;
};
