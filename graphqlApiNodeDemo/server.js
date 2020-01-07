import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import faker from "faker";
import times from "lodash.times";
import random from "lodash.random";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import db from "./models";

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
});

const app = express();
server.applyMiddleware({ app });

app.use(express.static("app/public"));

db.sequelize.sync().then(() => {

//   db.user.bulkCreate(
//     times(10, () => ({
//       username: faker.name.firstName(),
//       password: faker.random.alphaNumeric(8)
//     }))
//   );
//   db.project.bulkCreate(
//     times(2, () => ({
//       name: faker.lorem.word(),
//       randomId: faker.random.alphaNumeric(8)
//     }))
//   );
//   db.task.bulkCreate(
//     times(20, () => ({
//       description: faker.lorem.sentence(),
//       userId: random(1, 10),
//       status: random(1, 2),
//       projectId: random(1, 2)
//     }))
//   );

  app.listen({ port: 4000 }, () =>
    console.log(`http://localhost:4000${server.graphqlPath}`)
  );
});