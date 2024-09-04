const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:<db_password>@cluster0.x7akf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Person = mongoose.model("Person", noteSchema);

const person = new Person({
  content: "HTML is easy",
  important: true,
});

person.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
