const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(error => console.log('NOT Connected to MongoDB!!! ', error));

const courseSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 255,
        // match: /pattern/
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network'],
        lowercase: true,
        // uppercase: true,
        trim: true
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    // Do some async work
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200,
        get: v => Math.round(v),
        set: v => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course 2',
        category: 'WEB',
        author: 'Mosh',
        tags: ['frontend'],
        isPublished: true,
        price: 15.8
    });
    
    try {
        // course.validate((err) => {
        //     if (err) { }
        // });
        const result = await course.save();
        console.log('Document saved: ', result);
    }
    catch (ex) {
        for (field in ex.errors) {
            console.log(ex.errors[field].message);

        }
    }

}

// createCourse();

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
        .find({ author: 'Mosh', isPublished: true } )
        // .find({ author: /^Mosh/i } )
        // .find()
        // .or([ {author: 'Mosh'}, {isPublished: true}])
        // .and([ {author: 'Mosh'}, {isPublished: true}])
        // .find({ price: { $gt: 10, $lte: 20 } } )
        // .find({ price: { $in: [10, 15, 20] } } )
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1, price: 1})
        // .count()
        ;
        for (idx in courses) {
            console.log('Course:', courses[idx].name);
            console.log('Course:', courses[idx].price);
            
        }
}

getCourses();

async function updateCourseQueryFirst(id) {
    // Approach: Query first
    // findById()
    // Modify its properties
    // save()
    const course = await Course.findById(id);
    if (!course) return;

    // course.isPublished = true;
    // course.author = 'Another Author';

    course.set({
        isPublished: true,
        author: 'Another Author'
    });

    const result = await course.save();
    console.log(result);
}
//updateCourseQueryFirst("5c86f353917b3f18c83b21ce");

async function updateCourseUpdateFirst(id) {
    // Approach: Update first
    // Update directly
    // Optionally: get the updated document

    // const result = await Course.update( { _id: id }, {
    const course = await Course.findByIdAndUpdate( id, {
        $set: {
            author: 'Jason',
            isPublished: true
        }
    }, { new: true });

//    console.log(result);
    console.log(course);


}

//updateCourseUpdateFirst("5c86f353917b3f18c83b21ce");

async function removeCourset(id) {
    // const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndRemove(id);

    // console.log(result);
    console.log(course);

}

// removeCourset("5c86f353917b3f18c83b21ce");