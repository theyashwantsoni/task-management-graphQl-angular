var express = require('express');
var graphqlHTTP = require('express-graphql');
const schema = require('./schema');
var cors = require("cors")

var app = express();
app.use("*",cors());
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
