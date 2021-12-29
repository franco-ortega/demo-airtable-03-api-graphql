require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('Welcome to the Dragons server. Grrrr!!!');
});


// Add GraphQL - this did not work
// const { graphql, buildSchema } = require('graphql');

// const schema = buildSchema(`
//   type Query {
//       hello: String
//   }
// `);

// const root = {
//   hello: () => 'Hello World!!'
// };

// graphql(schema, '{ hello }', root)
//   .then((response) => {
//     console.log(response);
//   });


// Add GraphQL with Express
const { graphqlHTTP } = require('express-graphql');
const {
//   buildSchema, 
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

// const schema = buildSchema(`
//   type Query {
//       hello: String,
//       goodbye: String
//   }
// `);


// Test root and test query
const testRoot = {
  hello: () => 'Hello World!!',
  goodbye: () => 'Adios Mundo...'
};

const TestQuery = new GraphQLObjectType({
  name: 'Testing',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: testRoot.hello
    },
    goodbye: {
      type: GraphQLString,
      resolve: testRoot.goodbye
    }
  })
});

// Actual root and query
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    bloop: {
      type: GraphQLString,
      description: 'Bloop Spot',
      resolve: () => 'BLOOP!!!'
    },
    bop: {
      type: GraphQLString,
      description: 'Bop Spot',
      resolve: () => 'Bopping...'
    }
  })
});

// const Mutation = 'mutation';

const schema = new GraphQLSchema({
//   query: TestQuery,
  query: RootQuery,
//   mutation: Mutation
});

app.use('/graphql', graphqlHTTP({
  schema,
  //   rootValue: RootQuery,
  graphiql: true
}));

module.exports = app;
