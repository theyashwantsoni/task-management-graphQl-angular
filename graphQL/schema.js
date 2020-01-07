const graphql = require("graphql");
const axios = require('axios');

// PART 1 - ES6 DESTRUCTURING
const { GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema } = graphql;


// Task TYPE
const TaskType = new GraphQLObjectType({
  name: "Tasks",
  fields: () => ({
     id: { type: GraphQLInt },
     description: { type: GraphQLString },
     state: { type: GraphQLInt },
     userid: { type: GraphQLInt }
  })
});

// State type
const StateType = new GraphQLObjectType({
   name: "States",
   fields: () => ({
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
   })
 });

// ROOT QUERY
const RootQuery = new GraphQLObjectType({
   name: "RootQueryType",
   fields: {
      task: {
          type: TaskType,
          args: {
             id: { type: GraphQLInt },
             userid: { type: GraphQLInt }
          },
          resolve(parent, args) {
             return axios.get(`http://localhost:3000/tasks/${args.id}`).then(res => res.data)
          }
     },
      tasks: {
          type: new GraphQLList(TaskType),
          resolve(parent, args) {
             return axios.get(`http://localhost:3000/tasks`).then(res => res.data)
          }
     },
      states: {
          type: new GraphQLList(StateType),
          resolve(parent, args) {
             return axios.get(`http://localhost:3000/states`).then(res => res.data)
          }
     }
  }
});
const mutation = new GraphQLObjectType({
   name: "Mutation",
   fields: {
     addTask: {
     type: TaskType,
     args: {
         description: { type: new GraphQLNonNull(GraphQLString) },
         userid: { type: new GraphQLNonNull(GraphQLInt) },
         state: { type: new GraphQLNonNull(GraphQLInt) }
       },
       resolve(parent, args) {
         return axios
            .post(`http://localhost:3000/tasks/`, {
                description: args.description,
                state: args.state,
                userid: args.userid
         }).then(res => res.data);
      }
      },
      editTask: {
         type: TaskType,
         args: {
           state: { type: GraphQLInt },
           description: { type: GraphQLString },
           userid: { type: GraphQLInt },
           id: { type: new GraphQLNonNull(GraphQLInt) }
         },
         resolve(parent, args) {
            return axios.patch(`http://localhost:3000/tasks/${args.id}`, args)
         .then(res => res.data);
         }
   },
     deleteTask: {
         type: TaskType,
         args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
            userid :{ type: new GraphQLNonNull(GraphQLInt) }
         },
         resolve(parentValue, args) {
            return axios.delete(`http://localhost:3000/tasks/${args.id}`)
     .then(res => res.data);
         }
     }
  }
});

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation:mutation
});

// # mutation {
//    #   addTask(description: "blabla", state: 1, userid: 1) {
//    # 		id,
//    # 		description,
//    #     status,
//    #     userid
//    #   }
//    # }
   
   
//    # {
//    #   tasks{
//    #  		id,
//    # 		description,
//    #     status,
//    #     userid
//    #   }
//    # }
   
   
//    # mutation {
//    #    editTask(id: 3, userid: 1,description:"qwerqwer"){
//    #     id,
//    # 		description,
//    #     status,
//    #     userid
//    #    }
//    # }
   
   
//    # mutation {
//    #    deleteTask(id: f){
//    #       
//    #    }
//    # }