const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(error => console.log("NOT Connected to MongoDB!!! ", error));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema({
    name: String,
    bio: String,
    website: String
  })
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    }
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author');
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "My Website");

// createCourse('Node Course', '5c8fb1c50c72fa18dc7168b7')

listCourses();
