module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Placements App ",
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: "images", path: `${__dirname}/src/images` },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: { name: "content", path: `${__dirname}/src/content` },
    },
    `gatsby-plugin-netlify-cms`,
  ],
};
