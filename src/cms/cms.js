import CMS from "netlify-cms-app";

/**
 * Optionally pass in a config object. This object will be merged into `config.yml` if it exists
 */

CMS.init({
  config: {
    backend: {
      name: "github",
      repo: "nowclub/placements-app",
      branch: "main",
    },
    media_folder: "src/images/",
    collections: [
      {
        name: "exams",
        label: "Exams",
        label_singular: "Exam",
        format: "json",
        folder: "src/content/exams",
        create: true,
        slug: "{{title}}",
        preview_path: "{{slug}}",
        media_folder: "../../images/",
        public_folder: "../../images/",
        fields: [
          { name: "title", label: "Title", widget: "string" },
          { name: "description", label: "Description", widget: "string" },
          { name: "image", label: "Image", widget: "image" },
          {
            name: "written_questions",
            label: "Written Questions",
            widget: "list",
            fields: [
              { name: "question", label: "Question", widget: "string" },
              {
                name: "level",
                label: "Level",
                widget: "select",
                options: ["A1", "A2", "B1", "B2", "C1", "C2"],
              },
              { name: "choices", label: "Choices", widget: "list" },
              { name: "correct", label: "Correct", widget: "string" },
            ],
          },
          {
            name: "oral_questions",
            label: "Oral Questions",
            widget: "list",
            fields: [{ name: "question", label: "Question", widget: "string" }],
          },
        ],
      },
    ],
  },
});
