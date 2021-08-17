import Airtable from "airtable";

const base = new Airtable({ apiKey: "keyHXMyHsqwPsQjNn" }).base(
  "appSuNf0DaLiyLUnz"
);

export default async function handler(req, res) {
  const submission = req.body;

  const { exam, contact, level } = submission;

  const records = await base("Submissions").create([
    {
      fields: {
        exam,
        ...contact,
        level,
        oral_questions: submission.oral_questions.map(({ answer }) => ({
          url: answer,
        })),
        written_questions: submission.written_questions
          .map(
            ({ question, answer }, index) =>
              `${index + 1}. ${question.replace("_", answer)}`
          )
          .join("\n"),
      },
    },
  ]);

  const [record] = records;

  return res.status(201).json({ submission_id: record.getId(), level, exam });
}
