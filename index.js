const express = require('express')
const expressGraphQL = require('express-graphql')
const { query } = require('./querys')
const { mutation } = require('./mutations')
const { conexion } = require('./conexion')
const { graphql, GraphQLSchema} = require('graphql')
const { authenticated } = require('../autenticacion/utils')
const cors = require('cors')

const authToken = process.env.AUTH_TOKEN || 'secreto';

const schema = new GraphQLSchema({
  query,
  mutation
});

const app = express();

app.use((req, res, next) => {
  req.headers['user-agent'].match(/kube-probe/) ? res.send('Ok') : next();
});

app.use(cors(),(req, res, next,cors) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
  //res.header("Access-Control-Allow-Methods", "POST", "GET");
  next();
});

app.use(expressGraphQL(async({ headers, query, mutation, querys}) => ({
  schema,
  conexion,
  context:{
    authenticated: authToken === (headers['authorization'] || query.token),
  },
  graphiql: true
})));

const port = process.env.SERVER_PORT || 5000;
app.post('/', expressGraphQL);
app.get('/', expressGraphQL);

app.listen({ port }, () => {
  console.log(
    `El servidor escucha en: http://localhost:${port}`
  );
});
