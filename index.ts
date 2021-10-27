import express from 'express';
import {graphql,GraphQLObjectType,GraphQLSchema, GraphQLString} from 'graphql';
import {graphqlHTTP, Options} from 'express-graphql';
import cors from 'cors';
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
      prop1:{
        type:GraphQLString,
        resolve(){
          return 'prop1'
        }
      }
    }
  })
})


const app = express()
app.use(cors());
app.use('/graphql',graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(4000);


// const option : Options = (req,res,params) => {
//   return new Promise((resolve, reject)=>{
//     resolve(undefined)
//   })
// }






