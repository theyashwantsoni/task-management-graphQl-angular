const graphql = require("graphql");
const axios = require('axios');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema } = graphql;

const ProductType = new GraphQLObjectType({
  name: "Tasks",
  fields: () => ({
     id: { type: GraphQLInt },
     description: { type: GraphQLString },
     name: { type: GraphQLString },
     category: { type: GraphQLInt },
     price: { type: GraphQLString }
  })
});


const RootQuery = new GraphQLObjectType({
   name: "RootQueryType",
   fields: {
      product: {
          type: ProductType,
          args: {
             id: { type: GraphQLInt }
          },
          resolve(parent, args) {
             return axios.get(`https://infinite-temple-08342.herokuapp.com/products/${args.id}`).then(res => res.data)
          }
     },
      products: {
          type: new GraphQLList(ProductType),
          resolve(parent, args) {
            return axios.get(`https://infinite-temple-08342.herokuapp.com/products`).then(res => res.data)
         }
     }
  }
});
const mutation = new GraphQLObjectType({
   name: "Mutation",
   fields: {
     addProduct: {
     type: ProductType,
     args: {
         description: { type: new GraphQLNonNull(GraphQLString) },
         name: { type: new GraphQLNonNull(GraphQLString) },
         price: { type: new GraphQLNonNull(GraphQLString) },
         category: { type: new GraphQLNonNull(GraphQLInt) }
       },
       resolve(parent, args) {
         return axios
            .post(`https://infinite-temple-08342.herokuapp.com/products/`, {
                description: args.description,
                name: args.name,
                price: args.price,
                category: args.category
         }).then(res => res.data);
      }
      },
      editProduct: {
         type: ProductType,
         args: {
           category: { type: GraphQLInt },
           description: { type: GraphQLString },
           name: { type: GraphQLString },
           price: { type: GraphQLString },
           id: { type: new GraphQLNonNull(GraphQLInt) }
         },
         resolve(parent, args) {
            return axios.patch(`https://infinite-temple-08342.herokuapp.com/products/${args.id}`, args)
         .then(res => res.data);
         }
   },
     deleteProduct: {
         type: ProductType,
         args: {
            id: { type: new GraphQLNonNull(GraphQLInt) },
         },
         resolve(parentValue, args) {
            return axios.delete(`https://infinite-temple-08342.herokuapp.com/products/${args.id}`)
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