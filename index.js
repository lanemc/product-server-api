const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./graphql/typeDefs");
const { Query } = require("./graphql/resolvers/Query");
const { Mutation } = require("./graphql/resolvers/Mutation");
const { Category } = require("./graphql/resolvers/Category");
const { Product } = require("./graphql/resolvers/Product");
const { db } = require("./data/db");

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Category,
    Product,
  },
  context: {
    db,
  },
});

server.listen().then(({ url }) => {
  console.log("Server is up at " + url);
});
