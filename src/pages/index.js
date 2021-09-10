import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { graphql } from "gatsby";
import React from "react";
import ExamCard from "../components/ExamCard";

function IndexPage({ data }) {
  const { exams } = data;

  return (
    <Container py="8" maxW="container.md">
      <Box as="nav" my="4" display="flex" justifyContent="center">
        <Heading letterSpacing="widest">
          <Box as="span" color="primary.500" fontWeight="light">
            NOW
          </Box>
          <Box as="span" color="secondary.500" fontWeight="bold">
            Club
          </Box>
        </Heading>
      </Box>

      <Box mb="8" mt="8">
        <Heading as="h1" size="3xl">
          Placement Exams
        </Heading>

        <Text mt="3">Select the exam you want to find your level</Text>
      </Box>

      <SimpleGrid columns={[1, 2, 2]} spacing="4">
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
