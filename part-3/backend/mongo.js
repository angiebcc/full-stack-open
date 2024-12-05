const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const { MongoClient, ServerApiVersion } = require("mongodb");
const url = `mongodb+srv://fullstack:${password}@cluster0.x7akf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model("Person", personSchema);

const name = process.argv[3];
const phone = process.argv[4];

const person = new Person({
  name,
  phone,
});

person.save().then((result) => {
  console.log("person saved!");
});

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
  mongoose.connection.close();
});
