import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";

function ExamCard({ title, image, slug }) {
  return (
    <LinkBox overflow="hidden" position="relative">
      <AspectRatio ratio={1 / 1}>
        <GatsbyImage image={getImage(image)} alt="" objectFit="cover" />
      </AspectRatio>

      <Box
        bgGradient="linear(to-b, blackAlpha.50 50%, blackAlpha.800)"
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
      />

      <Box
        position="absolute"
        p="4"
        top={0}
        bottom={0}
        w="full"
        h="full"
        color="white"
        display="flex"
        flexDir="column"
        justifyContent="flex-end"
      >
        <Heading as="h2">
          <LinkOverlay as={GatsbyLink} to={`/${slug}`}>
            {title}
          </LinkOverlay>
        </Heading>
      </Box>
    </LinkBox>
  );
}

export default ExamCard;
