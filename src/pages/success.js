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

      <Box as="section" my="8" p="4">
        <Heading>Congratulations!</Heading>

        <VStack mt="8" spacing="3" align="stretch">
          <Text>
            You are successfully finished your exam! We will now verify your
            answers and you should receive an email in the next days with you
            correct level.
            <br />
            If you find any issues in your submission, please contact us and
            give us your submission ID (given bellow).
          </Text>
          <Text>
            You have achieved the (provisional) level <b>{level}</b>
          </Text>
          <Text fontSize="sm">
            Your submission is the submission {submissionId}
          </Text>
        </VStack>

        <Box mt="4">
          <Button
            as="a"
            colorScheme="primary"
            target="_black"
            href="https://nowclub.pt/courses"
          >
            Check our courses
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Success;
