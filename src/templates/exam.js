import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { BiArrowBack as ArrowLeftIcon } from "react-icons/bi";
import WrittenPart from "../components/exam/Written";
import OralPart from "../components/exam/Oral";
import ContactPart from "../components/exam/Contact";
import { useForm, FormProvider } from "react-hook-form";

export default function ExamPage({ data }) {
  const {
    exam: { slug, title, description, image, writtenQuestions, oralQuestions },
  } = data;

  const methods = useForm();
  const { handleSubmit, register } = methods;

  const [isLoading, setIsLoading] = useState(false);

  const submitAnswers = async (data) => {
    console.log(data);
    setIsLoading(true);

    try {
      const response = await fetch("/api/submit-placement", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(data),
      });

      const { submission_id: submissionId, level } = await response.json();

      console.log(
        `Successefully submitted submittion with id = ${submissionId}`
      );

      await navigate("/success", { state: { submissionId, level } });
    } catch (ex) {
      console.log(ex);
    }

    setIsLoading(false);
  };

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

      <Box as="header" position="relative" overflow="hidden">
        <AspectRatio w="full" maxH="md">
          <GatsbyImage
            objectFit="cover"
            objectPosition="center"
            image={getImage(image)}
            alt=""
          ></GatsbyImage>
        </AspectRatio>

        <Box
          bgGradient="linear(to-b, transparent 0%, blackAlpha.400 50%, blackAlpha.900)"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
        />

        <Flex
          position="absolute"
          bottom={0}
          left={0}
          p="4"
          direction="column"
          justifyContent="flex-end"
          color="white"
        >
          <Heading as="h1" size="3xl">
            {title}
          </Heading>
          <Text mt="2">{description}</Text>
        </Flex>
      </Box>
      <form onSubmit={handleSubmit(submitAnswers)}>
        <Input type="hidden" {...register("exam")} value={slug} />

        <FormProvider {...methods}>
          <WrittenPart questions={writtenQuestions}></WrittenPart>

          <OralPart questions={oralQuestions}></OralPart>

          <ContactPart />

          <Button
            type="submit"
            isFullWidth
            colorScheme="blue"
            size="lg"
            isLoading={isLoading}
          >
            Submit
          </Button>
        </FormProvider>
      </form>
    </Container>
  );
}

export const pageQuery = graphql`
  query GetExam($slug: String!) {
    exam: examsJson(slug: { eq: $slug }) {
      id
      slug
      title
      description
      image {
        childImageSharp {
          gatsbyImageData(aspectRatio: 1)
        }
      }

      oralQuestions: oral_questions {
        question
      }

      writtenQuestions: written_questions {
        level
        question
        choices
        correct
      }
    }
  }
`;
