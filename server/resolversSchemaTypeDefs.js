
//Here define all resolvers
const resolver = require('./resolvers/resolvers');
const signupResolvers = require('./resolvers/singupResolvers');

//Here define all Schema
const schema = require('./schema/schema');
const signupSchema = require('./schema/singupSchema');

const typeDefs = [schema, signupSchema];

const resolvers = [resolver, signupResolvers];

module.exports = {
  typeDefs,
  resolvers,
};
