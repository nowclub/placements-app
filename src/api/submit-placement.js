import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyHXMyHsqwPsQjNn" }).base(
  "appSuNf0DaLiyLUnz"
);

export default async function handler(req, res) {
  const submission = req.body;

  const { exam, contact, level, oralAnswers, writtenAnswers } = submission;

  console.log(level);

  const records = await base("Submissions").create([
    {
      fields: {
        exam,
        ...contact,
        level,
        oral_questions: oralAnswers.map(({ answer }) => ({
          url: answer,
        })),
        written_questions: writtenAnswers
          .map(
            ({ question, answer }, index) =>
              `${index + 1}. ${question.replace("_", answer)}`
          )
          .join("\n"),
      },
    },
  ]);

  const [record] = records;

  return res.status(201).json({ submissionId: record.getId(), level, exam });
}
