const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('NOT Connected to MongoDB!!! ', error));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' } )
        .sort({ name: 1 })
        .select({ name: 1, author: 1});
}

async function run() {
    const courses = await getCourses();
    console.log('Courses', courses)
}

run();