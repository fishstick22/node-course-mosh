const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('NOT Connected to MongoDB!!! ', error));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log('Document saved: ', result);
}

async function getCourses() {
    // eq
    // ne
    // gt
    // gte
    // lt
    // lte
    // in
    // nin
    const courses = await Course
        // .find({ author: 'Mosh', isPublished: true } )
        .find({ author: /^Mosh/i } )
        // .find()
        // .or([ {author: 'Mosh'}, {isPublished: true}])
        // .and([ {author: 'Mosh'}, {isPublished: true}])
        // .find({ price: { $gt: 10, $lte: 20 } } )
        // .find({ price: { $in: [10, 15, 20] } } )
        .limit(10)
        .sort({ name: 1 })
        // .select({ name: 1, tags: 1})
        .count();
    console.log('Courses', courses)
}

getCourses();