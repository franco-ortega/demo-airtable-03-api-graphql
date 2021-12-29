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

// const Mutation = 'mutation';

const schema = new GraphQLSchema({
  query: TestQuery,
//   mutation: Mutation
});

app.use('/graphql', graphqlHTTP({
  schema,
  //   rootValue: RootQuery,
  graphiql: true
}));

module.exports = app;
