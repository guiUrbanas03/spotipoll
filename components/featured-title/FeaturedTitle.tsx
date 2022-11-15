import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";

type FeaturedTitleProps = {
  primaryTitle: string;
  bgTitle?: string;
  textAlign?: "center" | "left";
  bgTextSize?: number | string;
};

const FeaturedTitle: FC<FeaturedTitleProps> = ({
  primaryTitle,
  bgTitle = primaryTitle,
  textAlign = "left",
  bgTextSize = "7xl",
}) => {
  return (
    <Box
      py={10}
      position="relative"
      _before={{
        content: `"${bgTitle}"`,
        display: "block",
        position: "absolute",
        fontSize: bgTextSize,
        fontWeight: "bold",
        textAlign: textAlign,
        color: "tertiary",
        lineHeight: "80px",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        opacity: 0.08,
      }}
    >
      <Text
        textAlign={textAlign}
        color="white"
        fontWeight="bold"
        fontSize="4xl"
        textShadow="dark-lg"
      >
        {primaryTitle}
      </Text>
    </Box>
  );
};

export default FeaturedTitle;
