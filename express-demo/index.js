const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log(`Morgan enabled for ${app.get('env')} `)
}

app.use(logger);

const courses = [
    { id: 1, name: 'course 1'},
    { id: 2, name: 'course 2'},
    { id: 3, name: 'course 3'}
];

app.get('/', (req, res) => {
    res.send('Hello loser...');
}); 

app.get('/api/courses', (req, res) => {
    res.send(courses);
}); 

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');
    res.send(course);
}); 

app.get('/api/posts/:year/:month', (req, res) => {
    //res.send(req.params);
    res.send(req.query);
}); 

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);

}

//------------------------------------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening port ${port}... `));