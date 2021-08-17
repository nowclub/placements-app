import {
  Container,
  Box,
  Heading,
  SimpleGrid,
  Text,
  Button,
} from "@chakra-ui/react";
import { graphql } from "gatsby";
import React from "react";

import { Link as GatsbyLink } from "gatsby";

import ExamCard from "../components/ExamCard";

function IndexPage({ data }) {
  const { exams } = data;

  return (
    <Container py="8" maxW="container.md">
      <Box mb="8" mt="8">
        <Heading as="h1" size="3xl">
          All Placement Exams
        </Heading>

        <Text mt="3">Select the exam you want to find your level</Text>
      </Box>

      <SimpleGrid columns={[1, 2, 3]} spacing="4">
        {exams.nodes.map(({ id, ...data }) => (
          <ExamCard key={id} {...data} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export default IndexPage;

export const pageQuery = graphql`
  query FetchAllExams {
    exams: allExamsJson {
      nodes {
        id
        slug
        title
        description
        image {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1)
          }
        }
      }
    }
  }
`;
