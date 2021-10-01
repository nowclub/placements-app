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
        <Heading>Parabéns!</Heading>

        <VStack mt="8" spacing="3" align="stretch">
          <Text>
            Terminou com sucesso o seu exame! Iremos agora verificar as suas
            respostas e deverá receber nas próximas 24 horas úteis um e-mail com
            o seu nível correto.
            <br /> Se encontrar algum problema na sua submissão, contacte-nos e
            dê-nos a sua identificação de submissão (abaixo indicada).
          </Text>
          <Text>
            Conseguiu atingir o nível <b>{level}</b> (provisório).
          </Text>
          <Text fontSize="sm">A sua submissão é a {submissionId}.</Text>
        </VStack>

        <Box mt="4">
          <Button
            as="a"
            colorScheme="primary"
            target="_black"
            href="https://docs.google.com/forms/d/e/1FAIpQLSduyEQa5H3mLzwPRbaJkgQgC6CudWGg9gQZYm6jJmVPA0hQMw/viewform"
          >
            Inscreve-te já
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Success;
