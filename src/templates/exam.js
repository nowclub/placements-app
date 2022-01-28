import {
  AspectRatio,
  Box,
  Center,
  CircularProgress,
  Container,
  Flex,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import { graphql, navigate } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import ContactPart from "../components/exam/Contact";
import OralPart from "../components/exam/Oral";
import Part from "../components/exam/Part";
import WrittenPart from "../components/exam/Written";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default function ExamPage({ data }) {
  const {
    exam: {
      slug,
      title,
      description,
      image,
      publish_result,
      writtenQuestions,
      oralQuestions,
    },
  } = data;

  const [step, setStep] = useState("written");
  const [levelIdx, setLevelIdx] = useState(0);
  const level = LEVELS[levelIdx];

  const advanceLevel = () => {
    setLevelIdx(levelIdx + 1);
    if (level === "C1") {
      if (oralQuestions) setStep("oral");
      else setStep("contact");
    }
  };

  const hasOralQuestions = oralQuestions;

  const currentQuestions = writtenQuestions.filter((q) => q.level === level);

  const [writtenAnswers, setWrittenAnswers] = useState([]);
  const [oralAnswers, setOralAnswers] = useState(null);
  const [contact, setContact] = useState(null);

  const submitWrittenAnswers = ({ answers }) => {
    const totalQuestions = currentQuestions.length;

    const newAnswers = currentQuestions.map((q, index) => ({
      ...q,
      answer: answers[level][index],
    }));

    setWrittenAnswers([...writtenAnswers, ...newAnswers]);

    const correctAnswers = newAnswers.filter(
      ({ correct, answer }) => correct === answer
    ).length;

    const score = correctAnswers / totalQuestions;
    console.log(score);

    if (score > 0.7) {
      advanceLevel();
    } else {
      if (oralQuestions) setStep("oral");
      else setStep("contact");
    }
  };

  const submitOralAnswers = ({ answers }) => {
    const newAnswers = oralQuestions.map(({ q }, index) => ({
      ...q,
      answer: answers[index],
    }));

    setOralAnswers(newAnswers);

    setStep("contact");
  };

  const submitContact = ({ contact }) => {
    setContact(contact);

    setStep("submitting");
  };

  useEffect(() => {
    if (step === "submitting") {
      if (publish_result) {
        fetch("/api/submit-placement", {
          method: "POST",
          body: JSON.stringify({
            exam: slug,
            level: LEVELS[levelIdx],
            oralAnswers,
            writtenAnswers,
            contact,
          }),
          headers: new Headers({
            "content-type": "application/json",
          }),
        })
          .then((resp) => resp.json())
          .then(({ submissionId, level }) =>
            navigate("/success", { state: { submissionId, level } })
          )
          .catch(() => {
            setStep("contact");
          });
      } else {
        navigate("/success", { state: { level } });
      }
    }
  }, [step, level, oralAnswers, writtenAnswers, contact, levelIdx, slug]);

  return (
    <Container maxW="container.md" my="4">
      <Box as="nav" my="4" display="flex" justifyContent="flex-start">
        <Image h="12" src="/logo.svg" alt="NowClub"></Image>
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

      {step === "written" && (
        <Part
          title={`Written Questions`}
          instructions="
            Answer to each one of the multiple choice questions so that the phrase makes sense.
            There are potencially many batches of questions that you must complete sequencially to
            finish all the written questions.
          "
          onSubmit={(data) => submitWrittenAnswers(data)}
        >
          <WrittenPart questions={currentQuestions}></WrittenPart>
        </Part>
      )}

      {step === "oral" && (
        <Part
          title="Oral Questions"
          instructions={`
            Record yourself answering each one of these questions.
          `}
          onSubmit={(data) => submitOralAnswers(data)}
        >
          <OralPart questions={oralQuestions}></OralPart>
        </Part>
      )}

      {step === "contact" && (
        <Part
          title="Personal Info"
          instructions={`
            Give us your personal info so we can know who you are.
          `}
          onSubmit={(data) => submitContact(data)}
        >
          <ContactPart />
        </Part>
      )}
      {step === "submitting" && (
        <Center flexDir="column" my="8" minH="10em">
          <CircularProgress isIndeterminate></CircularProgress>
          <Text mt="4">Submitting your exam</Text>
        </Center>
      )}
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
      publish_result
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
