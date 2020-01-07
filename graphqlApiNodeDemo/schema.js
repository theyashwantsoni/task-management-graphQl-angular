export default `
  type User {
    id: ID!
    username: String!
    password: String!
    tasks: [Task!]!
    projects : [Project!]!
  }
  type Project {
    id : ID!
    name : String!
    randomId : String!
    tasks : [Task!]!
    users : [User!]!
  }
  type Task {
    id: ID!
    description : String
    status : Int!
    userId : ID!
    projectId : ID!
    user: User!
    project : Project!
  }
  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
    user(id: ID!): User
    users: [User!]!
    project(id : ID!): Project
    projects : [Project!]! 
  }
  type Mutation {
    createTask(description: String, userId: ID!, status : Int): Task!
    updateTask(id: ID!, description: String, status : Int): [Int!]!
    deleteTask(id: ID!): Int!
  }
`;

// {
//     project(id : 1){
//       id,
//       name,
//       randomId,
//       tasks{
//         id,
//         description,
//         user{
//           id,
//           username
//         }
//       }
//     }
//   }