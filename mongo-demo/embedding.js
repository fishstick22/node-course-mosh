const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(error => console.log("NOT Connected to MongoDB!!! ", error));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
    // const course = await Course.findById(courseId);
    // course.author.name = 'Mosh Hamedani';
    // course.save();
    // const course = await Course.update({ _id: courseId }, {
    //     $set: {
    //         'author.name': 'John Smith'
    //     }
    // });
    const course = await Course.update({ _id: courseId }, {
        $unset: {
            'author': ''
        }
    });
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}
    
// addAuthor('5c900614d0dfe426a0435d04', new Author({ name: 'Amy' }) );

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
}
    
removeAuthor('5c900614d0dfe426a0435d04','5c900614d0dfe426a0435d03' );

//   createCourse('Node Course', new Author({ name: 'Mosh' }));
// createCourse('Node Course', [
//     new Author({ name: 'Mosh' }),
//     new Author({ name: 'Joun' })
// ]);
// updateAuthor('5c8fb992093d070ad8eaf401');
