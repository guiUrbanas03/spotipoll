import { extendTheme } from "@chakra-ui/react";

const theme = {
  colors: {
    primary: "#1DB954",
    secondary: "#121212",
    tertiary: "#52FC36",
    dimmedPrimary: "#85E9A8",
    gradient: "linear-gradient(180deg, #121212 0%, #282828 100%)",
    greenGradient: "linear-gradient(135deg, #1DB954 0%, #36FCD8 100%)",
  },

  styles: {
    global: {
      body: {
        background: "gradient",
        backgroundColor: "secondary",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
    },
  },
};
export default extendTheme({ ...theme });
