
//Here define all resolvers
const resolver = require('./resolvers/resolvers');
const signupResolvers = require('./resolvers/singupResolvers');
const loginResolvers = require('./resolvers/loginResolvers');


//Here define all Schema
const schema = require('./schema/schema');
const signupSchema = require('./schema/singupSchema');
const loginSchema = require('./schema/loginSchema');


const typeDefs = [schema, signupSchema,loginSchema];

const resolvers = [resolver, signupResolvers,loginResolvers];

module.exports = {
  typeDefs,
  resolvers,
};
