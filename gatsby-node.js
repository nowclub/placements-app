exports.createPages = async function ({ graphql, actions: { createPage } }) {
  const examTemplate = `${__dirname}/src/templates/exam.js`;

  const {
    data: { exams },
  } = await graphql(`
    query ListAllExams {
      exams: allExamsJson {
        totalCount
        nodes {
          id
          slug
        }
      }
    }
  `);

  exams.nodes.forEach((exam) => {
    createPage({
      path: `/${exam.slug}`,
      component: examTemplate,
      context: {
        slug: exam.slug,
      },
    });
  });
};
