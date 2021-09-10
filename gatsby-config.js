module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Placements App ",
  },
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: { typekit: { id: "jyb8ubt" } },
    },
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
  ],
};
