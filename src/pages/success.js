import React from "react";

import {
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Box,
  Icon,
} from "@chakra-ui/react";
import { BiArrowBack as ArrowLeftIcon } from "react-icons/bi";

import { Link as GatsbyLink } from "gatsby";

function Success({ location }) {
  const { state: { submissionId, level } = {} } = location;

  return (
    <Container maxW="container.md" my="4">
      <Box as="nav" my="4">
        <Button
          as={GatsbyLink}
          to="/"
          variant="ghost"
          leftIcon={<Icon as={ArrowLeftIcon} />}
        >
          All Exams
        </Button>
      </Box>

      <Box as="section" my="8" p="4" borderWidth="2px" borderColor="gray.800">
        <Heading>Congratulations!</Heading>

        <VStack mt="8" spacing="3" align="stretch">
          <Text>
            Quis ea aliqua dolore quis aliqua qui cupidatat velit duis do
            consectetur ullamco. Ullamco magna minim aliquip ullamco consequat
            nulla non incididunt. Ut dolore dolor in proident eu consequat sint
            Lorem culpa proident culpa. Adipisicing excepteur enim aliqua
            laboris sunt adipisicing anim laborum duis ad irure nulla. Ut anim
            amet dolor aute sint irure do do. Ea cupidatat excepteur aliquip qui
            ut culpa veniam adipisicing quis.
          </Text>
          <Text>
            You have achieved a level <b>{level}</b>
          </Text>
          <Text fontSize="sm">
            Your submission is the submission {submissionId}
          </Text>
        </VStack>

        <Box mt="4">
          <Button colorScheme="blue">Check our courses</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Success;
