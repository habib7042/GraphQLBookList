const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const MyGraphQLSchema = require("./schema");
const mongoose = require("mongoose");

const app = express();

// Code for database connect
mongoose.connect(
  "mongodb+srv://habib:habib96@books.pv5qg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});
app.use(
  "/graphql",
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
