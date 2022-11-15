import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SpotifyLogin from "../components/spotify-login/SpotifyLogin";
import { isAuthenticated } from "../utils/isAuthenticated";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session && isAuthenticated(session)) {
    router.push("/dashboard");

    return null;
  }
  return <SpotifyLogin />;
};

export default Home;
