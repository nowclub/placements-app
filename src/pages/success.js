import React from "react";

import {
  Container,
  Heading,
  Text,
  VStack,
  Button,
  Box,
  Icon,
  Link,
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
          <Text>Chegaste ao fim do teu exame de nível :)</Text>
          <Text>
            Conseguiste atingir o nível <b>{level}</b> na parte escrita.
          </Text>

          {submissionId ? (
            <>
              <Text>
                Em breve, após a avaliação da tua prova oral, receberás um email
                com o teu nível final.
              </Text>

              <Text>
                Se encontrares algum problema na tua submissão, contacta-nos e
                dá-nos a tua identificação de submissão (abaixo indicada).
              </Text>
              <Text fontSize="sm">A sua submissão é a {submissionId}.</Text>
            </>
          ) : (
            <Text>
              <Text>
                Gostavas de fazer a parte oral do exame de nível? Entra em
                contacto connosco em{" "}
                <Link href="mailto:geral@nowclub.pt">geral@nowclub.pt</Link>
              </Text>
            </Text>
          )}
        </VStack>
      </Box>
    </Container>
  );
}

export default Success;
