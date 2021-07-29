const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require("graphql");

const _ = require("lodash");
const Book = require("./models/book");
const Author = require("./models/author");
// Book Type

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genres: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        //return _.find(authors, { id: parent.authorid });
        return Author.findById(parent.authorid);
      },
    },
  }),
});

//Author Type
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    born: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return _.filter(books, { authorid: parent.id });
        return Book.find({ authorid: parent.id });
      },
    },
  }),
});

//Root Query

const RootQueryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        //return _.find(books, { id: args.id });
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        //return _.find(authors, { id: args.id });
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        //return authors
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        born: { type: GraphQLString },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          born: args.born,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genres: { type: GraphQLString },
        authorid: { type: GraphQLID },
      },
      resolve(parent, args) {
        let author = new Book({
          name: args.name,
          genres: args.genres,
          authorid: args.authorid,
        });
        return author.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});
