
export default {
    User: {
      tasks: (parent, args, context, info) => parent.getTasks(),
      projects : (parent, args, context, info) => parent.getProjects(),

    },
    Task: {
      user: (parent, args, context, info) => parent.getUser(),
      project : (parent, args, context, info) => parent.getProject(),
    },
    Project:{
      tasks: (parent, args, context, info) => parent.getTasks(),
      users: (parent, args, context, info) => parent.getUsers(),
    },
    Query: {
      tasks: (parent, args, { db }, info) => db.task.findAll(),
      users: (parent, args, { db }, info) => db.user.findAll(),
      projects : (parent,args ,{ db }, info) => db.project.findAll(),
      task: (parent, { id }, { db }, info) => db.task.findByPk(id),
      user: (parent, { id }, { db }, info) => db.user.findByPk(id),
      project : (parent, { id }, { db }, info) => db.project.findByPk(id)
    },
    Mutation: {
      createTask: (parent, { description, userId , status }, { db }, info) =>
        db.task.create({
          description : description,
          status : status,
          userId : userId
        }),
      updateTask: (parent, { description, id, status }, { db }, info) =>
        db.task.update({
            description:description,
            status : status
        },
        {
          where: {
            id: id
          }
        }),
      deleteTask: (parent, {id}, { db }, info) =>
        db.task.destroy({
          where: {
            id: id
          }
        })
    }
  };